import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../utils/mongo'
import Order from '../../../models/order'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dbConnect()
  const {
    method,
    query: { id },
  } = req

  if (method === 'GET') {
    try {
      const order = await Order.findById(id)
      res.status(200).json(order)
    } catch (error) {
      res.status(500).json(error)
    }
  }
  if (method === 'POST') {
  }
  if (method === 'PUT') {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      })
      res.status(201).json(order)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  if (method === 'DELETE') {
  }
}
