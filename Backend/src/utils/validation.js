import validator from "validator";

export const validateNewUser = async (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("name is not valid");
  } else if (firstName.length < 4 || firstName.length > 20) {
    throw new Error("firstName length should be 4 to 20 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong");
  }
};

export const validateProfileEdit = (req) => {
  const ALLOWED_UPDATES = [
    "firstName",
    "lastName",
    "gender", 
    "age",
    "photoURL",
    "phoneNumber",
    "skills",
    "about", 
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    ALLOWED_UPDATES.includes(field)
  );

  return isEditAllowed;
};
