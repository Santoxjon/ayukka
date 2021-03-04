import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [regBtnDisability, setRegBtnDisability] = useState(false);

  const API_URL = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;

  useEffect(() => {
    console.log("App connected to the API -> " + API_URL);
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(res => console.log(res));
  }, []);

  useEffect(() => {
    if (username.length >= 6 && username.length <= 12) {
      setRegBtnDisability(false);
      fetch(`${API_URL}/users/check/${username}`)
        .then(res => res.json())
        .then(res => {
          let estado = res.registered ? true : false;
          setRegBtnDisability(estado);
        });
    }
    else {
      setRegBtnDisability(true);
    }
  }, [username]);

  return (
    <div className="App">
      <form action={`${API_URL}/users`} method="POST">
        <input type="text" name="username" value={username} minLength="6" maxLength="12" onChange={(e) => setUsername(e.target.value.toLocaleLowerCase())} />
        <input type="password" name="pass" value={password} minLength="8" maxLength="24" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={regBtnDisability}>Registrar</button>
      </form>
    </div>
  );
}

export default App;
