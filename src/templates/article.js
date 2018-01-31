import React from 'react';
import marked from 'marked';
import moment from 'moment';
import { ArticleHeader, ArticleTitle, ArticleDate } from '../components/Article';
import Block from '../components/Block';

export default (data) => {
  const {
    pathContext: {
      content,
      title,
      createdAt
    }
  } = data;
  return <div>
  <ArticleHeader>
    <ArticleDate>
        <Block>{moment(createdAt).format('D')}</Block>
        <Block>{moment(createdAt).format('MMM')}</Block>
      </ArticleDate>
      <ArticleTitle>{title}</ArticleTitle>
    </ArticleHeader>
    <p dangerouslySetInnerHTML={{ __html: marked(content)}} />
  </div>;
}