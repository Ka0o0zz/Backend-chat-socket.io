import { IUser, User } from "../../entities/user.entities";
import { generateJWT } from "../../helpers/jwtConfig";
import { UserModel } from "../../models/user.mongo.model";
import {
  authErrorCredentialsNotMatch,
  authErrorUserAlreadyRegistered,
  authErrorUserIsNotRegistered,
} from "./errors/auth.errors";

type ICredentials = {
  email: string;
  password: string;
};

export class MongoAuthRepository {
  public async createUser(user: IUser) {
    const userExist = await UserModel.findOne({ email: user.email });
    if (userExist)
      throw new authErrorUserAlreadyRegistered(
        "This email is already registered"
      );

    const createdUser = new User(user);
    await UserModel.create(createdUser);
  }

  public async login({ email, password }: ICredentials) {
    const user = await UserModel.findOne({ email });

    if (!user)
      throw new authErrorUserIsNotRegistered(
        "This email address is not registered."
      );

    if (!(await user.comparePassword(password)))
      throw new authErrorCredentialsNotMatch("Credentials do not match");

    const token = await generateJWT(user._id);
    return {
      token,
      _id: user._id,
    };
  }
}
