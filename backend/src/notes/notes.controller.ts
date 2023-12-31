import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ArchiveNoteDto } from './dto/archive-note.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }
  @Get('user/:id')
  findAllByUserID(@Param('id') id: string) {
    return this.notesService.findAllByUserID(+id);
  }
  @Get('archived/user/:id')
  findAllArchivedByUser(@Param('id') id: string) {
    return this.notesService.findAllArchivedByUser(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }
  @Patch('archive/:id')
  archive(@Param('id') id: string, @Body() archiveDto: ArchiveNoteDto) {
    return this.notesService.archive(+id, archiveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
