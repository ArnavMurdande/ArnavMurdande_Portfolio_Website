const SectionBackground = ({ 
  children,
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};

export default SectionBackground;
