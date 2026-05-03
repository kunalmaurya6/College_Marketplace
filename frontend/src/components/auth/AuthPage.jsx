import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/useAuth";

const initialForm = {
  username: "",
  email: "",
  password: "",
};

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, isAuthenticated } = useAuth();
  const initialMode = location.pathname === "/signup" ? "signup" : "login";
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = location.state?.from?.pathname || "/";

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const isSignup = mode === "signup";

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      if (isSignup) {
        await signup(form);
        toast.success("Account created");
      } else {
        await login({
          email: form.email,
          password: form.password,
        });
        toast.success("Welcome back");
      }

      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setForm(initialForm);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-950">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.92fr_1fr] lg:px-8">
        <section className="hidden lg:block">
          <img src={logo} alt="College Marketplace" className="h-28 w-auto object-contain" />
          <h1 className="mt-8 max-w-xl text-5xl font-extrabold tracking-tight">
            Campus buying and selling, tied to your account.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-gray-600">
            Sign in to manage your own uploads, keep your cart private, and continue browsing approved campus listings.
          </p>
          <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
            {["Private cart", "Your listings", "Secure access"].map((item) => (
              <div key={item} className="rounded-lg border border-gray-200 bg-white p-4 text-sm font-bold text-gray-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <img src={logo} alt="College Marketplace" className="h-16 w-auto object-contain lg:hidden" />
            <div className="ml-auto inline-flex rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`rounded-md px-4 py-2 text-sm font-bold transition ${!isSignup ? "bg-white text-blue-700 shadow-sm" : "text-gray-600"}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className={`rounded-md px-4 py-2 text-sm font-bold transition ${isSignup ? "bg-white text-blue-700 shadow-sm" : "text-gray-600"}`}
              >
                Sign up
              </button>
            </div>
          </div>

          <div className="mt-7">
            <h2 className="text-2xl font-extrabold">{isSignup ? "Create account" : "Login to continue"}</h2>
            <p className="mt-2 text-sm text-gray-500">
              {isSignup ? "Create your marketplace account with a password of at least 6 characters." : "Enter your account details to open the marketplace."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {isSignup && (
              <label className="block">
                <span className="text-sm font-bold text-gray-700">Username</span>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                  className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  required
                />
              </label>
            )}

            <label className="block">
              <span className="text-sm font-bold text-gray-700">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-gray-700">Password</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                autoComplete={isSignup ? "new-password" : "current-password"}
                minLength={isSignup ? 6 : undefined}
                title={isSignup ? "Password must be at least 6 characters" : undefined}
                className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                required
              />
              {isSignup && (
                <p className="mt-2 text-xs text-gray-500">
                  Password must be at least 6 characters.
                </p>
              )}
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-extrabold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <i className={isSignup ? "fa-solid fa-user-plus" : "fa-solid fa-right-to-bracket"}></i>
              {submitting ? "Please wait..." : isSignup ? "Create Account" : "Login"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default AuthPage;
