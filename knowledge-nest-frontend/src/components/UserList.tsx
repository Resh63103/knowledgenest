import React, { useState } from 'react';
import axios from 'axios';

type User = {
  userId: number;
  userName: string;
  password: string;
};

type Props = {
  users: User[];
  onUserUpdated: () => void;
};

const UserList: React.FC<Props> = ({ users, onUserUpdated }) => {
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editUserName, setEditUserName] = useState('');
  const [editPassword, setEditPassword] = useState('');

  const handleEditClick = (user: User) => {
    setEditingUserId(user.userId);
    setEditUserName(user.userName);
    setEditPassword(user.password);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditUserName('');
    setEditPassword('');
  };

  const handleSave = async (id: number) => {
    try {
      await axios.put(`http://localhost:8081/users/${id}`, {
        userName: editUserName,
        password: editPassword,
      });
      setEditingUserId(null);
      onUserUpdated();
    } catch (err) {
      console.error('更新失敗:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8081/users/${id}`);
      onUserUpdated();
    } catch (err) {
      console.error('削除失敗:', err);
    }
  };

  return (
    <ul>
      {users.map((user) =>
        editingUserId === user.userId ? (
          <li key={user.userId}>
            <input
              value={editUserName}
              onChange={(e) => setEditUserName(e.target.value)}
            />
            <input
              type="password"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
            />
            <button onClick={() => handleSave(user.userId)}>保存</button>
            <button onClick={handleCancelEdit}>キャンセル</button>
          </li>
        ) : (
          <li key={user.userId}>
            {user.userId}: {user.userName} / {user.password}{' '}
            <button onClick={() => handleEditClick(user)}>編集</button>
            <button onClick={() => handleDelete(user.userId)}>削除</button>
          </li>
        )
      )}
    </ul>
  );
};

export default UserList;
