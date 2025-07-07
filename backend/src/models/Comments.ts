import mongoose from 'mongoose';

export interface Comment {
  userId: number;
  motorId: number;
  text: string;
  replyTo?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const CommentSchema = new mongoose.Schema<Comment>({
  userId: { type: Number, required: true },
  motorId: { type: Number, required: true },
  text: { type: String, required: true },
  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
  createdAt: { type: Date, default: Date.now }
});

// Facilita busca por texto no campo `text`
CommentSchema.index({ text: 'text' });

export default mongoose.model<Comment>('Comment', CommentSchema);
