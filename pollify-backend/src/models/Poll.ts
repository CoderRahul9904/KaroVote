import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPollOption {
  option: string;
  votes: number;
}

export interface IPoll extends Document {
  question: string;
  options: IPollOption[];
  createdBy: Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const pollSchema = new Schema<IPoll>(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: [
      {
        option: {
          type: String,
          required: true,
          trim: true,
        },
        votes: {
          type: Number,
          default: 0,
        },
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Poll = mongoose.model<IPoll>('Poll', pollSchema);
export default Poll;
