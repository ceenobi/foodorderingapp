import mongoose from 'mongoose'
import { Image } from '../types'

const ImageSchema = new mongoose.Schema<Image>(
  {
    img: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Image ||
  mongoose.model<Image>('Image', ImageSchema)
