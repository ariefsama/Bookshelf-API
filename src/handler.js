import { nanoid } from 'nanoid';
// eslint-disable-next-line import/extensions
import { books } from './books.js';

// eslint-disable-next-line consistent-return
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = (pageCount === readPage);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  books.push({
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  });

  const success = books.filter((book) => book.id === id).length > 0;
  if (success !== 'undefined') {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let book = books;

  if (name !== undefined) {
    book = book.filter((bookk) => bookk.name.toLowerCase().includes(name.toLowerCase()));
  }
  if (reading !== undefined) {
    book = book.filter((bookk) => bookk.reading === !!Number(reading));
  }
  if (finished !== undefined) {
    book = book.filter((bookk) => bookk.finished === !!Number(finished));
  }

  const response = h.response({
    status: 'success',
    data: {
      books: book.map((bookk) => ({
        id: bookk.id,
        name: bookk.name,
        publisher: bookk.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((bookk) => bookk.id === bookId)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const putBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const book = books.findIndex((bookk) => bookk.id === bookId);

  if (book === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  const updatedAt = new Date().toISOString();
  books[book] = {
    ...books[book],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  response.code(200);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.findIndex((bookk) => bookk.id === bookId);

  if (book === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  books.splice(book, 1);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
  response.code(200);
  return response;
};

export {
  // eslint-disable-next-line import/prefer-default-export
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  putBookByIdHandler,
  deleteBookByIdHandler,
};
