export default function GradientButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        px-6 py-3 rounded-full font-semibold
        text-white
        bg-gradient-to-r from-sky-900/95 to-sky-500/75
        hover:from-sky-800/95 hover:to-sky-400/75
        transition transform hover:scale-105 hover:shadow-xl
      "
    >
      {children}
    </button>
  );
}
