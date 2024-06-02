import Image from "next/image";
const NumbersSection = ({ icon, title, description }) => {
  return (
    <div>
      <Image
        src={icon}
        width={64}
        height={64}
        alt="icon"
        className="w-16 h-16 mb-8"
      />
      <div className="">
        <h2 className="text-lg font-bold text-primary">{title}</h2>
        <p className="font-medium text-sm mt-1">{description}</p>
      </div>
    </div>
  );
};

export default NumbersSection;
