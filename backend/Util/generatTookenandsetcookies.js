import jwt from "jsonwebtoken";

export const generatTookenandsetcookies = (res, user_id) => {
  const token = jwt.sign({ user_id }, process.env.JWT_secret, {
    expiresIn: "7d",
  });

  
  res.cookie("tooken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 day in mmillisecond
    httpOnly: true, // prevent xss attacks croos-site scripting attacks ,make it not accessed by js
    sameSite: "strict", // csrc attacks cross site request forgery attacks
    secure: process.env.mod_env === "production",
  });
  return token;
};



