import mongoose,{Schema,model} from "mongoose";

const chatSchema = new Schema({
    by: {
        type: Schema.Types.ObjectId,
        required: true
    },

    message: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const  chatModel = model('chat', chatSchema);

export default chatModel;
