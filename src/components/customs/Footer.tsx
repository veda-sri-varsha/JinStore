import { Phone, Mail } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

import visa from "../../assets/visa.png";
import paypal from "../../assets/paypal1.png";
import mastercard from "../../assets/Mastercard-logo.png";
import skrill from "../../assets/skill.jpeg";
import klarna from "../../assets/Klarna.png";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-gray-800 font-[var(--font-sans)]">
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-6 items-start">

          <div>
            <h4 className="font-semibold mb-2 text-base text-gray-900">
              Do You Need Help?
            </h4>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Autoseligen syr. Nek diarask fröbomba. Pressa fåmoska.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-700 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 mb-0">Monday–Friday: 08am–9pm</p>
                  <p className="font-semibold text-gray-900 text-base tracking-wide">0 800 300-353</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-700 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 mb-0">Need help with your order?</p>
                  <p className="text-sm font-semibold text-gray-900">info@example.com</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Make Money with Us</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Sell on Grogin<br />
              Sell Your Services on Grogin<br />
              Sell on Grogin Business<br />
              Sell Your Apps on Grogin<br />
              Become an Affiliate<br />
              Advertise Your Products<br />
              Self-Publish with Us<br />
              Become a Blowwe Vendor
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Let Us Help You</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Accessibility Statement<br />
              Your Orders<br />
              Returns & Replacements<br />
              Shipping Rates & Policies<br />
              Refund and Returns Policy<br />
              Privacy Policy<br />
              Terms and Conditions<br />
              Cookie Settings<br />
              Help Center
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Get to Know Us</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Careers at Grogin<br />
              About Grogin<br />
              Investor Relations<br />
              Grogin Devices<br />
              Customer Reviews<br />
              Social Responsibility<br />
              Store Locations
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Follow Us</h4>
            <div className="flex gap-4 mt-auto">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, i) => (
                <button
                  key={i}
                  aria-label="Social Media Link"
                  className="w-10 h-10 bg-white flex items-center justify-center rounded shadow hover:bg-gray-200 transition"
                  type="button"
                >
                  <Icon className="w-5 h-5 text-gray-700" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-5 pb-4 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-600">
          <p className="text-center md:text-left">
            © 2024 Jinstore. All rights reserved. Powered by{" "}
            <span className="font-semibold text-purple-700">BlackRise Themes</span>.
          </p>
          <div className="flex gap-6 underline font-semibold text-center">
            <span>Terms and Conditions</span>
            <span>Privacy Policy</span>
            <span>Order Tracking</span>
          </div>
        </div>
         <div className="hidden md:flex justify-center md:justify-start gap-3 my-4">
          {[visa, paypal, mastercard, skrill, klarna].map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt="Payment method"
              className="h-8 object-contain"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
