import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/mongo'
import generateToken from '../../../utils/generateToken'
import User from '../../../models/user'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dbConnect()
  const { method } = req
  if (method === 'POST') {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      if (user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
          createdAt: user.createdAt,
        })
      } else {
        res.status(401)
        throw new Error('Invalid Username or Password')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
