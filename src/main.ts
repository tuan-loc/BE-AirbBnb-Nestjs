import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  // add middleware here
  app.useGlobalPipes(new ValidationPipe())

  // ĐỊnh nghĩa swagger
  const config = new DocumentBuilder().setTitle('swagger').addBearerAuth().build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api', app, document)

  await app.listen(6969)
}
bootstrap()
