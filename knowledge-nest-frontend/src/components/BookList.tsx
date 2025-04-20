import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Book } from '../types/Book';

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  // 書籍一覧取得（初回 / 更新後に使用）
  const fetchBooks = () => {
    axios.get<Book[]>('http://localhost:8081/books')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error('取得失敗:', error));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // 編集開始
  const handleEditClick = (book: Book) => {
    setEditingBook(book);
    setNewTitle(book.title);
    setNewAuthor(book.author);
  };

  // 更新（PUT）
  const handleUpdate = () => {
    if (!editingBook) return;

    axios.put(`http://localhost:8081/books/${editingBook.bookId}`, {
      ...editingBook,
      title: newTitle,
      author: newAuthor,
    })
    .then(() => {
      alert('更新完了！');
      setEditingBook(null);
      fetchBooks();
    })
    .catch((error) => {
      console.error('更新失敗:', error);
    });
  };

  // 削除（DELETE）
  const handleDelete = async (bookId: number) => {
    try {
      await axios.delete(`http://localhost:8081/books/${bookId}`);
      setBooks(books.filter((book) => book.bookId !== bookId));
    } catch (error) {
      console.error('削除失敗:', error);
    }
  };

  return (
    <div>
      <h3>書籍一覧</h3>
      <ul>
        {books.map((book) => (
          <li key={book.bookId}>
            {book.bookId}: {book.title} / {book.author}
            <button onClick={() => handleEditClick(book)}>編集</button>
            <button onClick={() => handleDelete(book.bookId)}>削除</button>
          </li>
        ))}
      </ul>

      {editingBook && (
        <div>
          <h3>書籍編集</h3>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="タイトル"
          />
          <input
            type="text"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            placeholder="著者"
          />
          <button onClick={handleUpdate}>更新</button>
          <button onClick={() => setEditingBook(null)}>キャンセル</button>
        </div>
      )}
    </div>
  );
};

export default BookList;
