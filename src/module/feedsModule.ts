import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
    userName: {
        type:String,
        require: [true, 'please provide username']
    },
    date: {
        type:String,
        require: [true, 'please provide email'],
    },
    post: {
        type:String,
    },
},
{
    timestamps: true,
})

const Feed = mongoose.models.feeds || mongoose.model("feeds", feedSchema)

export default Feed
