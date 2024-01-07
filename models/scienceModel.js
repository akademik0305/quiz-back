import {model, Schema} from "mongoose"

const Science = new Schema({
  name: {type: String, required: true},

})

export default model("Science", Science)