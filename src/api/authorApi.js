'use strict';

import _ from 'lodash';
import uuid from 'node-uuid';
import authors from './authorData';

const generateId = () => {
    return uuid.v1();
  },

  clone = (item) => {
    return JSON.parse(JSON.stringify(item));
  };

export default {

  getAllAuthors() {
    return clone(authors);
  },

  getAuthorById(id) {
    const author = _.find(authors, {id: id});
    return clone(author);
  },

  saveAuthor(author) {
    if (_.isEmpty(author.id)) {
      author.id = generateId();
      authors.push(author);
    } else {
      const existingAuthorIndex = _.indexOf(authors, _.find(authors, {id: author.id}));
      if (existingAuthorIndex !== -1) {
        authors.splice(existingAuthorIndex, 1, author);
      }
    }
    return clone(author);
  },

  deleteAuthor(id) {
    _.remove(authors, {id: id});
  }

};

