import jwt from 'jsonwebtoken'

const secretKey = 'suaChaveSecreta' // Substitua pela sua chave secreta

const generateToken = (payload) => jwt.sign(payload, secretKey, { expiresIn: '1h' })

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey)
  } catch (error) {
    return null
  }
}

export { generateToken, verifyToken }
