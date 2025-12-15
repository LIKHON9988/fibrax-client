const Button = ({ label, onClick, disabled, icon: Icon }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className=" mt-auto
                w-full py-1.5 text-center rounded-xl
                bg-gradient-to-r from-purple-600/40 to-pink-600/40
                border border-purple-300/30
                text-white text-sm font-semibold
                hover:from-purple-600/60 hover:to-pink-600/60
                transition-all py-3"
    >
      {Icon && (
        <Icon
          size={24}
          className="
              absolute
              left-4
              top-3
            "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
