import React, { useState } from 'react';

interface LoginFormProps {
  onSubmit: (data: { username: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-gray-100 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-center">LABORATORY REJECT SPECIMEN</h2>
      <p className="text-center">โปรแกรมปฏิเสธสิ่งส่งตรวจจากห้องปฏิบัติการ</p>
      <div>
        <label className="block font-medium text-gray-700">USERNAME</label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-medium text-gray-700">PASSWORD</label>
        <input
          type="password"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm">Submit</button>
    </form>
  );
};

export default LoginForm;
