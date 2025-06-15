import { Mail } from "lucide-react";

export default function NewsLetter() {
  return (
<footer className="hidden lg:block bg-[#F3F4F6] border-none">
      <div className=" m-10 px-4 py-6 sm:px-6 lg:px-27 mb-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-20">
          
          <div className="md:w-1/2 mb-6 md:mb-0 ">
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">
              Join our newsletter for £10 offs
            </h3>
            <p className="text-gray-600 text-sm sm:text-sm mb-4 leading-relaxed">
              Register now to get the latest updates on promotions & <br className="hidden sm:block" />
              coupons. Don’t worry, we won’t spam you!
            </p>
          </div>

          <div className="md:w-1/2">
            <form className="flex flex-col sm:flex-row w-full max-w-md mx-auto md:mx-0 gap-3 sm:gap-0">
              <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="pl-10 pr-3 py-3 border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none w-full focus:outline-none text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white px-5 py-3 rounded-md sm:rounded-l-none sm:rounded-r-md hover:bg-primary transition w-full sm:w-auto text-sm"
              >
                SEND
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center sm:text-left px-2 sm:px-0 leading-snug">
              By subscribing, you agree to our{" "}
              <a href="#" className="text-purple-600 hover:text-purple-800">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-purple-600 hover:text-purple-800">
                Privacy & Cookies Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
