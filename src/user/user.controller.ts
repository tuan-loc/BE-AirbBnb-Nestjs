import { MyJwtGuard } from 'src/auth/guard'
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Delete,
  Query,
  ParseIntPipe,
  Param,
  Put,
  UseInterceptors,
  UploadedFile,
  Header,
  Headers
} from '@nestjs/common'
import { UserService } from './user.service'
import { GetUser } from 'src/auth/decorator/user.decorator'
import { FileUploadDto, UserDTO } from './dto/user.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { ApiOperation, ApiBody, ApiResponse, ApiConsumes, ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers()
  }

  @Get('phan-trang-tim-kiem')
  searchUserByPage(
    @Query('pageIndex', ParseIntPipe) pageIndex: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('keyword') keyword: string
  ) {
    console.log('hihihi')

    return this.userService.searchUserByPage(pageIndex, pageSize, keyword)
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.getUserById(userId)
  }

  @Post()
  createUser(@Body() createUserDTO: UserDTO) {
    return this.userService.createUser(createUserDTO)
  }

  @Delete()
  deleteUserById(@Query('id', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId)
  }

  @Put(':id')
  putUserById(@Param('id', ParseIntPipe) userId: number, @Body() updateUserDTOById: UserDTO) {
    return this.userService.putUserById(userId, updateUserDTOById)
  }

  @Get('search/:tenNguoiDung')
  searchUser(@Param('tenNguoiDung') name: string) {
    return this.userService.searchUser(name)
  }

  @Post('upload/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FileUploadDto
  })
  @UseInterceptors(
    FileInterceptor('file', {
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
  async uploadImage(@UploadedFile() file, @Param('id', ParseIntPipe) userId: number): Promise<any> {
    // Sau khi tải lên ảnh, bạn có thể lưu thông tin về ảnh vào cơ sở dữ liệu tại đây.
    return await this.userService.createImage(file, userId)
  }
}
