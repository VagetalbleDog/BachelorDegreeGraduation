import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';

@Controller('article')
@ApiTags('文章模块')

export class ArticleController {
    constructor(private readonly articleService:ArticleService){}
    @Get()
    @HttpCode(200)
    @ApiQuery({ name: 'id', required: false, description: '根据id查询用户' })
    findAll(){
        return this.articleService.find();
    }
}
