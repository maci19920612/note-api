import { UserDTO } from "./user.dto";

export type CommentDTO = {
    id: number;
    content: string;
    user: UserDTO;
    createdAt: Date;
};