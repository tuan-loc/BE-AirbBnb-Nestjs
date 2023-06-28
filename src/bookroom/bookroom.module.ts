import { Module } from '@nestjs/common';
import { BookroomController } from './bookroom.controller';
import { BookroomService } from './bookroom.service';

@Module({
  controllers: [BookroomController],
  providers: [BookroomService],
})
export class BookroomModule {}
