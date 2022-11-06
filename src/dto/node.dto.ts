import { UserDTO } from "./user.dto";

export type NoteDTO = {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    user: UserDTO;
};