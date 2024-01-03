import { model, Schema } from 'mongoose';

const Answer = new Schema({
  key: { type: String, required: true},
  text: { type: String, required: true},
  quiz_id: {required: true, type: String},
  isCorrect: {type: Boolean, required: true}
});

export default model('Answer', Answer);
