import CustomerFeedback from "../../components/Home/CustomerFeedback";
import HeroSection from "../../components/Home/HeroSection";
import HowItWorks from "../../components/Home/HowItWorks";
import OurServices from "../../components/Home/OurServices";
import OurValues from "../../components/Home/OurValues";
import Products from "../../components/Home/Products";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <Products />
      <OurServices></OurServices>
      <OurValues></OurValues>
      <CustomerFeedback></CustomerFeedback>
      <HowItWorks></HowItWorks>
    </div>
  );
};

export default Home;
