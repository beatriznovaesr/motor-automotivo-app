import mongoose, { ObjectId } from 'mongoose';

export interface Favorite {
  userId: string;
  motorId: string;
}

const FavoriteSchema = new mongoose.Schema<Favorite>({
  userId: { type: String, required: true },
  motorId: { type: String, required: true },
});

export default mongoose.model<Favorite>('Favorite', FavoriteSchema);