import Benefits from "./BenefitsCard";
import icon1 from "public/Benefit1.svg";
import icon2 from "public/Benefit2.svg";
import icon3 from "public/Benefit3.svg";
import icon4 from "public/Benefit4.svg";
const BenefitsBox = () => {
  return (
    <div className="px-3 flex flex-col gap-6 justify-center align-center mt-9 md:grid md:grid-cols-2 md:w-[50%] md:h-full  md:gap-y-36 ">
      <Benefits
        image={icon1}
        title={"Property Insurance"}
        description={
          "We offer our customer property protection of liability coverage and insurance for their better life."
        }
      />
      <Benefits
        image={icon2}
        title={"Best Price"}
        description={
          "Not sure what  you should be charging for your property? No need to worry, let us do the numbers for you."
        }
      />
      <Benefits
        image={icon3}
        title={"Lowest Commission"}
        description={
          "You no longer have to negotiate commissions and haggle with other agents it only cost 2%!"
        }
      />
      <Benefits
        image={icon4}
        title={"Overall Control"}
        description={
          "You no longer have to negotiate commissions and haggle with other agents it only cost 2%!"
        }
      />
    </div>
  );
};

export default BenefitsBox;
