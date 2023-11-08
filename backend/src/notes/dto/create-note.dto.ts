import { OmitType } from "@nestjs/mapped-types";
import { NoteEntity } from "../entities/note.entity";
export class CreateNoteDto extends OmitType(NoteEntity, ['id']) {
    categoriesToConnect: number[]
}
