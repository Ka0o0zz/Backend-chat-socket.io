import { Document, Schema, model, Model } from "mongoose";
import {
  comparePassword,
  extractPhoneNumber,
  fixCallsign,
  hashPassword,
} from "../helpers";

interface IPhone {
  callsign: string;
  number: string;
}

interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  phone: IPhone;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      callsign: {
        type: String,
        required: true,
        set: (callsign: string) => fixCallsign(callsign),
      },
      number: {
        type: String,
        required: true,
        set: (number: string) => extractPhoneNumber(number),
      },
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await comparePassword(password, this.password);
};

export const UserModel: Model<IUser> = model<IUser>("User", userSchema);
