// src/components/BookForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:8081/books', { title, author })
      .then(() => {
        alert('登録成功！');
        setTitle('');
        setAuthor('');
      })
      .catch((err) => {
        console.error('登録失敗:', err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>📘 新しい書籍を登録</h2>
      <div>
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="著者"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <button type="submit">登録</button>
    </form>
  );
};

export default BookForm;
