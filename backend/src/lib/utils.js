import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const payload = {
    id: userId,
  };

  console.log("payload ", payload);

  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: "4d",
  });

  console.log("token", token);
  return token;
};
