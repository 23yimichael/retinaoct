import argon2 from "argon2";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { UserResponse } from "../utils/types";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return User.find();
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("first_name") first_name: string,
    @Arg("last_name") last_name: string
  ): Promise<UserResponse> {
    if (!email.includes("@")) {
      return {
        error: {
          field: "Email",
          message: "Invalid email.",
        },
      };
    }

    if (password.length <= 2) {
      return {
        error: {
          field: "Password",
          message: "Password length must be greater than 2 characters.",
        },
      };
    }

    let user;
    try {
      user = await User.create({
        email,
        password: await argon2.hash(password),
        first_name,
        last_name,
      }).save();
    } catch (e) {
      if (e.detail.includes("already exists")) {
        return {
          error: {
            field: "Email",
            message: "Email already exists.",
          },
        };
      }
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return {
        error: {
          field: "Email",
          message: "A user with that email does not exist.",
        },
      };
    }

    const verified = await argon2.verify(user.password, password);
    if (!verified) {
      return {
        error: {
          field: "Password",
          message: "Incorrect password.",
        },
      };
    }

    return { user };
  }
}
