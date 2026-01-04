export default function GradientButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 rounded-md font-medium text-white 
                 bg-gradient-to-r from-blue-900/95 to-blue-500/75
                 hover:from-blue-800/95 hover:to-blue-400/75
                 transition transform hover:-translate-y-1 hover:shadow-lg"
    >
      {children}
    </button>
  );
}
