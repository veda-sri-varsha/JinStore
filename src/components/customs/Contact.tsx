import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import PaymentIcon from "../../assets/Payment.png";
import StocksIcon from "../../assets/stocks.png";
import QualityIcon from "../../assets/quality.png";
import DeliveryIcon from "../../assets/delivery.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export function Contact() {
  return (
    <div className="min-h-screen bg-white px-4 py-12 md:px-20">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Contact With Us
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mt-3 text-gray-800">
          You can ask us questions
        </h1>
        <p className="text-gray-500 mt-4">
          Contact us for all your questions and opinions. You can also solve
          your problems faster by visiting our contact offices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Our Offices
          </h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Reach out to one of our contact offices for faster service. Our
            team is always ready to help and support you.
          </p>

          <div className="space-y-6">
            <div className="border rounded-xl p-5 bg-gray-50 shadow-sm hover:shadow-md transition">
              <p className="font-semibold text-gray-800">United States Office</p>
              <p className="text-sm text-gray-500">
                205 Middle Road, 3rd Floor, New York
              </p>
              <p className="mt-2 text-black font-semibold">+02 1234 567 88</p>
              <p className="text-sm text-blue-500">info@example.com</p>
            </div>

            <div className="border rounded-xl p-5 bg-gray-50 shadow-sm hover:shadow-md transition">
              <p className="font-semibold text-gray-800">Munich Office</p>
              <p className="text-sm text-gray-500">
                205 Middle Road, 2nd Floor, Munich
              </p>
              <p className="mt-2 text-black font-semibold">+5 456 123 22</p>
              <p className="text-sm text-blue-500">contact@example.com</p>
            </div>
          </div>

          <div className="border-t pt-6 mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-gray-600 font-medium">Follow us:</p>
            <div className="flex items-center gap-2 mr-72">
              <span className="bg-[#3b5998] text-white p-2 rounded-full hover:scale-105 transition cursor-pointer">
                <FaFacebookF size={16} />
              </span>
              <span className="bg-[#1da1f2] text-white p-2 rounded-full hover:scale-105 transition cursor-pointer">
                <FaTwitter size={16} />
              </span>
              <span className="bg-black text-white p-2 rounded-full hover:scale-105 transition cursor-pointer">
                <FaInstagram size={16} />
              </span>
              <span className="bg-[#0077b5] text-white p-2 rounded-full hover:scale-105 transition cursor-pointer">
                <FaLinkedinIn size={16} />
              </span>
            </div>
          </div>
        </div>

        <form className="space-y-8">
  <p className="text-sm text-gray-500 mb-6">
    Send us a message, and we will get back to you as soon as possible.
  </p>

  <div className="flex flex-col md:flex-row gap-6">
    <div className="flex-1">
      <Label htmlFor="name" className="mb-2 text-sm text-black">
        Your name <span className="text-red-500">*</span>
      </Label>
      <Input
        id="name"
        type="text"
        placeholder="Enter your name"
        required
        className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
    <div className="flex-1">
      <Label htmlFor="email" className="mb-2 text-sm text-black">
        Your email <span className="text-red-500">*</span>
      </Label>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email"
        required
        className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  </div>

  <div>
    <Label htmlFor="subject" className="mb-2 text-sm text-black">
      Subject <span className="text-red-500">*</span>
    </Label>
    <Input
      id="subject"
      type="text"
      placeholder="Subject of your message"
      required
      className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>

  <div>
    <Label htmlFor="message" className="mb-2 text-sm text-black">
      Your message
    </Label>
    <textarea
      id="message"
      className="w-full h-32 p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      placeholder="Type your message..."
    />
  </div>

  <Button
    type="submit"
    className="w-full bg-primary hover:bg-violet-900 text-white font-semibold p-3"
  >
    Send Message
  </Button>
</form>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-20 border-t pt-12">
        <FeatureCard
          icon={PaymentIcon}
          title="Payment only online"
          description="Secure online payments with trusted gateways."
        />
        <FeatureCard
          icon={StocksIcon}
          title="New stocks and sales"
          description="Stay updated with the latest stock arrivals and deals."
        />
        <FeatureCard
          icon={QualityIcon}
          title="Quality assurance"
          description="We guarantee the quality of our products."
        />
        <FeatureCard
          icon={DeliveryIcon}
          title="Delivery from 1 hour"
          description="Get your items delivered within 1 hour in select cities."
        />
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <img src={icon} alt={title} className="w-12 h-12 object-contain" />
      <div>
        <p className="font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
