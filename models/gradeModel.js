import {model, Schema} from "mongoose"

const Grade = new Schema({
  name: {type: String, required: true},
  science_id: {type: String, required: true}
})

export default model("Grade", Grade)