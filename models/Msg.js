import mongoose from 'mongoose';

const MsgSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      unique: false,
    },
    idRoom: {
        type: String,
        required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Msg', MsgSchema);