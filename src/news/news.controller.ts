import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newService: NewsService) {}
  @Get('headlines')
  getheadlines(): object {
    return this.newService.getHeadlines('business', 'en', 'us');
  }

  @Get('articles')
  getEverythings(): object {
    const lang = 'en';
    const sortBy = 'relevancy';
    const page = 2;
    const query = 'bitcoin';
    //return this.newService.getSources();
    return this.newService.getEverything(lang, sortBy, page, query);
  }
}
