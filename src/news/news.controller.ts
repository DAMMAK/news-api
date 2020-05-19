import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';
import moment = require('moment');

@Controller('news')
export class NewsController {
  constructor(private newService: NewsService) {}
  @Get('headlines')
  getheadlines(): object {
    const to = moment(Date.now()).format('YYYY-MM-DD');
    const from = moment(Date.now())
      .subtract(1, 'days')
      .format('YYYY-MM-DD');
    return this.newService.getHeadlines(from, to);
  }

  @Get('articles')
  getEverythings(): object {
    const lang = 'en';
    const sortBy = 'relevancy';
    const page = 2;
    const query = 'bitcoin';
    //return this.newService.getSources();
    const to = moment(Date.now()).format('YYYY-MM-DD');
    const from = moment(Date.now())
      .subtract(1, 'days')
      .format('YYYY-MM-DD');
    return this.newService.getArticles(from, to);
  }
}
