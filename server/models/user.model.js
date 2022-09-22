const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name is required"],
            minlength: [1, " First Name must be at least 1 characters"],
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            minlength: [1, " Last Name must be at least 1 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            validate: {
                validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email",
            },
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be 8  or longer"],
        },
    },
    { timestamps: true }
);

UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( (value) => (this._confirmPassword = value) );

UserSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords must match");
        // this.required("confirmPassword", "Confirm password is required"); 
    }
    next();
});

UserSchema.pre("save",  async function (next) {
    try{
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword
        next()
    }catch(e){
    console.log("error in hashing", e)
    }
    next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
