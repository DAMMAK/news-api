import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from './news.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Headlines', schema: NewsSchema },
      { name: 'Article', schema: NewsSchema },
    ]),
  ],

  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
