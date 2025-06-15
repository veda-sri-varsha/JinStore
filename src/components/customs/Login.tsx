import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { auth } from "../../config/firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";


export function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (validate()) {
    try {
      await signInWithEmailAndPassword(auth, username, password);
      localStorage.setItem("username", username.split("@")[0]);
      localStorage.setItem("isLoggedIn", "true");

      setLoginMessage("Logged in successfully!");
      setMessageType("success");

      setTimeout(() => {
        setLoginMessage(null);
        setMessageType(null);
        window.location.href = "/";
      }, 2000);
    } catch (error: unknown) {
      setLoginMessage(error instanceof Error ? error.message : "Invalid credentials. Try again.");
      setMessageType("error");

      setTimeout(() => {
        setLoginMessage(null);
        setMessageType(null);
      }, 3000);
    }
  } else {
    setLoginMessage("Please fix the errors and try again.");
    setMessageType("error");
  }
};


  const validate = () => {
    const newErrors: { username?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(username)) {
      newErrors.username = "Enter a valid email address";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="flex justify-center items-center min-h-screen cursor-pointer">
      <div className="w-full max-w-md p-8 border-none rounded">
        <div className="flex space-x-4 mb-4 justify-center">
          <Link to="/">
            <h2 className="text-lg font-semibold text-black cursor-pointer  border-b-2 border-black pb-1">
              Login
            </h2>
          </Link>
          <Link to="/register">
            <h2 className="text-lg font-medium text-gray-400 cursor-pointer">
              Register
            </h2>
          </Link>
        </div>

        <p className="text-center font-normal text-sm text-gray-600 mb-4 px-3 sm:px-0 leading-relaxed whitespace-normal sm:whitespace-nowrap">
          If you have an account, sign in with your username or email address.
        </p>

        {loginMessage && (
          <div
            className={`mb-4 px-4 py-2 text-sm rounded-md text-center font-medium transition duration-300 ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {loginMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username" className="p-2">
              Username or email address<span className="text-red-500">*</span>
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={validate}
              className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.username
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-purple-600"
              }`}
              required
            />
            {errors.username && (
              <p className="text-sm text-red-600 mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="p-2">
              Password<span className="text-red-500">*</span>
            </Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validate}
                className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-purple-600"
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Lost your password?
            </a>
          </div>

          <Button
            type="submit"
            className={`w-full text-white font-medium py-2 rounded-md transition cursor-pointer ${
              username && password
                ? "bg-primary hover:bg-violet-400"
                : "bg-violet-900 cursor-not-allowed "
            }`}
            disabled={!username || !password}
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}