const { nanoid } = require('nanoid');
const books = require('./books');

// =========== Menambahkan Buku =========== //
const addDirBooksHandler = (request, h) => {
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

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

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

  const newDirBooks = {
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
  };

  books.push(newDirBooks);

  const isSuccess = books.filter((DirBook) => DirBook.id === id).length > 0;

  if (isSuccess) {
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
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.header('Access-Control-Allow-Origin', '*');
  response.code(500);
  return response;
};

// =========== Menampilkan Buku =========== //
const getAllDirBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  if (!name && !reading && !finished) {
    const response = h.response({
      status: 'success',
      data: {
        books: books.map((getAllDirBooks) => ({
          id: getAllDirBooks.id,
          name: getAllDirBooks.name,
          publisher: getAllDirBooks.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  if (name) {
    const filterBooksName = books.filter((filterBook) => {
      const nameRegex = new RegExp(name, 'gi');
      return nameRegex.test(filterBook.name);
    });

    const response = h.response({
      status: 'success',
      data: {
        books: filterBooksName.map((getAllDirBooks) => ({
          id: getAllDirBooks.id,
          name: getAllDirBooks.name,
          publisher: getAllDirBooks.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  if (reading) {
    const filterBooksReading = books.filter((filterBook) => Number(filterBook.reading) === Number(reading));
    const response = h.response({
      status: 'success',
      data: {
        books: filterBooksReading.map((getAllDirBooks) => ({
          id: getAllDirBooks.id,
          name: getAllDirBooks.name,
          publisher: getAllDirBooks.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  const filterBooksFinished = books.filter((filterBook) => Number(filterBook.finished) === Number(finished));
  const response = h.response({
    status: 'success',
    data: {
      books: filterBooksFinished.map((getAllDirBooks) => ({
        id: getAllDirBooks.id,
        name: getAllDirBooks.name,
        publisher: getAllDirBooks.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

// =========== Menampilkan Detail Buku =========== //
const getDirBooksByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return h.response({
      status: 'success',
      data: {
        book,
      },
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};

// =========== Mengubah Buku =========== //
const editDirBooksByIdHandler = (request, h) => {
  const { id } = request.params;

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

  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const index = books.findIndex((editDirBooksById) => editDirBooksById.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      insertedAt,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// =========== Menghapus Buku =========== //
const deleteDirBooksByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((deleteDirBooksById) => deleteDirBooksById.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addDirBooksHandler,
  getAllDirBooksHandler,
  getDirBooksByIdHandler,
  editDirBooksByIdHandler,
  deleteDirBooksByIdHandler,
};