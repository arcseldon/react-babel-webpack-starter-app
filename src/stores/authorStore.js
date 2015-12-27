'use strict';

import _ from 'lodash';
import EventEmitter from 'events';
import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

const CHANGE_EVENT = 'change',
  authors = [];

class AuthorStore extends EventEmitter {

  constructor() {
    super();
  }

  addChangeListener = (callback) => {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener = (callback) => {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange = () => {
    this.emit(CHANGE_EVENT);
  }

  getAllAuthors = () => {
    return authors;
  }

  getAuthorById = (id) => {
    return _.find(authors, {id: id});
  }

}

/*eslint-disable */
const authorStoreInstance = new AuthorStore();
/*eslint-enable */

authorStoreInstance.dispatchToken = Dispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.INITIALIZE:
      Array.prototype.unshift.apply(authors, action.initialData.authors);
      authorStoreInstance.emitChange();
      break;
    case ActionTypes.CREATE_AUTHOR:
      authors.push(action.author);
      authorStoreInstance.emitChange();
      break;
    case ActionTypes.UPDATE_AUTHOR:
      const existingAuthorIndex = _.findIndex(authors, {id: action.author.id});
      authors.splice(existingAuthorIndex, 1, action.author);
      authorStoreInstance.emitChange();
      break;
    case ActionTypes.DELETE_AUTHOR:
      _.remove(authors, function (author) {
        return action.id === author.id;
      });
      authorStoreInstance.emitChange();
      break;
    default:
    // no op
  }
});

export default authorStoreInstance;
