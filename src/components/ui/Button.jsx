export default function Button({ children, onClick, className = '', variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
  };

  return (
    <button 
      onClick={onClick} 
      className={`px-4 py-2 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 ${variants[variant]} ${className}`} 
      {...props}>
      {children}
    </button>
  );
}
