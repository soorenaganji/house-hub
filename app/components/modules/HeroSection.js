import SearchSection from "./SearchSection";
import NumbersSection from "./NumbersSection";
import icon from "public/icon.svg";
import icon2 from "public/icon2.svg";
const HeroSection = () => {
  return (
    <>
      <h1 className="text-4xl text-center font-bold ">
        Buy, rent, or sell your property easily
      </h1>
      <p className="text-lg mt-8 text-center">
        A great platform to buy, sell, or even rent your properties without any
        commisions.
      </p>
      <SearchSection />
      <div className="flex items-center justify-between mt-16">
        <NumbersSection
          icon={icon}
          title={"50k+ renters"}
          description={"believe in our service"}
        />
        <NumbersSection
          icon={icon2}
          title={"10k+ properties"}
          description={"ready for occupancy"}
        />
      </div>
    </>
  );
};

export default HeroSection;
