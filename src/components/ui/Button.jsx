export default function Button({ children, onClick, className = '', ...props }) {
  return (
    <button onClick={onClick} className={"px-4 py-2 rounded-md bg-black text-white " + className} {...props}>
      {children}
    </button>
  );
}
