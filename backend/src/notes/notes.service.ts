import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ArchiveNoteDto } from './dto/archive-note.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private readonly prismaService : PrismaService){}
  create(createNoteDto: CreateNoteDto) {
    return this.prismaService.note.create({
      data:{
        label: createNoteDto.label,
        description: createNoteDto.description,
        author:{
          connect: {
            id: createNoteDto.userId
          }
        },
        categories: createNoteDto.categoriesToConnect.length > 0 ? {
          createMany: {
            data: createNoteDto.categoriesToConnect.map((catId) => ({ categoryId: catId }))
          }
        } : undefined
      },
      include:{
        author:true,
        categories:{
          select:{
            category:true
          }
        },
      }
    })
  }

  findAll() {
    return this.prismaService.note.findMany({
      include:{
        categories:{
          select:{
            category:true
          }
        },
        author:true
      }
    });
  }
  findAllByUserID(id:number) {
    return this.prismaService.note.findMany({
      where:{
        author:{
          id
        },
        archived:false
      },
      include:{
        categories:{
          select:{
            category:true
          }
        },
        author:true
      }
    });
  }
  findAllArchivedByUser(id:number) {
    return this.prismaService.note.findMany({
      where:{
        author:{
          id
        },
        archived:true
      },
      include:{
        categories:{
          select:{
            category:true
          }
        },
        author:true
      }
    });
  }

  findOne(id: number) {
    return this.prismaService.note.findUnique({
      where:{
        id
      }
    });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const updatedNote = await this.prismaService.$transaction(async (prisma) => {
      await prisma.note.update({
        where:{
         id
        },
        data: {
          label: updateNoteDto.label,
          description: updateNoteDto.description,
        }
      })
      if (updateNoteDto.categoriesToConnect.length > 0){
        await prisma.categories_Notes.createMany({
          data: updateNoteDto.categoriesToConnect.map((catId) => ({categoryId: catId, noteId: id}))
        })
      }
       if (updateNoteDto.categoriesToDisconnect.length > 0){
        await Promise.all(updateNoteDto.categoriesToDisconnect.map(async(catId) => {
          await prisma.categories_Notes.deleteMany({
            where:{
              AND:
              [{
                categoryId: catId
              },
              {noteId: id}
            ]
            }
          })
        }))
      }

      return prisma.note.findUnique({
        where:{
          id
        },
        include:{
          author:true,
          categories:{
            select:{
              category:true
            }
          },
        }
      })
    })
    return updatedNote
  }

async remove(id: number) {
  await this.prismaService.categories_Notes.deleteMany({
    where:{
      note:{
        id
      }
    }
  })
    return this.prismaService.note.delete({
      where:{
        id
      }
    });
  }
  archive(id: number, archiveDto: ArchiveNoteDto) {
    return this.prismaService.note.update({
      where:{
        id
      },
      data:{
        archived: archiveDto.archive
      }
    });
  }
}
