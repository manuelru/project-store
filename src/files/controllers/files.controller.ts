import { Controller, Post, Get, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FilesService } from '../services/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from 'src/helpers/fileNamer.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter:fileFilter,

    storage: diskStorage({
      destination: './static/products/',
      filename:fileNamer
    })
  
  }))


  UploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file){
      throw new BadRequestException('Asegurese que el archivo es una imagen')
    }

    return{
      fileName: file.filename
    }


  }
}