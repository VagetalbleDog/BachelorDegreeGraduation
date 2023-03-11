import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置swagger文档
  const swaggerOptions = new DocumentBuilder()
  .setTitle('开发者知识社区服务端API文档')
  .setDescription('Powerby 东北大学 信息管理与信息系统')
  .build();
  const document = SwaggerModule.createDocument(app,swaggerOptions);
  SwaggerModule.setup('apiDoc',app,document)
  await app.listen(4000);
}
bootstrap();
