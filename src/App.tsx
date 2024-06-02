import React, { useState }  from 'react';
import './App.css';
import LoginForm from './Component/LoginForm';
import RejectForm from './Component/RejectForm';
import User from './Component/User';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLoginSubmit = (data: { username: string; password: string }) => {
    console.log('Login Data:', JSON.stringify(data));
    setUserName(data.username);
    if(data.username == '1' && data.password == '1'){
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
  };

  const handleLogoutSubmit = () => {
    setIsLoggedIn(false);
  };

  const handleRejectSubmit = (data: any) => {
    console.log('Reject Form Data:', JSON.stringify(data));
  };

  return (
    <div className="App min-h-screen bg-gray-100 flex items-center justify-center">
      <header className="App-header bg-white p-6 rounded-xl shadow-md w-full max-w-4xl space-y-6">
        {!isLoggedIn ? (
          <LoginForm onSubmit={handleLoginSubmit} />
        ) : (
          <>
            <User username={userName} onSubmit={handleLogoutSubmit} />
            <RejectForm onSubmit={handleRejectSubmit} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
