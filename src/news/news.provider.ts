import { Connection } from 'mongoose';
import { NewsSchema } from './news.schema';

export const NewsProviders = [
  {
    provide: 'NEWS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('news', NewsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
