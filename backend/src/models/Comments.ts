import mongoose from 'mongoose';

export interface Comment {
  userName: string;
  userId: mongoose.Types.ObjectId;
  motorId: mongoose.Types.ObjectId;
  text: string;
  replyTo?: mongoose.Types.ObjectId | null;
  createdAt: Date;
}

const CommentSchema = new mongoose.Schema<Comment>({
  userName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  motorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Motor', required: true },
  text: { type: String, required: true },
  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
  createdAt: { type: Date, default: Date.now }
});

CommentSchema.index({ text: 'text' });

export default mongoose.model<Comment>('Comment', CommentSchema);
