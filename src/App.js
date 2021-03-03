import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const API_URL = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;

  // function postUser(e) {
  //   e.preventDefault();
  //   console.log("Holaaaa?");
  //   let url = "http://127.0.0.1:3456/users";
  //   let data = { username, password };

  //   fetch(url, {
  //     method: 'post',
  //     headers: {
  //       'Accept': 'application/json, text/plain, */*',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   }).then(res => res.json())
  //     .then(res => console.log(res));
  // }

  useEffect(() => {
    console.log(API_URL);
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(res => console.log(res));
  }, [])
  return (
    <div className="App">
      {/* <div>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" name="pass" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={postUser}>Registrar</button>
      </div> */}
      <form action={`${API_URL}/users`} method="POST">
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" name="pass" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default App;
