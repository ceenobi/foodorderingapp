import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { User } from '../types'

const UserSchema = new mongoose.Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: true },
    username: { type: String },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

UserSchema.methods.matchPassword = async function (enterPassword: any) {
  return await bcrypt.compare(enterPassword, this.password)
}
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
}) 

export default mongoose.models.User || mongoose.model<User>('User', UserSchema)
