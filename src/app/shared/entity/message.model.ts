import { IUser } from "./user.model";

export interface IMessage {
    sender: IUser,
    receiver: IUser,
    content: string,
}