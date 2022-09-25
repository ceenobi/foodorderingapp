import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../utils/mongo'
import Product from '../../../models/product'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  dbConnect()
  if (method === 'GET') {
    try {
      const products = await Product.find()
      res.status(200).json(products)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  if (method === 'POST') {
    try {
      const products = await Product.create(req.body)
      res.status(201).json(products)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
