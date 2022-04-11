import { Resolver, Mutation, Arg, Query } from "type-graphql";
import bcrypt from 'bcrypt';
import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { User, UserModel } from './../models/userModel';

@Resolver()
export class AuthResolver {
  @Query(() => String)
  signout() {
    return 'You have have been signed out'
  }

  @Mutation(() => String)
  async signup(@Arg('username') username: string, @Arg('email') email: string, @Arg('password') password: string): Promise<string> {
    const user: User | null = await UserModel.findOne({ email }) || await UserModel.findOne({ username });
    if (user) throw new UserInputError("User already exists");

    const hash = await bcrypt.hash(password, 10);
    await UserModel.create({
      username,
      email,
      password: hash
    })
    return "User created";
  }

  @Mutation(() => String)
  async signin(@Arg('email') email: string, @Arg('password') password: string): Promise<string> {
    const user: User | null = await UserModel.findOne({ email });

    if (!user) throw new UserInputError('User not found')

    const valid = await bcrypt.compare(password, user.password!);
    if (!valid) throw new AuthenticationError('Wrong credentials');

    return "You are signed in"
  }
}