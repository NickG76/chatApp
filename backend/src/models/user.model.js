import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            default: ""
            // The default option lets you set a default value for the path if the document doesn't have a value for it.
        },
        age: {
            type: Number,
            required: true
            // The required option is set to true, which means that the path must be included in the document.
        },
        loginAttempts: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
        // The timestamps option tells Mongoose to assign createdAt and updatedAt fields to your schema. The type assigned is Date.
    }
)

const User = mongoose.model("User", userSchema)

export default User
// The User model is created using the mongoose.model() method. The model is exported so that it can be used in other parts of the application.
