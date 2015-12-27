'use strict';

import toastr from 'toastr';
import React from 'react';
import {Link} from 'react-router';
import AuthorActions from '../../actions/authorActions';

class AuthorList extends React.Component {

  static propTypes = {
    authors: React.PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
  }

  deleteAuthor = (id, event) => {
    event.preventDefault();
    AuthorActions.deleteAuthor(id);
    toastr.success('Author Deleted');
  }

  render() {
    const createAuthorRow = function (author) {
      return (
        <tr key={author.id}>
          <td><a href="#" onClick={this.deleteAuthor.bind(this, author.id)}>Delete</a></td>
          <td><Link to="manageAuthor" params={{id: author.id}}>{author.id}</Link></td>
          <td>{author.firstName} {author.lastName}</td>
        </tr>
      );
    };

    return (
      <div>
        <table className="table">
          <thead>
          <th></th>
          <th>ID</th>
          <th>Name</th>
          </thead>
          <tbody>
          {this.props.authors.map(createAuthorRow, this)}
          </tbody>
        </table>
      </div>
    );
  }

}

export default AuthorList;
