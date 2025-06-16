import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { auth, provider } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export function Register() {
  const [role, setRole] = useState<string>("customer");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});
  const [registerMessage, setRegisterMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  const validate = () => {
    const newErrors: { username?: string; email?: string; password?: string } =
      {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim()) newErrors.username = "Username is required";
    else if (username.length < 3) newErrors.username = "Minimum 3 characters";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email address";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Minimum 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setRegisterMessage("Fill all fields correctly.");
      setMessageType("error");
      setTimeout(() => setRegisterMessage(null), 3000);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setRegisterMessage("Registered successfully!");
      setMessageType("success");
      setTimeout(() => {
        setRegisterMessage(null);
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Something went wrong during registration.";
      setRegisterMessage(errorMsg);
      setMessageType("error");
      setTimeout(() => setRegisterMessage(null), 3000);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      setRegisterMessage("Google Sign-in success!");
      setMessageType("success");
      setTimeout(() => {
        setRegisterMessage(null);
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Google Sign-in failed.";
      setRegisterMessage(errorMsg);
      setMessageType("error");
      setTimeout(() => setRegisterMessage(null), 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-5 bg-white rounded-lg m-10">
      <div className="mb-6 flex justify-center gap-4 text-lg font-semibold">
        <Link to="/login" className="text-gray-400">
          Login
        </Link>
        <span className="text-black border-b-2 border-black pb-1">
          Register
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4 text-center">
        Create an account to enjoy faster checkout, order tracking, and more!
      </p>

      {registerMessage && (
        <div
          className={`mb-4 px-4 py-2 text-sm rounded-md text-center font-medium ${
            messageType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {registerMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="text-sm font-medium p-1">
            Username<span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={validate}
            className={`w-full px-3 py-2 border ${
              errors.username ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 ${
              errors.username ? "focus:ring-red-500" : "focus:ring-purple-600"
            }`}
          />
          {errors.username && (
            <p className="text-sm text-red-600">{errors.username}</p>
          )}
        </div>

        <div>
          <Label className="text-sm font-medium p-1">
            Email<span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validate}
            className={`w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 ${
              errors.email ? "focus:ring-red-500" : "focus:ring-purple-600"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <Label className="text-sm font-medium p-1">
            Password<span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validate}
              className={`w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 ${
                errors.password ? "focus:ring-red-500" : "focus:ring-purple-600"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="customer"
              checked={role === "customer"}
              onChange={() => setRole("customer")}
              className="accent-purple-500"
            />
            I am a customer
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="vendor"
              checked={role === "vendor"}
              onChange={() => setRole("vendor")}
              className="accent-purple-500"
            />
            I am a vendor
          </label>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={!username || !email || !password}
            className={`w-full font-medium py-2 rounded-md ${
              username && email && password
                ? "bg-primary hover:bg-violet-400"
                : "bg-violet-900 cursor-not-allowed"
            }`}
          >
            Register
          </Button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-primary hover:bg-violet-900 text-white font-medium py-2 rounded-md"
          >
            Sign in with Google
          </Button>
        </div>
      </form>
    </div>
  );
}
