export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
      <span className="text-xs text-gray-400">
        © 2025 SN International Group
      </span>

      <div className="flex gap-8">
        <a
          href="#"
          className="text-xs text-gray-400 hover:text-black transition-colors"
        >
          Privacy
        </a>
        <a
          href="#"
          className="text-xs text-gray-400 hover:text-black transition-colors"
        >
          Terms
        </a>
        <a
          href="#"
          className="text-xs text-gray-400 hover:text-black transition-colors"
        >
          AU / US Support
        </a>
      </div>
    </footer>
  );
}
