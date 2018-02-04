import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import marked from 'marked';
import moment from "moment";
import Block from "../Block";

export default class ProjectList extends React.Component {

  static propTypes = {
    projects: PropTypes.array.isRequired
  };

  renderList() {
    const { projects } = this.props;
    const Projects = [];
    const date = (original) => moment(original).format('D MMM YYYY');
    projects.forEach((project, key) => {
      Projects.push(
        <div key={key}>
          <h2><Link to={`project/${project.node.slug}`}>{project.node.title}</Link></h2>
          <Block>{project.node.employed}</Block>
          <Block>{date(project.node.started)} - {date(project.node.finished)}</Block>
          <p dangerouslySetInnerHTML={{ __html: marked(project.node.content.content) }} />
        </div>
      )
    });
    return Projects;
  }

  render() {
    return <div>{this.renderList()}</div>;
  }

}