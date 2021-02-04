import mongoose from 'mongoose'

const characterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    realName: {
      type: String,
    },
    firstAppearance: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    homeUniverse: {
      type: String,
      required: true,
    },
    good: {
      type: Boolean,
      default: false,
    },
    evil: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      required: true,
    },
    placeOfBirth: {
      type: String,
      required: true,
    },
    citizenship: {
      type: String,
      required: true,
    },
    base: {
      type: String,
      required: true,
    },
    powers: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Character = mongoose.model('Character', characterSchema)

export default Character
