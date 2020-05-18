import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseProviders } from './database.provider';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    NewsModule,
    MongooseModule.forRoot('mongodb://localhost/newsApi'),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
