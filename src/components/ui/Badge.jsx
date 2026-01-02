export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-block bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${className}`}>
      {children}
    </span>
  );
}
