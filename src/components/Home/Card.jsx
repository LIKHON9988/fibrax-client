import { Link } from "react-router";

const Card = ({ product }) => {
  const { _id, category, image, name, quantity, price } = product || {};

  return (
    <div className="h-full w-full">
      <div
        className="
          h-full
          bg-white/10
          backdrop-blur-xl
          rounded-3xl
          border border-white/20
          shadow-lg
          transition-all duration-300
          hover:shadow-purple-500/40
          hover:-translate-y-1
          p-3 sm:p-4
          flex flex-col md:flex-row gap-3
          w-full
        "
      >
        {/* IMAGE */}
        <div
          className="
            w-full md:w-[45%]
            h-40 sm:h-44 md:h-full
            rounded-2xl
            overflow-hidden
          "
        >
          <img
            src={image}
            alt={name}
            className="w-full h-[180px] object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 text-white text-sm">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold line-clamp-2">
              {name}
            </h2>

            <p className="opacity-80 line-clamp-1">
              <span className="font-semibold">Category:</span> {category}
            </p>

            <p className="opacity-80">
              <span className="font-semibold">Available:</span> {quantity}
            </p>

            <p className="text-lg sm:text-xl font-semibold text-purple-300 mt-1">
              ${price}
            </p>
          </div>

          {/* BUTTON */}
          <Link
            to={`/product/${_id}`}
            className="
              mt-auto
              w-full py-1.5 text-center rounded-xl
              bg-gradient-to-r from-purple-600/40 to-pink-600/40
              border border-purple-300/30
              text-white text-sm font-semibold
              hover:from-purple-600/60 hover:to-pink-600/60
              transition-all
            "
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
