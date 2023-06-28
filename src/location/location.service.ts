import { UpdateLocationDTO } from './dto/location.dto'
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
 
import * as zlib from 'zlib'
import * as fs from 'fs/promises'
import * as path from 'path'

@Injectable()
export class LocationService {
  constructor(private prismaService: PrismaService) {}

  async getLocation() {
    return await this.prismaService.location.findMany({})
  }

  async createLocation({ location_name, province, nation, image }: UpdateLocationDTO) {
    const dataImport = await this.prismaService.location.create({
      data: {
        location_name,
        province,
        nation,
        image
      }
    })
    return dataImport
  }

  async searchUserByPage(pageIndex: number, pageSize: number, keyword: string) {
    const skip = (pageIndex - 1) * pageSize
    // Page index is maximum row return
    // Skip is to skip specific number of rows in table
    const location = await this.prismaService.location.findMany({
      where: {
        location_name: {
          contains: keyword
        }
      },
      take: pageSize,
      skip: skip
    })

    return { dataPage: location }
  }

  async getLocationById(locationId: number) {
    const location = await this.prismaService.location.findUnique({
      where: { id: locationId }
    })

    if (!location) {
      throw new ForbiddenException('Location not found')
    }
    return location
  }

  async putLocationById(locationId: number, { location_name, province, nation, image }: UpdateLocationDTO) {
    const updateLocation = await this.prismaService.location.update({
      where: { id: locationId },
      data: {
        location_name,
        province,
        nation,
        image
      }
    })

    if (!updateLocation) {
      throw new ForbiddenException('Location not found')
    }
    return updateLocation
  }

  async deleteLocationById(locationId: number) {
    try {
      const deleteLocation = await this.prismaService.location.delete({
        where: { id: +locationId }
      })

      return { message: 'Xóa thành công', deleteLocation }
    } catch (error) {
      if (error.code === 'P2025') {
        return new NotFoundException()
      }
    }
  }

  async createImage(file: any, userID: number): Promise<any> {
    try {
      const { filename, mimetype } = file
      const filePath = path.join(process.cwd(), 'public', 'img', filename)

      const data = await fs.readFile(filePath)
      // File base 64 encoded
      const base64 = `data:${mimetype};base64,${data.toString('base64')}`

      await fs.unlink(filePath)

      return await this.prismaService.location.update({
        where: { id: userID },
        data: { image: base64 }
      })
    } catch (err) {
      if (err.code === 'P2025') {
        throw new ForbiddenException('User not found')
      }
      console.error('Error reading or deleting file:', err)
      throw err
    }
  }
}
