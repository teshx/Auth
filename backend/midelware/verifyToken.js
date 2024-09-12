import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.tooken;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "unauthorized -no token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_secret);
    if (!decoded)
      return res.status(401).json({
        success: false,
        message: "unauthorized -invalid token provided",
      });
    req.user_id = decoded.user_id;
    console.log("WOrk in verifyToken", req.user_id);
    next();
  } catch (error) {
    console.log("error in verifyToken", error);
    return res.status(500).json({ success: false, message: "serveer error" });
  }
};
