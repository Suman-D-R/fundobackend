import { Schema,model } from "mongoose";

const noteSchema = new Schema(
    {
        title:{
            type:String
        },
        description:{
            type:String
        },
        isAchive:{
            type:Boolean
        },
        isDeleted:{
            type:Boolean
        },
        color:{
            type:String
        }
    }
);

export default model('Note',noteSchema);