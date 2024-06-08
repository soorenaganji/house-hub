const validate = (data, isForLogIn) => {
  const errors = {};
  if (isForLogIn) {
    if (!data.email.trim()) {
      errors.Email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(data.Email)) {
      errors.Email = "Email address is invalid";
    } else {
      delete errors.Email;
    }
    if (!data.password.trim()) {
      errors.Password = "Password is required";
    } else if (data.password.length < 6) {
      errors.Password = "Password need to be 6 character or more";
    } else {
      delete errors.Password;
    }
  } else {
    if (!data.name.trim()) {
      errors.name = "Username required";
    } else {
      delete errors.name;
    }
    if (!data.lastName.trim()) {
      errors.lastName = "LastName  required";
    } else {
      delete errors.lastName;
    }
    if (!data.Email.trim()) {
      errors.Email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(data.Email)) {
      errors.Email = "Email address is invalid";
    } else {
      delete errors.Email;
    }
    if (!data.Password.trim()) {
      errors.Password = "Password is required";
    } else if (data.Password.length < 6) {
      errors.Password = "Password need to be 6 character or more";
    } else {
      delete errors.Password;
    }

    if (!data.Password2.trim()) {
      errors.Password2 = "Confirm the password";
    } else if (data.Password2 !== data.Password) {
      errors.Password2 = "Password do not match";
    } else {
      delete errors.Password2;
    }
  }
  return errors;
};
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
};
const validateForm = (formData, toast) => {
  const {
    title,
    description,
    city,
    street,
    zipcode,
    phoneNumber,
    email,
    rentalOrSell,
    deposit,
    mortgage,
    price,
  } = formData;

  if (
    title.length < 2 ||
    description.length < 2 ||
    city.length < 2 ||
    street.length < 2 ||
    zipcode.length < 2 ||
    phoneNumber.length < 2 ||
    email.length < 2
  ) {
    toast.error("All fields must be at least 2 characters long.");
    return false;
  }

  if (!validateEmail(email)) {
    toast.error("Please enter a valid email address.");
    return false;
  }

  if (
    rentalOrSell === "rental" &&
    (deposit.length < 2 || mortgage.length < 2)
  ) {
    toast.error(
      "Deposit and Mortgage fields must be at least 2 characters long."
    );
    return false;
  }
  if (rentalOrSell === "sell" && price.length < 2) {
    toast.error("Price field must be at least 2 characters long.");
    return false;
  }

  return true;
};

export { validate, validateForm };
