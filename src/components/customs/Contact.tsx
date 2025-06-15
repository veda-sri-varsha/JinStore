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
    <div className="min-h-screen bg-white px-4 py-10 md:px-16 md:py-20">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide">
          Contact With Us
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mt-2">
          You can ask us questions
        </h1>
        <p className="text-gray-500 mt-3">
          Contact us for all your questions and opinions, or you can solve your
          problems in a shorter time with our contact offices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Our Offices</h2>
          <p className="text-sm text-gray-500 mb-6">
            Om dekardo myndurst maco llen om ekuraskit. Seminda timahtein nara.
            Radologen passam rite keba lorem om pieelars digstrami traditional
            specialitet till bedo. Er is saknde. Tor gusti aktit vitelgi. Däliga
            trask dins. Era beve digvis.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="p-5 w-full md:w-1/2 border rounded-md bg-white shadow-sm">
              <p className="font-semibold">United States Office</p>
              <p className="text-sm text-gray-500">
                205 Middle Road, 3rd Floor, New York
              </p>
              <p className="mt-2 text-blue-500 font-semibold">
                +02 1234 567 88
              </p>
              <p className="text-sm text-gray-500">info@example.com</p>
            </div>

            <div className="p-5 w-full md:w-1/2 border rounded-md bg-white shadow-sm">
              <p className="font-semibold">Munich States Office</p>
              <p className="text-sm text-gray-500">
                205 Middle Road, 2nd Floor, New York
              </p>
              <p className="mt-2 text-blue-500 font-semibold">+5 456 123 22</p>
              <p className="text-sm text-gray-500">contact@example.com</p>
            </div>
          </div>
          <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4 mb-20">
            <p className="text-sm text-gray-600">Follow us:</p>
            <div className="flex items-center gap-4">
              <span className="text-white bg-[#3b5998] p-2 rounded-full cursor-pointer">
                <FaFacebookF size={16} />
              </span>
              <span className="text-white bg-[#1da1f2] p-2 rounded-full cursor-pointer">
                <FaTwitter size={16} />
              </span>
              <span className="text-white bg-black p-2 rounded-full cursor-pointer">
                <FaInstagram size={16} />
              </span>
              <span className="text-white bg-[#0077b5] p-2 rounded-full cursor-pointer">
                <FaLinkedinIn size={16} />
              </span>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          <p className="text-sm text-gray-500">
            Om dekarado myndurst maco llen om sukanskit. Seminda timahtein nara.
            Radologen passam rite keba lorem om pieelars digstrami traditional
            specialitet till bedo.
          </p>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="name">
                Your name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="email">
                Your email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="subject">
              Subject <span className="text-red-500">*</span>
            </Label>
            <Input id="subject" type="text" placeholder="Subject" required />
          </div>

          <div>
            <Label htmlFor="message">Your message</Label>
            <textarea
              id="message"
              className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            />
          </div>

          <Button
            type="submit"
            className="bg-primary hover:bg-violet-900 text-white"
          >
            Send Message
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-16 border-t pt-10">
        <div className="flex items-start text-left gap-4">
          <img src={PaymentIcon} alt="Payment" className="w-14 h-14" />
          <div>
            <p className="font-semibold">Payment only online</p>
            <p className="text-sm text-gray-500">
              Trygghetsvärt betonasdeskölj. Mobile checkout. Ytg körnprov.
            </p>
          </div>
        </div>

        <div className="flex items-start text-left gap-4">
          <img src={StocksIcon} alt="Stocks" className="w-14 h-14" />
          <div>
            <p className="font-semibold">New stocks and sales</p>
            <p className="text-sm text-gray-500">
              Trygghetsvärt betonasdeskölj. Mobile checkout. Ytg körnprov.
            </p>
          </div>
        </div>

        <div className="flex items-start text-left gap-4">
          <img src={QualityIcon} alt="Quality" className="w-14 h-14" />
          <div>
            <p className="font-semibold">Quality assurance</p>
            <p className="text-sm text-gray-500">
              Trygghetsvärt betonasdeskölj. Mobile checkout. Ytg körnprov.
            </p>
          </div>
        </div>

        <div className="flex items-start text-left gap-4">
          <img src={DeliveryIcon} alt="Delivery" className="w-14 h-14" />
          <div>
            <p className="font-semibold">Delivery from 1 hour</p>
            <p className="text-sm text-gray-500">
              Trygghetsvärt betonasdeskölj. Mobile checkout. Ytg körnprov.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
