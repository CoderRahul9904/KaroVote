import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // optional for OAuth
  provider: 'local' | 'google' | 'github';
  providerId?: string; // for OAuth
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: function () {
        return this.provider === 'local';
      },
      minlength: 6,
    },

    provider: {
      type: String,
      enum: ['local', 'google', 'github'],
      required: true,
      default: 'local',
    },

    providerId: {
      type: String,
      required: function () {
        return this.provider !== 'local';
      },
    },

    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
