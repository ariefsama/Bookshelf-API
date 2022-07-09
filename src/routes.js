/* eslint-disable import/extensions */
import {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  putBookByIdHandler,
  deleteBookByIdHandler,
} from './handler.js';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: putBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler,
  },
];

// eslint-disable-next-line import/prefer-default-export
export { routes };
