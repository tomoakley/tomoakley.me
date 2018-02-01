import React from 'react';
import moment from 'moment';
import marked from 'marked';
import Block from '../components/Block';

export default ({ pathContext }) => {
  const {
    title,
    content,
    employed,
    started,
    finished
  } = pathContext;
  return <div>
    <h2>{title}</h2>
    <Block>{employed}</Block>
    <Block>{moment(started).format('D MMM YYYY')} - {moment(finished).format('D MMM YYYY')}</Block>
    <p dangerouslySetInnerHTML={{ __html: marked(content)}} />
  </div>;
}