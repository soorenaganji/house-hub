import BenefitsBox from "../modules/BenefitsSection";
import CallToActionSection from "../modules/CallToActionSection";
import GettingEmailSection from "../modules/GettingEmailSection";
import HeroSection from "../modules/HeroSection";
import PropertyListingSection from "../modules/PropertyListingSection";
import TestimonialsSection from "../modules/TestimonialsSection";

const Landing = () => {
  return (
    <div className="flex flex-col gap-16 -mt-24  ">
      <div className=" bg-gradient-to-b from-[#e0defb]  via-teal-50 via-30% to-transparent pt-8 px-4  ">
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
