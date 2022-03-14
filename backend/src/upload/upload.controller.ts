import { UploadService } from './upload.service';
import { Controller, Get, Post, Res, UploadedFile, UseInterceptors, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
    constructor(
        private readonly uploadService:UploadService
    ){}
    @Get(':image')
    display(@Res() res,@Param() image){
        return this.uploadService.show(res,image)
    }
    @Post()
    @UseInterceptors(FileInterceptor('file',{
        storage: diskStorage({
          destination: './public/uploads',
            filename: (req, file, cb) => {
              cb(null, `${Date.now()}${extname(file.originalname)}`);
      },
        }),
      }))
    uploadFile(@UploadedFile() file: Express.Multer.File){
        return this.uploadService.upload(file)
    }
}
