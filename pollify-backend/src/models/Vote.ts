import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IVote extends Document {
  user: Types.ObjectId;
  poll: Types.ObjectId;
  selectedOption: string;
  votedAt: Date;
}

const voteSchema = new Schema<IVote>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poll',
      required: true,
    },

    selectedOption: {
      type: String,
      required: true,
    },

    votedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Vote = mongoose.model<IVote>('Vote', voteSchema);
export default Vote;
