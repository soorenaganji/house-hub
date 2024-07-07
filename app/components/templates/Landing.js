import BenefitsBox from "../modules/BenefitsSection";
import CallToActionSection from "../modules/CallToActionSection";
import GettingEmailSection from "../modules/GettingEmailSection";
import HeroSection from "../modules/HeroSection";
import PropertyListingSection from "../modules/PropertyListingSection";
import TestimonialsSection from "../modules/TestimonialsSection";
import NumbersBox from "@/app/components/modules/NumbersBox";
import number1 from "public/number1.png";
import number2 from "public/number2.png";
const Landing = () => {
  return (
    <div className="flex flex-col gap-16 -mt-24  ">
      <div className=" bg-gradient-to-b from-[#e0defb]  via-teal-50 via-30% to-transparent pt-8 px-4 md:px-0 md:via-inherit md:from-[#e0defb7d] md:bg-[#F7F7FD] md:to-[#e0defb] min-h-screen">
        <HeroSection />
      </div>
      <div className="px-4 md:px-12 flex flex-col gap-16 md:bg-gradient-to-b md:from-white md:via-#e0defb md:to-white">
      <div className="flex items-center justify-between mt-16">
        <NumbersBox
          icon={number1}
          title={"50k+ renters"}
          description={"believe in our service"}
        />
        <NumbersBox
          icon={number2}
          title={"10k+ properties"}
          description={"ready for occupancy"}
        />
      </div>
      <div className="md:flex items-center justify-between" >
                <CallToActionSection />
        <BenefitsBox />
      </div>

        <PropertyListingSection />
        <TestimonialsSection />
      </div>
      <GettingEmailSection />
    </div>
  );
};

export default Landing;
