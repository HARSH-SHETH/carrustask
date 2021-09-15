import { useState, useEffect } from 'react';

import User from './User';
import './App.css';

function App() {
  const [email, setEmail] = useState(null);

  useEffect(async () => {
    let emailId = prompt('Enter your email id');
    setEmail(emailId);

  }, [])

  return (
    <div className="App">
    { 
      email && 
      <User email={email}/>
    }
    </div>
  );
}

export default App;
