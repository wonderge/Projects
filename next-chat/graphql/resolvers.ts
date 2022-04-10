import bcrypt from 'bcrypt';
import { UserModel } from './../models/userModel';

export default {
  Query: {
    hello() {
      return 'Hello'
    }
  },
  Mutation: {
    async signup(_: any, { username, email, password }: { username: string, email: string, password: string }) {
      const hash = await bcrypt.hash(password, 10);
      await UserModel.create({
        username,
        email,
        password: hash
      });
      return "Created";
    }
  }
}