import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
  {
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    userTwo: {
      type: String,
      required: true,
    },
    
    idRoom: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Room', RoomSchema);