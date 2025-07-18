import mongoose, { Document, Schema } from "mongoose";

export interface Notification extends Document {
  userId: string;
  message: string;
  createdAt: Date;
  read: boolean;
}

const NotificationSchema: Schema = new Schema<Notification>({
  userId: { type: String, required: true }, 
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }, 
});

export default mongoose.model<Notification>("Notification", NotificationSchema);