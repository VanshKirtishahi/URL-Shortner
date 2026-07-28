import { Link } from 'react-router-dom';

export default function NeoButton({ children, to, variant = 'primary', className = '', onClick }) {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 border-2 border-black rounded-xl font-bold transition-all duration-200 active:scale-95";
  
  const variants = {
    primary: "bg-black text-white shadow-hard-lg hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none",
    secondary: "bg-white text-black shadow-hard hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none",
    accent: "bg-neo-yellow text-black shadow-hard hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none",
  };

  const combinedClasses = `${baseStyle} ${variants[variant]} ${className}`;

  if (to) {
    return <Link to={to} className={combinedClasses}>{children}</Link>;
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
}