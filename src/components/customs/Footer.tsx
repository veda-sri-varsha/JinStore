import { Phone, Mail } from "lucide-react";

import visa from "../../assets/visa.png";
import paypal from "../../assets/paypal1.png";
import mastercard from "../../assets/Mastercard-logo.png";
import skrill from "../../assets/skill.jpeg";
import klarna from "../../assets/Klarna.png";
import NewsLetter from "./NewLetter";

export default function Footer() {
  return (
    <>
      <NewsLetter />
      <footer className="w-full bg-gray-100 text-gray-800 font-[var(--font-sans)]">
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-8 border-t border-gray-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            <div>
              <h4 className="font-semibold mb-3 text-lg text-gray-900">
                Do You Need Help?
              </h4>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                Autoseligen syr. Nek diarask fröbomba. Pressa fåmoska.
              </p>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-700 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500">
                      Mon–Fri: 8:00 AM – 9:00 PM
                    </p>
                    <p className="font-semibold text-base text-gray-900 tracking-wide">
                      0 800 300-353
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-700 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500">Order assistance:</p>
                    <p className="text-sm font-semibold text-gray-900">
                      info@example.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-lg text-gray-900">
                Make Money with Us
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Sell on Grogin</li>
                <li>Sell Your Services</li>
                <li>Grogin Business</li>
                <li>Sell Your Apps</li>
                <li>Become an Affiliate</li>
                <li>Advertise Products</li>
                <li>Self-Publish with Us</li>
                <li>Become a Blowwe Vendor</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-lg text-gray-900">
                Let Us Help You
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Accessibility Statement</li>
                <li>Your Orders</li>
                <li>Returns & Replacements</li>
                <li>Shipping Policies</li>
                <li>Refund Policy</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                <li>Cookie Settings</li>
                <li>Help Center</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-lg text-gray-900">
                Get to Know Us
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Careers at Grogin</li>
                <li>About Grogin</li>
                <li>Investor Relations</li>
                <li>Grogin Devices</li>
                <li>Customer Reviews</li>
                <li>Social Responsibility</li>
                <li>Store Locations</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-6 pb-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p className="text-center md:text-left">
              © 2024 <strong>Jinstore</strong>. All rights reserved. Powered by{" "}
              <span className="font-semibold text-purple-700">
                BlackRise Themes
              </span>
              .
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end font-medium underline">
              <a href="#">Terms & Conditions</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Order Tracking</a>
            </div>
          </div>

          <div className="flex justify-start gap-4  flex-wrap">
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
    </>
  );
}
