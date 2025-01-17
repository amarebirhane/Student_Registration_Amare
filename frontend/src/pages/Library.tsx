import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publishedDate: string; // Ensure the backend returns this
}

const Library: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publishedDate, setPublishedDate] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('http://localhost:7000/api/library');
      setBooks(response.data);
    };

    fetchBooks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newBook = { title, author, genre, publishedDate };

    // Post the new book and expect it to return the full book object
    const response = await axios.post('http://localhost:7000/api/books', newBook);
    setBooks([...books, response.data]); // Use the response data
    setTitle('');
    setAuthor('');
    setGenre('');
    setPublishedDate('');
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar component */}
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Library</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Book Title"
            className="border p-2 rounded w-full mb-2 text-white"
            required
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            className="border p-2 rounded w-full mb-2 text-white"
            required
          />
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Genre"
            className="border p-2 rounded w-full mb-2 text-white"
            required
          />
          <input
            type="date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            className="border p-2 rounded w-full mb-2 text-white"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Book
          </button>
        </form>
        <div>
          {books.map((book) => (
            <div key={book._id} className="border p-4 mb-2 rounded">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>Published Date: {new Date(book.publishedDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;

// this is the only student can able to access and see their results
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Library = () => {
//   const [books, setBooks] = useState([]);

//   // Fetch Books
//   useEffect(() => {
//     axios
//       .get("http://localhost:7000/api/library")
//       .then((res) => setBooks(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Library Books</h1>
//       <ul className="space-y-4">
//         {books.map((book) => (
//           <li
//             key={book._id}
//             className="p-4 border rounded-md shadow-sm bg-white"
//           >
//             <h2 className="text-lg font-semibold">{book.title}</h2>
//             <p className="text-gray-700">Author: {book.author}</p>
//             <p className="text-gray-700">Category: {book.category}</p>
//             <p className="text-gray-700">ISBN: {book.isbn}</p>
//             <p className="text-gray-700">Year: {book.publishedYear}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Library;
