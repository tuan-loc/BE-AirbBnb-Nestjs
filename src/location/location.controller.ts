import { FileInterceptor } from '@nestjs/platform-express'
import { LocationService } from './location.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { FileUploadDto, UpdateLocationDTO } from './dto/location.dto'
import { diskStorage } from 'multer'
import { ApiOperation, ApiBody, ApiResponse, ApiConsumes, ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('Location')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  getLocation() {
    return this.locationService.getLocation()
  }

  @Post()
  createLocation(@Body() updateLocationDTO: UpdateLocationDTO) {
    return this.locationService.createLocation(updateLocationDTO)
  }

  @Get('phan-trang-tim-kiem')
  searchLocationByPage(
    @Query('pageIndex', ParseIntPipe) pageIndex: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('keyword') keyword: string
  ) {
    console.log(keyword)

    return this.locationService.searchUserByPage(pageIndex, pageSize, keyword)
  }

  @Get(':id')
  getLocationById(@Param('id', ParseIntPipe) locationId: number) {
    return this.locationService.getLocationById(locationId)
  }

  @Put(':id')
  putLocationById(@Param('id', ParseIntPipe) locationId: number, @Body() updateLocationDTO: UpdateLocationDTO) {
    return this.locationService.putLocationById(locationId, updateLocationDTO)
  }

  @Delete(':id')
  deleteLocationById(@Param('id', ParseIntPipe) locationId: number) {
    return this.locationService.deleteLocationById(locationId)
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
    return await this.locationService.createImage(file, userId)
  }
}
