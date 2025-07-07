import mongoose, { ObjectId } from 'mongoose';

export interface Comment {
  userId: string;
  motorId: string;
  text: string;
  replyTo?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const CommentSchema = new mongoose.Schema<Comment>({
  userId: { type: String, required: true },
  motorId: { type: String, required: true },
  text: { type: String, required: true },
  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
  createdAt: { type: Date, default: Date.now }
});

CommentSchema.index({ text: 'text' });

export default mongoose.model<Comment>('Comment', CommentSchema);
