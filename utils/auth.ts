import jwt from 'jsonwebtoken'
import User from '../models/user'

const authorize = async (req: { headers: { authorization: string }; user: any }, res: { status: (arg0: number) => void }, next: () => void) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const isCustomAuth = token.length < 500
      if (token && isCustomAuth) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        req.user = await User.findById(decoded.id).select('-password')
      } else {
        const decoded = jwt.decode(token)
        req.user = decoded?.sub
      }
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token found')
  }
}

export default authorize
