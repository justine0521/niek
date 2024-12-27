import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare, FaYoutubeSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-black py-20">
      <div className="container mx-auto w-full px-2">
        <div>
          <div className="flex justify-center gap-[15%] mt-3 sm:flex flex-wrap basis-52 grow">
            <div>
              <p className="mb-3 font-bold text-xl">Learn More</p>
              
              <ul className="text-gray-600">
                <li><Link to={"/"}>About Us</Link></li>
                <li><Link to={"/"}>Categories</Link></li>
                <li><Link to={"/"}>Exchange Policy</Link></li>
                <li><Link to={"/"}>Order Now</Link></li>
                <li><Link to={"/"}>FAQ</Link></li>
                <li><Link to={"/"}>Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <p className="mb-3 font-bold text-xl">Our Community</p>
              
              <ul className="text-gray-600">
                <li><Link to={"/"}>Terms and Condition</Link></li>
                <li><Link to={"/"}>Special Offers</Link></li>
                <li><Link to={"/"}>Customer Review</Link></li>
              </ul>
            </div>

            <div>
              <p className="mb-3 font-bold text-xl">Contact Us</p>
              
              <ul className="text-gray-600">
                <li><Link to={"/"}>Contact Number</Link></li>
                <li><Link to={"/"}>Email Address</Link></li>
              </ul>
            </div>

            <div>
              <p className="mb-3 font-bold text-xl">Social Media Links</p>
              
              <ul className="text-2xl flex justify-evenly">
                <li><Link to={"https://www.facebook.com/profile.php?id=100009771407385"}><FaFacebookSquare /></Link></li>
                <li><Link to={"/"}><FaInstagramSquare /></Link></li>
                <li><Link to={"/"}><FaTwitterSquare /></Link></li>
                <li><Link to={"/"}><FaYoutubeSquare /></Link></li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>
      <div className="text-lg flex justify-center items-center  w-full mt-10">
          <p>&copy; 2024 <strong>Niek</strong> | All rights reserved.</p>
        </div>
    </footer>
  )
}
