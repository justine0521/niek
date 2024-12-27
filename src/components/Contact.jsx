import React from 'react';

function Contact() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold text-center mb-8">Contact Us</h3>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
