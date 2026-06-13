export default function DashboardPageShell({ eyebrow, title, description, children }) {
  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-[0_24px_60px_rgba(91,75,255,0.08)] backdrop-blur-xl sm:p-8">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#4f46e5]">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-950 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
          {description}
        </p>
      </div>

      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}