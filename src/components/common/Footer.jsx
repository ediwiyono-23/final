export default function Footer() {
  return (
    <footer
      className="
        relative
        bg-linear-to-b from-[#020617] to-[#020617]
        text-slate-400
        text-center
        py-16
        border-t border-white/10
        overflow-hidden
      "
    >
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(251,191,36,0.6), transparent)",
        }}
      />

      <div className="relative z-10 space-y-3">
        <p className="text-sm font-semibold tracking-wide text-slate-300">
          © 2026 <span className="text-amber-300">OMKESTORE</span>
        </p>

        <p className="text-[11px] tracking-[0.3em] uppercase text-slate-500">
          React • Tailwind • MockAPI
        </p>
      </div>

      <div
        className="hidden md:block pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-40"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 100%, rgba(251,191,36,0.12), transparent 70%)",
        }}
      />
    </footer>
  );
}
