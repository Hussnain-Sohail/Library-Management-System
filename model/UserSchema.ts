import mongoose from "mongoose"

interface IUser {
    userName: string,
    userAge: number,
    userPassword: string,
    userTier: string,

    _id: string,
};

const UserSchema = new mongoose.Schema({
    userName: String,
    userAge: Number,
    userPassword: String,
    userTier: String,
});

const User = mongoose.model("User", UserSchema);

export type { IUser };
export default User;