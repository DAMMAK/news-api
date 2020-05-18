import { Injectable, Logger } from '@nestjs/common';
import * as newsapi from 'newsapi';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './news.model';
import { News } from './news.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment';

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);
  private sources: Promise<string>;
  constructor(
    @InjectModel('Headlines') private readonly newsModel: Model<News>,
    @InjectModel('Article') private readonly articleModel: Model<News>,
  ) {
    this.sources = this.getSources();
  }
  NewsAPI = new newsapi('3de068c071cd47f6a2cfe047e624c426');

  // get news article
  @Cron(CronExpression.EVERY_10_MINUTES)
  async SaveHeadlines(
    category: string,
    language: string,
    country: string,
  ): Promise<Article[]> {
    this.logger.log('called headline cron Job');
    const body = { category, language, country };
    const response = await this.NewsAPI.v2.topHeadlines(body);
    const articles: Article[] = response.articles;
    for (let index = 0; index < articles.length; index++) {
      const element = articles[index];
      console.log(element);
      const newArticles = new this.newsModel(element);
      const { author, title, publishedAt } = element;
      const headlineExist = await newArticles.collection.findOne({
        author,
        title,
        publishedAt,
      });
      if (headlineExist === null) newArticles.save();
      newArticles.save();
    }

    return articles;
  }
  //Get full details of an article.
  @Cron(CronExpression.EVERY_5_MINUTES)
  async saveEverything(): Promise<Article[]> {
    const to = moment(Date.now()).format('YYYY-MM-DD');
    const from = moment(Date.now())
      .subtract(1, 'days')
      .format('YYYY-MM-DD');
    console.log('Date Time =>', from);
    const body = {
      sources: await this.sources,
      sortBy: 'relevancy',
      from,
      to,
    };
    this.logger.log('Called the Everything news job');
    const response = await this.NewsAPI.v2.everything(body);
    const articles: Article[] = response.articles;
    for (let index = 0; index < articles.length; index++) {
      const element = articles[index];
      const { author, title, publishedAt } = element;
      const newArticles = new this.articleModel(element);
      const articleExist = await newArticles.collection.findOne({
        author,
        title,
        publishedAt,
      });
      if (articleExist === null) newArticles.save();
    }
    return articles;
  }

  async getSources(): Promise<string> {
    let sources = await this.NewsAPI.v2.sources();
    console.log(sources['id']);
    // const data = JSON.parse(sources);
    sources = sources['sources'].map(e => e.id);
    return sources.join();
  }
  async getHeadlines(){
      
  }
}
