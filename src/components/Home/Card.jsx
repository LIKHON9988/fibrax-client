import { Link } from "react-router";

const Card = ({ product }) => {
  const { _id, category, image, name, quantity, price } = product || {};

  return (
    <div className="col-span-1 w-full">
      <div
        className="
          relative
          bg-white/10
          backdrop-blur-xl
          rounded-3xl
          border border-white/20
          shadow-lg
          overflow-hidden
          transition-all duration-300
          hover:shadow-purple-500/40
          hover:-translate-y-1
          p-4
        "
      >
        {/* WRAPPER — STACK ON MOBILE, SIDE-BY-SIDE ON MD+ */}
        <div className="flex flex-col md:flex-row gap-5 items-center md:items-stretch">
          {/* LEFT — IMAGE */}
          <div className="w-full md:w-1/2 h-48 sm:h-56 md:h-auto md:min-h-[180px] rounded-2xl overflow-hidden shadow-md flex-shrink-0">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>

          {/* RIGHT — TEXT */}
          <div className="w-full md:w-1/2 flex flex-col justify-between text-white space-y-3">
            <div>
              <h2 className="text-xl md:text-2xl font-bold line-clamp-2">
                {name}
              </h2>

              <p className="text-sm opacity-80 mt-1">
                <span className="font-semibold">Category:</span> {category}
              </p>

              <p className="text-sm opacity-80">
                <span className="font-semibold">Available:</span> {quantity}
              </p>

              <p className="text-2xl font-semibold text-purple-300 mt-3">
                ${price}
              </p>
            </div>

            {/* BUTTON */}
            <Link
              to={`/product/${_id}`}
              className="
                w-full py-3 text-center rounded-xl
                bg-gradient-to-r from-purple-600/40 to-pink-600/40
                border border-purple-300/30
                text-white font-semibold backdrop-blur-xl
                hover:from-purple-600/60 hover:to-pink-600/60
                hover:shadow-lg hover:shadow-purple-500/30
                transition-all
              "
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
