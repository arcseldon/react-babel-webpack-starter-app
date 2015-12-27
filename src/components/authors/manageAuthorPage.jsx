'use strict';

import _ from 'lodash';
import toastr from 'toastr';
import React from 'react';
/*eslint-disable */
import Router from 'react-router';
/*eslint-enable */
import AuthorActions from '../../actions/authorActions';
import AuthorForm from './authorForm';
import AuthorStore from '../../stores/authorStore';

class ManageAuthorPage extends React.Component {

  static propTypes = {
    params: React.PropTypes.object
  };

  static contextTypes = {
    router: React.PropTypes.func
  };

  /*eslint-disable */
  static willTransitionFrom(transition, component) {
    if (component.state.dirty && !confirm('Leave without saving?')) {
      transition.abort();
    }
  }

  /*eslint-enable */

  constructor(props) {
    super(props);
    this.state = {
      author: {id: '', firstName: '', lastName: ''},
      errors: {},
      dirty: false
    };
    const authorId = this.props.params.id;
    if (!_.isEmpty(authorId)) {
      const auth = AuthorStore.getAuthorById(authorId);
      this.state.author = auth;
    }
  }

  setAuthorState = (event) => {
    this.setState({dirty: true});
    const field = event.target.name,
      value = event.target.value;
    this.state.author[field] = value;
    return this.setState({author: this.state.author});
  }

  authorFormIsValid = () => {
    this.state.errors = {};
    if (this.state.author.firstName.length < 3) {
      this.state.errors.firstName = 'First name must be at least 3 characters';
    }
    if (this.state.author.lastName.length < 3) {
      this.state.errors.lasttName = 'Last name must be at least 3 characters';
    }
    this.setState({errors: this.state.errors});
    return _.isEmpty(this.state.errors);
  }

  saveAuthor = (event) => {
    event.preventDefault();
    if (!this.authorFormIsValid()) {
      return;
    }
    if (_.isEmpty(this.state.author.id)) {
      AuthorActions.createAuthor(this.state.author);
    } else {
      AuthorActions.updateAuthor(this.state.author);
    }
    this.setState({dirty: false});
    toastr.success('Author Saved.');
    this.context.router.transitionTo('authors');
  }

  render() {
    return (
      <AuthorForm
        author={this.state.author}
        onChange={this.setAuthorState}
        onSave={this.saveAuthor}
        errors={this.state.errors}/>
    );
  }

}

export default ManageAuthorPage;
