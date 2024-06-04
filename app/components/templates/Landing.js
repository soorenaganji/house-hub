import CallToActionSection from "../modules/CallToActionSection";
import HeroSection from "../modules/HeroSection";

const Landing = () => {
  return (
    <div className="flex flex-col gap-16 ">
    <div className=" bg-gradient-to-b from-[#E0DEF7] to-transparent  min-h-screen pt-36 px-4  ">
      <HeroSection />

    </div>
    <div className="px-4">
    <CallToActionSection />
    </div>

    </div>
  );
};

export default Landing;
