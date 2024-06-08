const GettingEmailSection = () => {
  return (
    <div className="bg-[#100A55] py-12  px-4 ">
      <h5 className="text-[#7065F0] text-xl text-center font-semibold mb-2">
        No Spam Promise
      </h5>
      <h5 className="text-3xl text-white text-center font-bold mb-4">
        Are you a landlord?
      </h5>
      <p className="text-[#D3D5DA]  text-center font-light mb-12">
        Discover ways to increase your home&apos;s value and get listed. No Spam.
      </p>
      <form className="w-full flex flex-col justify-center items-center">
        <input
          type="email"
          name=""
          id=""
          placeholder="Enter your email address"
          className="pl-6 bg-white w-64 rounded-lg outline-none py-3 mx-auto mb-4 "
        />
        <button
          type="submit"
          className="bg-primary w-64 py-3 rounded-lg text-lg font-medium text-white mx-auto "
        >
          Submit
        </button>
      </form>

      <p className="text-center text-[#9EA3AE] mt-6  " >
        Join
        <span className="text-white" >10,000+ </span>
        other landlords in our HouseHub community.
      </p>
    </div>
  ); 
};

export default GettingEmailSection;
