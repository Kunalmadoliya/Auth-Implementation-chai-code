import crypto from "crypto";
import jwt from "jsonwebtoken";

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION || "15m",
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
    complete: true,
  });
};

const generateRefereshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION || "7d",
  });
};

const verifyRefereshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
    complete: true,
  });
};

const generateResetToken = () => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  return {rawToken, hashedToken};
};

export {
  generateResetToken,
  generateAccessToken,
  generateRefereshToken,
  verifyAccessToken,
  verifyRefereshToken,
};
