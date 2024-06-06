import BenefitsBox from "../modules/BenefitsSection";
import CallToActionSection from "../modules/CallToActionSection";
import GettingEmailSection from "../modules/GettingEmailSection";
import HeroSection from "../modules/HeroSection";
import PropertyListingSection from "../modules/PropertyListingSection";
import TestimonialsSection from "../modules/TestimonialsSection";

const Landing = () => {
  return (
    <div className="flex flex-col gap-16 ">
      <div className=" bg-gradient-to-b from-[#E0DEF7] to-transparent pt-36 px-4  ">
        <HeroSection />
      </div>
      <div className="px-4 flex flex-col gap-16">
        <CallToActionSection />
        <BenefitsBox />
        <PropertyListingSection />
        <TestimonialsSection />
      </div>
      <GettingEmailSection />
    </div>
  );
};

export default Landing;
