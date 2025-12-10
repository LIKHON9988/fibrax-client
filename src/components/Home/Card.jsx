import { Link } from "react-router";

const Card = () => {
  return (
    <div className="col-span-1">
      <div
        className="
          relative 
          p-6 
          rounded-3xl 
          overflow-hidden 
          bg-white/10 
          backdrop-blur-2xl 
          border border-white/20
          group 
          shadow-2xl 
          transition 
          hover:scale-[1.02]
          hover:shadow-purple-500/40
        "
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl opacity-40"></div>

        {/* CONTENT WRAPPER */}
        <div className="relative flex flex-col md:flex-row gap-6">
          {/* LEFT — IMAGE */}
          <div
            className="
              md:w-1/2 
              w-full 
              rounded-2xl 
              overflow-hidden 
              shadow-xl
            "
          >
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/016/283/763/small/cricket-bat-cartoon-style-vector.jpg"
              alt="Product"
              className="
                w-full h-full object-cover 
                transition-all duration-500 
                group-hover:scale-110 
              "
            />
          </div>

          {/* RIGHT — TEXT CONTENT */}
          <div className="md:w-1/2 w-full flex flex-col justify-between text-white space-y-4">
            <div>
              <h2 className="text-3xl font-bold tracking-wide drop-shadow-sm">
                bat
              </h2>

              <p className="text-sm opacity-80 mt-2">
                <span className="font-semibold">Category:</span> Outdoor
              </p>

              <p className="text-sm opacity-80">
                <span className="font-semibold">Available:</span> 10 pcs
              </p>

              <p className="text-2xl font-semibold text-purple-300 mt-4">$15</p>
            </div>

            {/* BUTTON */}
            <Link
              to={`/product/1`}
              className="
                mt-4
                w-full py-3 text-center rounded-xl 
                bg-gradient-to-r from-purple-600/40 to-pink-600/40
                border border-purple-300/30 
                text-white font-semibold backdrop-blur-xl 
                hover:from-purple-600/60 hover:to-pink-600/60
                hover:shadow-lg hover:shadow-purple-500/30
                transition-all duration-300
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
