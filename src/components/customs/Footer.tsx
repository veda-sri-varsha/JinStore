import { Phone, Mail } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
// import { Button } from "../ui/button"; // Adjust the path if needed

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-gray-800 font-[var(--font-sans)]">
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">

          {/* Help Section */}
          <div>
            <h4 className="font-semibold mb-3 text-base">Do You Need Help?</h4>
            <p className="text-sm text-gray-500 mb-6">
              Autoseligen syr. Nek diarask fröbomba. Pressa fåmoska.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-700 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Monday–Friday: 08am–9pm</p>
                  <span className="font-bold text-base text-gray-900">0 800 300-353</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-700 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Need help with your order?</p>
                  <span className="text-sm font-semibold text-gray-900">info@example.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Make Money */}
          <div>
            <h4 className="font-semibold mb-4">Make Money with Us</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Sell on Grogin</li>
              <li>Sell Your Services on Grogin</li>
              <li>Sell on Grogin Business</li>
              <li>Sell Your Apps on Grogin</li>
              <li>Become an Affiliate</li>
              <li>Advertise Your Products</li>
              <li>Self-Publish with Us</li>
              <li>Become a Blowwe Vendor</li>
            </ul>
          </div>

          {/* Help You */}
          <div>
            <h4 className="font-semibold mb-4">Let Us Help You</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Accessibility Statement</li>
              <li>Your Orders</li>
              <li>Returns & Replacements</li>
              <li>Shipping Rates & Policies</li>
              <li>Refund and Returns Policy</li>
              <li>Privacy Policy</li>
              <li>Terms and Conditions</li>
              <li>Cookie Settings</li>
              <li>Help Center</li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="font-semibold mb-4">Get to Know Us</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Careers at Grogin</li>
              <li>About Grogin</li>
              <li>Investor Relations</li>
              <li>Grogin Devices</li>
              <li>Customer Reviews</li>
              <li>Social Responsibility</li>
              <li>Store Locations</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-white flex items-center justify-center rounded shadow hover:bg-gray-200 transition"
                >
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>
            © 2024 Jinstore. All rights reserved. Powered by{" "}
            <span className="font-semibold text-purple-700">BlackRise Themes</span>.
          </p>
          <div className="flex gap-4 underline font-semibold">
            <span>Terms and Conditions</span>
            <span>Privacy Policy</span>
            <span>Order Tracking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
