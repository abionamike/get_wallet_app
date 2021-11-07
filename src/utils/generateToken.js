import jwt from 'jsonwebtoken';

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.REACT_APP_JWT_SECRET, {
    expiresIn: 3600,
  })
}

export default generateToken;