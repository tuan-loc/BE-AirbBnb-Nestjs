import { UserController } from './user/user.controller'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config/dist'
import { UserModule } from './user/user.module'
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { LocationModule } from './location/location.module'
import { CommentsModule } from './comments/comments.module'
import { BookroomModule } from './bookroom/bookroom.module'
import { RoomModule } from './room/room.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    CommentsModule,
    BookroomModule,
    LocationModule,
    RoomModule
  ]
})
export class AppModule {}
