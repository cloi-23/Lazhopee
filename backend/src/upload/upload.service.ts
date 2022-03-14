import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class UploadService {
    upload(file){
        return file.filename
    }
    show(response,image){
        return response.sendFile(join(process.cwd(), `/public/uploads/${image.id}`))
    }
}
