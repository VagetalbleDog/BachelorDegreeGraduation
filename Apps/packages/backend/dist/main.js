"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const swaggerOptions = new swagger_1.DocumentBuilder()
        .setTitle('开发者知识社区服务端API文档')
        .setDescription('Powerby 东北大学 信息管理与信息系统')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerOptions);
    swagger_1.SwaggerModule.setup('apiDoc', app, document);
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map