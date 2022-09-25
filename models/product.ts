import mongoose from 'mongoose'
const slug = require('mongoose-slug-generator')
import { Product } from '../types'

mongoose.plugin(slug)

const ProductSchema = new mongoose.Schema<Product>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 200,
    },
    img: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    extraOptions: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
    slug: { type: String, slug: 'title' },
  },
  { timestamps: true }
)

export default mongoose.models.Product ||
  mongoose.model<Product>('Product', ProductSchema)
