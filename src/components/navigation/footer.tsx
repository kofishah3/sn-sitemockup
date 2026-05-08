import { useModal } from "../../context/ModalContext";

export default function Footer() {
  const { openOutOfScope } = useModal();
  
  return (
    <footer className="bg-white border-t border-gray-100 py-10 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
      <span className="text-xs text-gray-400">
        © 2025 SN International Group
      </span>

      <div className="flex gap-8">
        <button
          onClick={openOutOfScope}
          className="text-xs text-gray-400 hover:text-black transition-colors cursor-pointer"
        >
          About Us
        </button>
        <button
          onClick={openOutOfScope}
          className="text-xs text-gray-400 hover:text-black transition-colors cursor-pointer"
        >
          Meet the Team
        </button>
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
      </div>
    </footer>
  );
}

