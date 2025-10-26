export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 py-10 text-white/60">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm">© {new Date().getFullYear()} WheelWorks — Elevate your stance.</p>
          <nav className="flex gap-5 text-sm">
            <a href="#configurator" className="hover:text-white">Configurator</a>
            <a href="#preview" className="hover:text-white">Preview</a>
            <a href="#" className="hover:text-white">Docs</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
