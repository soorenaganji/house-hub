import SearchBox from "./SearchBox";
import NumbersBox from "./NumbersBox";
import icon1 from "public/icon1.png";
import icon2 from "public/icon2.png";
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
      <SearchBox />
      <div className="flex items-center justify-between mt-16">
        <NumbersBox
          icon={icon1}
          title={"50k+ renters"}
          description={"believe in our service"}
        />
        <NumbersBox
          icon={icon2}
          title={"10k+ properties"}
          description={"ready for occupancy"}
        />
      </div>
    </>
  );
};

export default HeroSection;
