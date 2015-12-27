'use strict';

import React from 'react';
import {Link} from 'react-router';
import AuthorList from './authorList';
import AuthorStore from '../../stores/authorStore';

class AuthorPage extends React.Component {

  constructor(props) {
    super(props);
    AuthorStore.addChangeListener(this.onChange);
    this.state = {
      authors: AuthorStore.getAllAuthors()
    };
  }

  onChange = () => {
    this.setState({authors: AuthorStore.getAllAuthors()});
  }

  componentWillUnmount() {
    AuthorStore.removeChangeListener(this.onChange);
  }

  render() {
    return (
      <div>
        <h1>Authors</h1>
        <Link to="addAuthor" className="btn btn-default">Add Author</Link>
        <AuthorList authors={this.state.authors}/>
      </div>
    );
  }

}

export default AuthorPage;
