import React, { useState, useEffect } from 'react';

interface UserProps {
  username: string;
  onSubmit: () => void;
}

const User: React.FC<UserProps> = ({ username, onSubmit }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(username);
  }, [username]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login Data2:', username);
    onSubmit();
  };

  console.log('Username prop:', username); // Add this line to log the username prop

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-center">Username: {name}</h2>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm">ออกจากระบบ</button>
      </form>
    </div>
  );
}

export default User;
