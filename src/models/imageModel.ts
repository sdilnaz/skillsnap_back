
import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
    imageUrl: string;
}

const ImageSchema: Schema = new Schema({
    imageUrl: { type: String, required: true }
});

const Image = mongoose.model<IImage>('Image', ImageSchema);

export default Image;
