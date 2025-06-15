import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { auth } from "../../config/firebase"; 
import { createUserWithEmailAndPassword} from "firebase/auth";

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
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const validate = () => {
    const newErrors: { username?: string; email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (validate()) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Optional: save username or role to Firestore if needed
      setRegisterMessage("Registered successfully!");
      setMessageType("success");

      setTimeout(() => {
        setRegisterMessage(null);
        setMessageType(null);
        window.location.href = "/";
      }, 2000);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during registration';
      setRegisterMessage(errorMessage);
      setMessageType("error");
    }
  } else {
    setRegisterMessage("Fill the required fields");
    setMessageType("error");
    setTimeout(() => {
      setRegisterMessage(null);
      setMessageType(null);
    }, 3000);
  }
};


  return (
    <div className="max-w-md mx-auto px-6 py-5 bg-white rounded-lg m-10">
      <div className="mb-6 flex justify-center gap-4 text-lg font-semibold">
        <Link to="/login">
          <span className="text-gray-400">Login</span>
        </Link>
        <span className="text-black border-b-2 border-black pb-1">
          Register
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4 text-center">
        There are many advantages to creating an account: faster checkout,
        shipment tracking, and more.
      </p>

      {registerMessage && (
        <div
          className={`mb-4 px-4 py-2 text-sm rounded-md text-center font-medium transition duration-300 ${
            messageType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {registerMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
        <div>
          <Label className="text-sm font-medium p-1">
            Username<span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={validate}
            title="Username"
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
          <Label className="text-sm font-medium p-1">
            Email address<span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validate}
            title="Email address"
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-purple-600"
            }`}
            required
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
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
              title="Password"
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

        <div className="space-y-2 mt-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="customer"
              checked={role === "customer"}
              onChange={() => setRole("customer")}
              className="accent-primary"
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
              className="accent-primary"
            />
            I am a vendor
          </label>
        </div>

        <p className="text-xs text-gray-500 mb-1">
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our{" "}
          <a href="#" className="text-purple-900 underline">
            privacy policy
          </a>
          .
        </p>

        <div className="pt-4">
          <Button
            type="submit"
            className={`w-full text-white font-medium py-2 rounded-md transition ${
              username && password && email
                ? "bg-primary hover:bg-violet-400"
                : "bg-violet-900 cursor-not-allowed"
            }`}
            disabled={!username || !password || !email}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}