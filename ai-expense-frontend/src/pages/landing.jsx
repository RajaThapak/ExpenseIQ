import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/Logo.png";
import { LoginForm } from "./login";
import { RegisterForm } from "./Register";

export default function Landing() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const openRegister = () => setIsRegisterOpen(true);
  const closeAuth = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,_#ffffff_0%,_#f8f7ff_100%)] text-slate-900">
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <button
          type="button"
          onClick={openLogin}
          className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
        >
          Login
        </button>

        <button
          type="button"
          onClick={openRegister}
          className="rounded-2xl bg-gradient-to-r from-[#5b4bff] to-[#6d28d9] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(91,75,255,0.18)] hover:brightness-105"
        >
          Register
        </button>
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-5rem] top-20 h-56 w-56 rounded-full bg-violet-200/25 blur-3xl" />
        <div className="absolute right-[-4rem] bottom-6 h-64 w-64 rounded-full bg-indigo-200/20 blur-3xl" />
      </div>

      {(isLoginOpen || isRegisterOpen) ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-6 py-8 backdrop-blur-sm"
          onClick={closeAuth}
        >
          <div className="w-full max-w-md" onClick={(event) => event.stopPropagation()}>
            {isRegisterOpen ? (
              <RegisterForm onLoginClick={() => {
                setIsRegisterOpen(false);
                setIsLoginOpen(true);
              }} onClose={closeAuth} />
            ) : (
              <LoginForm onRegisterClick={() => {
                setIsLoginOpen(false);
                setIsRegisterOpen(true);
              }} onClose={closeAuth} />
            )}
          </div>
        </div>
      ) : null}

      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-8 sm:px-10 lg:px-16 lg:py-10">
        <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="max-w-xl">
            <div className="mb-12 flex items-center gap-4">
              <img
                src={Logo}
                alt="ExpensoAI logo"
                className="h-16 w-16 rounded-2xl object-cover shadow-[0_18px_45px_rgba(91,52,255,0.22)]"
              />

              <div>
                <h2 className="text-[2rem] font-extrabold leading-none tracking-[-0.05em] text-slate-900 sm:text-[2.1rem]">
                  Expense<span className="text-[#4f46e5]">IQ</span>
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500 sm:text-base">
                  Smart Expense Tracker
                </p>
              </div>
            </div>

            <h1 className="max-w-[11ch] text-[3.1rem] font-black leading-[0.96] tracking-[-0.06em] text-slate-950 sm:text-[4.25rem] lg:text-[5.2rem]">
              Track Smarter.
              <span className="block text-transparent bg-gradient-to-r from-[#4f46e5] to-[#6d28d9] bg-clip-text">
                Spend Better.
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-[1.05rem] leading-8 text-slate-500 sm:text-[1.1rem]">
              AI-powered expense tracking that helps you understand your spending and make better financial decisions.
            </p>

            <div className="mt-10 space-y-6">
              <Feature
                icon={<BarsIcon />}
                iconClassName="bg-violet-100 text-violet-600"
                title="Track Expenses Effortlessly"
                desc="Add and categorize expenses in seconds"
              />
              <Feature
                icon={<ChartIcon />}
                iconClassName="bg-emerald-100 text-emerald-600"
                title="Smart Analytics"
                desc="Visualize your spending with beautiful charts"
              />
              <Feature
                icon={<SparkIcon />}
                iconClassName="bg-indigo-100 text-indigo-500"
                title="AI Insights"
                desc="Get personalized insights and saving tips"
              />
              <Feature
                icon={<ShieldIcon />}
                iconClassName="bg-amber-100 text-amber-500"
                title="Secure & Private"
                desc="Your data is encrypted and always safe"
              />
            </div>

            <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={openLogin}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#5b4bff] to-[#6d28d9] px-8 py-4 text-[1rem] font-semibold text-white shadow-[0_18px_45px_rgba(91,75,255,0.28)] transition hover:brightness-105"
              >
                Start Tracking Now
                <ArrowIcon />
              </button>

              <button className="inline-flex items-center justify-center gap-3 rounded-2xl px-2 py-4 text-[1rem] font-semibold text-[#4f46e5] transition hover:text-[#3730a3]">
                See How It Works
                <PlayIcon />
              </button>
            </div>
          </div>

          <div className="relative flex min-h-[24rem] items-center justify-center lg:min-h-[42rem]">
            <div className="absolute right-0 top-10 h-56 w-56 rounded-full bg-white/55 blur-2xl sm:h-72 sm:w-72" />
            <div className="absolute bottom-8 right-4 h-28 w-28 rounded-full border border-white/70 bg-white/35 shadow-[0_20px_40px_rgba(99,102,241,0.14)] backdrop-blur-xl sm:h-36 sm:w-36" />
            <div className="absolute right-8 top-1/3 h-14 w-14 rounded-full border border-white/80 bg-white/50 shadow-[0_12px_24px_rgba(99,102,241,0.18)] backdrop-blur-xl sm:h-20 sm:w-20" />

            <div className="relative hidden h-[34rem] w-full max-w-[26rem] rounded-[3rem] border border-white/70 bg-white/50 p-6 shadow-[0_30px_80px_rgba(91,75,255,0.16)] backdrop-blur-md lg:block">
              <div className="absolute inset-6 rounded-[2.4rem] border border-dashed border-violet-200/70" />
              <div className="absolute inset-x-10 top-14 h-20 rounded-[2rem] bg-gradient-to-r from-[#5b4bff] to-[#8b5cf6] opacity-90 blur-sm" />
              <div className="absolute left-12 top-28 h-24 w-24 rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(91,75,255,0.18)]" />
              <div className="absolute right-10 top-32 h-28 w-28 rounded-full border-[12px] border-violet-200/70 border-r-violet-500 border-t-violet-500 bg-transparent" />
              <div className="absolute bottom-20 left-14 h-16 w-16 rounded-full bg-amber-300/90 blur-[1px]" />
              <div className="absolute bottom-12 right-16 h-24 w-24 rounded-[2rem] bg-indigo-100 shadow-[0_18px_45px_rgba(99,102,241,0.16)]" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Feature({ icon, iconClassName, title, desc }) {
  return (
    <div className="flex gap-4">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconClassName} shadow-[0_14px_28px_rgba(15,23,42,0.06)]`}
      >
        {icon}
      </div>

      <div className="pt-0.5">
        <h3 className="text-[1.05rem] font-bold leading-6 text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-[0.98rem] leading-7 text-slate-500">
          {desc}
        </p>
      </div>
    </div>
  );
}

function BarsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M6 12v5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 8v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M18 5v12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 19h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M7 15V10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 15V7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M17 15V12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3Z" fill="currentColor" />
      <path d="M18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9L18 14Z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 3l7 3v5c0 4.8-2.9 8.7-7 10-4.1-1.3-7-5.2-7-10V6l7-3Z"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path d="M9.5 12.2l1.7 1.8 3.5-4" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M5 12h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M10 8.8l5 3.2-5 3.2V8.8Z" fill="currentColor" />
    </svg>
  );
}