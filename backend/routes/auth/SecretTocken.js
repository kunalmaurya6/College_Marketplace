import 'dotenv/config';
import jwt from "jsonwebtoken";

const secretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 50 * 24 * 60 * 60,
  });
};

export default secretToken;