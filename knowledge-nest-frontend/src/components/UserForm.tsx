import React, { useState } from 'react';
import axios from 'axios';

type Props = {
  onUserAdded: () => void;
};

const UserForm: React.FC<Props> = ({ onUserAdded }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/users', {
        userName,
        password,
      });
      setUserName('');
      setPassword('');
      onUserAdded(); // 親コンポーネントに「追加完了したよ」って通知する
    } catch (error) {
      console.error('ユーザー登録に失敗しました', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ユーザー名:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <label>パスワード:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">登録</button>
    </form>
  );
};

export default UserForm;
