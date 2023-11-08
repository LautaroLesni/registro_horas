import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService){}
  create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({
      data: createCategoryDto
    })
  }

  findAll() {
    return this.prismaService.category.findMany()
  }
  findAllByUserID(id: number) {
    return this.prismaService.category.findMany({
      where:{
        author:{
          id
        }
      }
    })
  }

  findOne(id: number) {
    return this.prismaService.category.findUnique({
      where:{
        id
      }
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prismaService.category.update({
      where:{
        id
      },
      data: updateCategoryDto
    })
  }

 async remove(id: number) {
 const isRelated = await this.prismaService.note.findMany({
    where:{
      categories:{
        some:{
          categoryId: id
        }
      }
    }
  })
  if (isRelated.length > 0){
    throw new HttpException('CONFLICT', HttpStatus.CONFLICT)
  }
    return this.prismaService.category.delete({
      where:{
        id
      }
    })
  }
}
