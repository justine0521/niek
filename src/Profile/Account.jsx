import { useState, useRef, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import Icon from '../images/defaultProfile.png';
import axios from 'axios';

function Account() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [imageUrl, setImageUrl] = useState(Icon);
  const fileInput = useRef(null);
  const [user, setUser] = useState({ name: '', email: '' });

  // State for password change form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const fetchUserData = async () => {
    const response = await axios.get('/user');
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUserData
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  function handleEditProfileClick() {
    fileInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        setImageUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl(Icon);
    }
  }

  async function handleUpdatePassword() {
    try {
      const response = await axios.post('http://localhost:3003/updatePassword', {
        currentPassword,
        newPassword,
      });
  
      console.log('Password updated successfully:', response.data);
      setPasswordSuccess('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Failed to update password:', error);
      setPasswordError('Failed to update password');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }

    handleUpdatePassword();
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching user data</div>;
  }

  return (
    <section className='mt-16 h-96 flex justify-between gap-5'>
      <div className="flex flex-col w-64 mt-5">
        <header className="flex flex-wrap items-center justify-between px-3 py-5 h-fit border-b border-gray-300">
          <img src={imageUrl} alt="Profile" className="w-14 h-14 rounded-full border" />

          <input ref={fileInput} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />

          <button onClick={handleEditProfileClick} className="flex items-center bg-orange-400 text-sm text-white py-2 px-2 rounded-md mt-2">
            Edit Profile
          </button>
        </header>

        <nav>
          <ul className="flex flex-col justify-center gap-3 mt-8 px-5">
            <p className="font-semibold">My Account</p>

            <button className={`${activeTab === 'Profile' ? 'text-orange-400' : 'hover:text-orange-400'} text-left`}
              onClick={() => setActiveTab('Profile')}>
              Profile
            </button>
            <button className={`${activeTab === 'Address' ? 'text-orange-400' : 'hover:text-orange-400'} text-left`}
              onClick={() => setActiveTab('Address')}>
              Address
            </button>
            <button className={`${activeTab === 'Password' ? 'text-orange-400' : 'hover:text-orange-400'} text-left`}
              onClick={() => setActiveTab('Password')}>
              Change Password
            </button>
          </ul>
        </nav>
      </div>

      {activeTab === 'Profile' && (
        <div className="bg-white w-11/12 mt-5 px-8 mx-5">
          <header className="h-24 py-5 border-b">
            <p className="font-semibold text-lg">My Profile</p>
            <p className="text-sm text-gray-400">Manage your account</p>
          </header>

          <div className="py-8 text-gray-400 flex flex-col gap-5">
            <div className="flex items-center gap-x-[15%]">
              <p>Name</p>
              <input
                type="text"
                className="w-1/2 p-2 px-3 border border-gray-300 outline-none"
                value={user.name || ''}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-x-[15%]">
              <p>Email</p>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-orange-400 p-1 px-3 rounded text-white">Save</button>
          </div>
        </div>
      )}

      {activeTab === 'Address' && (
        <div className="bg-white w-11/12 mt-5 px-8 mx-5">
          <header className="h-24 py-5 border-b">
            <p className="font-semibold text-lg">My Address</p>
            <p className="text-sm text-gray-400">Manage your account</p>
          </header>
        </div>
      )}

      {activeTab === 'Password' && (
        <div className="bg-white w-11/12 mt-5 px-8 mx-5">
          <header className="h-24 py-5 border-b">
            <p className="font-semibold text-lg">Change Password</p>
            <p className="text-sm text-gray-400">Manage your account</p>
          </header>

          <form onSubmit={handleSubmit}>
            <div className='flex justify-between p-3 mt-5'>
              <label className='font-semibold'>Current Password</label>
              <input
                type="password"
                className='w-2/4 border border-gray-300 outline-orange-400'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className='flex justify-between p-3'>
              <label className='font-semibold'>New Password</label>
              <input
                type="password"
                className='w-2/4 border border-gray-300 outline-orange-400'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className='flex justify-between p-3'>
              <label className='font-semibold'>Confirm New Password</label>
              <input
                type="password"
                className='w-2/4 border border-gray-300 outline-orange-400'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className='flex justify-end p-3'>
              <button type="submit" className='bg-orange-400 px-2 py-1 rounded text-white'>Update Password</button>
            </div>
          </form>

          {passwordError && (
            <p className="text-red-500 text-center">{passwordError}</p>
          )}

          {passwordSuccess && (
            <p className="text-green-500 text-center">{passwordSuccess}</p>
          )}

        </div>
      )}
    </section>
  );
}

export default Account;
