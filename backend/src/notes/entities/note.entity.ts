import { Note as NoteModel } from "@prisma/client";

export class NoteEntity implements NoteModel {
    id: number
    archived: boolean;
    description: string;
    label: string;
    userId: number;
}
