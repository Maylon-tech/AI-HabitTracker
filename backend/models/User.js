import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    avatar: {
        type: String,
        default: ""
    },
    morningMotivation: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
)

// check the password || create hashed password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// macing the password - Compare
userSchema.methods.matchPassword = function (plain) {
    return bcrypt.compare(plain, this.password)
}

// toJSON method avoid send Password to client by accident.
userSchema.methods.toJSON = function () {
    const obj = this.toJSON()
    delete obj.password
    return obj
}


export default mongoose.model("User", userSchema)