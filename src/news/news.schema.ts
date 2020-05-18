import * as mongoose from 'mongoose';

export const NewsSchema = new mongoose.Schema({
  source: Object,
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: String,
  content: String,
});
