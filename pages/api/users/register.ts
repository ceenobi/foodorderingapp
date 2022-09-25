import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/mongo'
import generateToken from '../../../utils/generateToken'
import authorize from '../../../utils/auth'
import User from '../../../models/user'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dbConnect()
  const { method } = req
  if (method === 'POST') {
    try {
      const { username, email, password } = req.body
      const userExists = await User.findOne({ email })
      if (userExists) {
        res.status(400)
        throw new Error('User already exists')
      }

      const user = await User.create({ username, email, password })
      if (user) {
        res.status(201).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        })
      } else {
        res.status(400)
        throw new Error('Invalid User data')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
