import Logo from '../images/Nike-Logo/check-logo-orange.png'
import { HashLink } from 'react-router-hash-link';

const Hero = () => {
  return (
    <div className="bg-gray-900 text-orange-400">
      <div className="relative overflow-hidden">
        <img
          src="/images/hero-background.jpg"
          alt="Nike Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col justify-center items-center h-screen">
            <img src={Logo} alt="Nike Logo" className="h-16 md:h-24 mb-4" />
            <h1 className='text-3xl font-bold'>Don't Do it.</h1>
            <h1 className="text-4xl md:text-6xl font-bold text-center leading-tight mb-6">
              Discover Your Next <br className="hidden md:inline" />
              Adventure with Niek
            </h1>
            <p className="text-lg md:text-xl text-center text-white max-w-xl">
              Explore our latest collection of shoes for all your activities.
            </p>
            <p className="text-lg md:text-xl text-center text-white mb-8 mt-3 max-w-xl">
              Don't judge the shoes by it's Logo
            </p>

            <div className="flex space-x-4">
              <HashLink to={'/#product'}>
                <a href="#" className="bg-gray-700 text-orange-400 py-3 px-6 rounded-lg shadow-md hover:bg-orange-400 hover:text-white transition duration-300">
                  Shop Now
                </a>
              </HashLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
