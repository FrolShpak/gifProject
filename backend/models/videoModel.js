import mongoose from 'mongoose';
import uuid from 'uuid';
const { Schema } = mongoose;

const videoModel = new Schema({
  uuid: { type: String },
  dateCreated: { type: Date, default: Date.now },
  content: { type: Buffer },
});

export default mongoose.model('Video', videoModel);
