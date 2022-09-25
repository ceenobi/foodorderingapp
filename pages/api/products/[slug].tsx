import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../utils/mongo'
import Product from '../../../models/product'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { slug },
  } = req
  dbConnect()

  if (method === 'GET') {
    try {
      const product = await Product.findOne({ slug: slug })
      res.status(200).json(product)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  if (method === 'PUT') {
    try {
      const product = await Product.findByIdAndUpdate(req.body)
      res.status(201).json(product)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  if (method === 'DELETE') {
    try {
      await Product.findOneAndDelete({ slug: slug })
      res.status(200).json('Product deleted successfully')
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
