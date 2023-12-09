import mongoose from 'mongoose'
import { IUser, UserModel } from './user.interface'

// this is the user schema which holds all the values used for user registration

const userSchema = new mongoose.Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // added this input to avoid unauthorized use of JWT token generated while logging in
    mac: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: 'patient',
      enum: ['patient', 'doctor', 'admin'],
    },
    results: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userResults',
      },
    ],
  },
  { timestamps: true },
  // we found a problem that is no show in javascript but in typescript give me error, timestamp --> timestamps
  // for this problem createdAt and updatedAt are not create in our database
)

// remove sensitive fields from the user object while sending the response
userSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject?.password
  delete userObject?.__v
  return userObject
}

// define a static method for check if the user exists in database or not
userSchema.static('isUserExists', async function (email: string) {
  const user = await User.findOne({ email })
  return user
})

const User = mongoose.model<IUser, UserModel>('User', userSchema)
export default User
