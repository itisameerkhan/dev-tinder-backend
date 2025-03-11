export const adminAuthFunction = (req, res, next) => {
  const token = req.body?.token;
  if (token === "abc") {
    next();
  } else {
    res.status(401).send("invalid token")
  }
};

export const userAuthFunction = (req, res, next) => {
    const token = req.body?.token;
    if (token === "abc") {
      next();
    } else {
      res.status(401).send("invalid token")
    }
  };
  