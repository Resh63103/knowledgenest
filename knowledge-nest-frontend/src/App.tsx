// src/App.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import MemoList from './components/MemoList';

type User = {
  userId: number;
  userName: string;
  password: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get<User[]>('http://localhost:8081/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('ユーザー一覧の取得に失敗しました', error);
      });
  }, []);

  return (
    <div>
      <h1>KnowledgeNest</h1>
      
      <h2>ユーザー一覧</h2>
      <ul>
        {users.map((user) => (
          <li key={user.userId}>
            {user.userId}: {user.userName} / {user.password}
          </li>
        ))}
      </ul>

      <h2>書籍一覧</h2>
      <BookForm />
      <BookList /> {/* 🔥 ここで呼び出し！ */}

      <h2>メモ一覧</h2>
      <MemoList />
    </div>
  );
}

export default App;
