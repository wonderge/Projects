import { getModelForClass, index, prop } from "@typegoose/typegoose";

export class User {
  @prop({ unique: true, required: true, type: String })
  public username?: string

  @prop({ unique: true, required: true, type: String })
  public email?: string

  @prop({ required: true, type: String })
  public password?: string

  @prop({ type: String })
  public isVerified?: boolean
}

export const UserModel = getModelForClass(User);