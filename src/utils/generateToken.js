import jwt from 'jsonwebtoken';

const generateToken = (email) => {
  return jwt.sign({ email }, 'jsjjsksiwiiieiei', {
    expiresIn: 3600,
  });
}

export default generateToken;