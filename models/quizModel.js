import {model, Schema} from "mongoose"

const Quiz = new Schema({
  title: {type: String, required: true},

})

export default model("Quiz", Quiz)