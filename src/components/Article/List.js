import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import marked from 'marked';
import moment from "moment";
import Block from "../Block";
import { ArticleDate, ArticleHeader, ArticleTitle } from "./";

export default class ArticleList extends React.Component {

  static propTypes = {
    articles: PropTypes.array.isRequired
  };

  renderList() {
    const { articles } = this.props;
    const Articles = [];
    articles.forEach((article, key) => {
      const {
        title,
        content: { content },
        createdAt,
        slug
      } = article.node;
      const date = {
        day: moment(createdAt).format('D'),
        month: moment(createdAt).format('MMM'),
        monthNumber: moment(createdAt).format('MM'),
        year: moment(createdAt).format('YYYY')
      };
      const fullSlug = `/article/${date.year}/${date.monthNumber}/${slug}`;
      Articles.push(
        <div key={key}>
          <ArticleHeader>
            <ArticleDate>
              <Block>{date.day}</Block>
              <Block>{date.month}</Block>
            </ArticleDate>
            <ArticleTitle><Link to={fullSlug}>{title}</Link></ArticleTitle>
          </ArticleHeader>
          <p dangerouslySetInnerHTML={{ __html: marked(content) }} />
        </div>
      );
    });
    return Articles;
  }

  render() {
    return <div>{this.renderList()}</div>;
  }

}