import Container from "../Shared/Container";
import { motion } from "framer-motion";

const OurServices = () => {
  return (
    <Container>
      <section className="px-4 pt-20 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <motion.h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight text-purple-200 text-center mb-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Our Services
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Design",
                desc: "Exclusive support for premium clients in garment design and development.",
                img: "https://textiletoday.com.bd/storage/uploads/2024/1/4786eoxOcyM17BNFNoMx.png",
              },
              {
                title: "Manufacturing",
                desc: "Compliance-driven, ethical manufacturing aligned with global safety standards.",
                img: "https://cdn.shopify.com/s/files/1/0611/3515/9546/files/articleapparel_1024x1024.jpg?v=1709558409",
              },
              {
                title: "Sustainability",
                desc: "Responsible sourcing, materials traceability, and optimized usage.",
                img: "https://content.jdmagicbox.com/v2/comp/muzaffarnagar/f1/9999px131.x131.180321140828.t7f1/catalogue/red-tape-stores-mahaveer-b-muzaffarnagar-readymade-garment-retailers-LZWdjARiz2.jpg",
              },
              {
                title: "Quality",
                desc: "Rigorous QC processes with skilled teams to uphold high standards.",
                img: "https://affine.ai/wp-content/uploads/2022/03/product_life_cycle_apparel_featured_blog.jpg",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="
                  rounded-3xl border border-purple-300/20
                  bg-white/10 backdrop-blur-2xl
                  shadow-2xl shadow-purple-900/20
                  overflow-hidden
                "
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="relative w-full h-40"
                  style={{
                    clipPath: "ellipse(80% 75% at 50% 0%)",
                  }}
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 via-transparent to-transparent" />
                </div>

                <div className="px-5 pb-6 ">
                  <h3 className="text-lg font-semibold text-purple-200">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-300">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default OurServices;
