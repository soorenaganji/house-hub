const ContactModal = ({ phoneNumber, email, className, closeContactModal }) => {
  return (
    <div
      onClick={closeContactModal}
      className={
        "absolute -bottom-[91vh] rounded-t-2xl  mx-auto  transition-all duration-300  bg-white  border lg:text-lg shadow-lg w-sm  box-border text-sm  h-48 px-6 pt-8 " +
        className
      }
    >
      <p className="mb-12">
        Email :{" "}
        <a
          target="blank"
          className={
            "p-2 rounded-lg hover:bg-primary transition-all duration-150 hover:text-white  "
          }
          href={`mailto:${email}`}
        >
          {email}
        </a>
      </p>

      <p className={""}>
        Phone Number :{" "}
        <span className=" hover:bg-primary transition-all duration-150 hover:text-white cursor-pointer p-2 rounded-lg">
          {" "}
          {phoneNumber}
        </span>{" "}
      </p>
    </div>
  );
};

export default ContactModal;
