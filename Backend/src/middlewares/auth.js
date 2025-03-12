export const adminAuthFunction = (req, res, next) => {
  const token = req.body?.token;
  if (token === "abc") {
    next();
  } else {
    // res.status(401).send("invalid token");
    throw new Error("INVALID AUTHENTICATION");
  }
};

export const userAuthFunction = (req, res, next) => {
  const token = req.body?.token;
  if (token === "abc") {
    next();
  } else {
    //   res.status(401).send("invalid token")
    throw new Error("AUTHENTICATION ERROR");
  }
};
