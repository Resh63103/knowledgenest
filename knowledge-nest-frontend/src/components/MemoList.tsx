import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Memo } from '../types/Memo';

const MemoList = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [newContent, setNewContent] = useState('');
  const [bookId, setBookId] = useState(1); // とりあえず Book ID = 1 に固定

  useEffect(() => {
    fetchMemos();
  }, []);

  const fetchMemos = () => {
    axios.get<Memo[]>('http://localhost:8081/memos')
      .then((res) => setMemos(res.data))
      .catch((err) => console.error('メモ取得失敗:', err));
  };

  const addMemo = () => {
    axios.post('http://localhost:8081/memos', {
      content: newContent,
      bookId: bookId
    })
    .then(() => {
      setNewContent('');
      fetchMemos();
    })
    .catch((err) => console.error('メモ追加失敗:', err));
  };

  return (
    <div>
      <ul>
        {memos.map((memo) => (
          <li key={memo.memoId}>
            {memo.memoId}: {memo.content}
          </li>
        ))}
      </ul>

      <h3>新規メモ追加</h3>
      <input
        type="text"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="メモ内容"
      />
      <button onClick={addMemo}>追加</button>
    </div>
  );
};

export default MemoList;
