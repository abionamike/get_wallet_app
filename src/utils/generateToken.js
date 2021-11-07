import jwt from 'jsonwebtoken';

const generateToken = (email) => {
  return jwt.sign({ email }, 'jsjjsksiwiiieiei', {
    expiresIn: 20,
  });
}

export default generateToken;