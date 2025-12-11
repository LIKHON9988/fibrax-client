import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useState } from "react";

const ProductDetails = () => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <Container>
      <div className="py-10">
        {/* WRAPPER */}
        <div
          className="bg-white/10 border border-purple-300/20 backdrop-blur-2xl 
                        rounded-3xl p-6 md:p-10 shadow-xl flex flex-col lg:flex-row gap-10"
        >
          {/* LEFT SIDE (smaller image) */}
          <div className="flex-1 flex flex-col items-center">
            <div
              className="
                w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden 
                bg-white/5 border border-purple-300/30 shadow-xl
              "
            >
              <img
                src="https://i.ibb.co/DDnw6j9/1738597899-golden-money-plant.jpg"
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Small Info Badges */}
            <div className="mt-6 grid grid-cols-2 gap-4 w-full max-w-xs">
              {[
                { title: "Air Purifying", icon: "🌿" },
                { title: "Low Care", icon: "🪴" },
                { title: "Modern Look", icon: "✨" },
                { title: "Fast Growing", icon: "⚡" },
              ].map((b, i) => (
                <div
                  key={i}
                  className="
                    bg-white/5 border border-purple-300/20 p-3 rounded-xl 
                    text-center text-gray-200 text-sm
                  "
                >
                  <p className="text-lg">{b.icon}</p>
                  <p>{b.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 space-y-6">
            <Heading title="Money Plant" subtitle="Category: Succulent" />

            <p className="text-gray-200 leading-relaxed text-base md:text-lg">
              The Golden Money Plant is known for its elegant golden-green
              leaves and low maintenance nature. It enhances any interior with a
              fresh, premium look while improving indoor air quality.
            </p>

            {/* INFO BOXES */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-purple-300/20">
                <p className="text-purple-200 text-sm">Available</p>
                <p className="text-white text-xl font-bold">10 Units</p>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-purple-300/20">
                <p className="text-purple-200 text-sm">Min Order</p>
                <p className="text-white text-xl font-bold">2 Units</p>
              </div>
            </div>

            {/* SELLER CARD */}
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-purple-300/20">
              <img
                className="w-12 h-12 rounded-full border border-purple-300/30"
                src="https://lh3.googleusercontent.com/a/ACg8ocKUMU3XIX-JSUB80Gj_bYIWfYudpibgdwZE1xqmAGxHASgdvCZZ=s96-c"
                alt="Seller"
              />
              <div>
                <p className="text-gray-200 text-base">
                  <span className="font-semibold text-purple-200">Seller:</span>{" "}
                  Shakil Ahmed Atik
                </p>
                <p className="text-gray-400 text-sm">Verified Seller</p>
              </div>
            </div>

            {/* PAYMENT OPTIONS */}
            <div>
              <p className="font-semibold text-purple-200 text-sm mb-1">
                Payment Options:
              </p>
              <ul className="list-disc ml-6 text-gray-300 text-sm leading-relaxed">
                <li>Cash on Delivery</li>
                <li>PayFirst</li>
              </ul>
            </div>

            {/* PRICE + BUTTON */}
            <div className="pt-4 space-y-4">
              <p className="text-4xl font-bold text-purple-200">$10</p>

              <Button
                onClick={() => setIsOpen(true)}
                label="Order Now"
                className="!bg-purple-600 hover:!bg-purple-700 
                           !text-white shadow-lg !px-8 !py-3 rounded-xl 
                           w-full sm:w-auto"
              />
            </div>

            <PurchaseModal closeModal={closeModal} isOpen={isOpen} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
