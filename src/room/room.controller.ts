import { Delete, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
/* eslint-disable prettier/prettier */
import { Controller, Get, Param, ParseIntPipe, Query, Post, Body } from '@nestjs/common'
import { RoomDTO } from './dto/room.dto'
import { RoomService } from './room.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { FileUploadDto } from 'src/user/dto/user.dto'

@ApiTags('Room')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}
  @Get('all')
  getRooms(): Promise<RoomDTO[]> {
    return this.roomService.getAllRooms()
  }

  @Get('pagination')
  getPagination(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('search') search: string
  ) {
    // logic to get users with pagination
    return this.roomService.getPhanTrangTimKiem(limit, page, search)
  }

  @Get('location')
  getRoomsbylocation(@Query('id', ParseIntPipe) id: number) {
    // logic to get users with pagination
    return this.roomService.getRoomsByLocation(id)
  }

  @Get(':id')
  getRoomById(@Param('id', ParseIntPipe) id: number) {
    // logic to get users with pagination
    return this.roomService.getroomById(id)
  }

  @Post('')
  postRoom(@Body() room: RoomDTO) {
    delete room?.id
    return this.roomService.postRoom(room)
  }

  @Put(':id')
  putRoom(@Body() room: RoomDTO, @Param('id', ParseIntPipe) id: number) {
    delete room?.id
    return this.roomService.updateRoom(id, room)
  }

  @Delete(':id')
  deleteRoom(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.deleteRoom(id)
  }

  @Post('upload/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'upload image',
    type: FileUploadDto
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: `${process.cwd()}/public/img`,
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
          const ext = file.originalname.split('.').pop() // get the file extension
          cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
        }
      })
    })
  )
  async uploadImage(@UploadedFile() file, @Param('id', ParseIntPipe) roomid: number): Promise<any> {
    // Sau khi tải lên ảnh, bạn có thể lưu thông tin về ảnh vào cơ sở dữ liệu tại đây.

    return await this.roomService.createImage(file, roomid)
  }
}
