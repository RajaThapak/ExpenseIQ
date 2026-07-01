import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export function RegisterForm({ onClose, onLoginClick }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      await registerUser({
        username,
        email,
        password,
      });

      if (typeof onClose === "function") {
        onClose();
      }

      // Redirect to login page after successful registration
      navigate("/login");

    } catch (err) {
      const data = err.response?.data;

      if (data) {
        const firstError = Object.values(data)[0];
        setError(
          Array.isArray(firstError) ? firstError[0] : firstError
        );
      } else {
        setError("Registration failed. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_30px_80px_rgba(91,75,255,0.18)] backdrop-blur-xl">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-[#5b4bff] to-[#6d28d9] px-3 py-1.5 text-xs font-semibold text-white shadow-[0_10px_25px_rgba(91,75,255,0.22)] transition hover:brightness-105"
      >
        Close
      </button>

      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#4f46e5]">
          Get started
        </p>

        <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-slate-950">
          Create your account
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Create your ExpenseIQ account and turn your spending data into smart
          financial decisions. Your future self will thank you.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="register-name"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Username
          </label>

          <input
            id="register-name"
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#5b4bff] focus:ring-4 focus:ring-[#5b4bff]/10"
          />
        </div>

        <div>
          <label
            htmlFor="register-email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Email address
          </label>

          <input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#5b4bff] focus:ring-4 focus:ring-[#5b4bff]/10"
          />
        </div>

        <div>
          <label
            htmlFor="register-password"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Password
          </label>

          <input
            id="register-password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#5b4bff] focus:ring-4 focus:ring-[#5b4bff]/10"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#5b4bff] to-[#6d28d9] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(91,75,255,0.28)] transition hover:brightness-105 disabled:opacity-70"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <button
          type="button"
          onClick={onLoginClick}
          className="inline-flex w-full items-center justify-center rounded-2xl border border-violet-200 bg-white px-5 py-3.5 text-sm font-semibold text-[#4f46e5] transition hover:bg-violet-50"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,_#ffffff_0%,_#f8f7ff_100%)] px-6 py-10 text-slate-900">
      <RegisterForm />
    </div>
  );
}