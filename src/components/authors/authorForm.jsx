'use strict';

import React from 'react';
import TextInput from '../common/textInput';

class AuthorForm extends React.Component {

  static propTypes = {
    author: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form>
        <h1>Manage Author</h1>
        <TextInput
          name="firstName"
          label="First Name"
          value={this.props.author.firstName}
          onChange={this.props.onChange}
          error={this.props.errors.firstName}/>
        <TextInput
          name="lastName"
          label="Last Name"
          value={this.props.author.lastName}
          onChange={this.props.onChange}
          error={this.props.errors.lasttName}/>
        <input type="submit" value="Save"
               className="btn btn-default" onClick={this.props.onSave}/>
      </form>
    );
  }

}

export default AuthorForm;
