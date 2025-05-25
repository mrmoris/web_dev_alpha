import { useState } from 'react';

function App() {
  const [count, setCount] = useState(1);

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>Hello from Counter App!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c * 2)}>Click Me</button>

      {/* ✅ Pass count as a prop */}
      <Btm count={count} />
    </div>
  );
}

// ✅ Use props.count inside the component
function Btm(props) {
  const random = Math.random();
  const [randomState, setRandomState] = useState(0)
  return (
    <div>
      <h1>Hello</h1>
      <p>This is a paragrap</p>
      <strong>Random code genrator: {randomState}</strong> 
      <br></br> <br></br>     
      <button onClick={() => setRandomState((c) => c = random)} > click</button>

      <Form></Form>
    </div>
  );
}


function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submittedData, setSubmittedData] = useState({ username: '', password: '' });

  const handleClick = () => {
    setSubmittedData({ username, password });
    setShowInfo(!showInfo);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Enter your details</h2>

      <div>
        Username:
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />

      <div>
        Password:
        <input
          type={passwordVisible ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label>
          <input
            type="checkbox"
            checked={passwordVisible}
            onChange={() => setPasswordVisible(!passwordVisible)}
          />{' '}
          Show Password
        </label>
      </div>

      <br />
      <button onClick={handleClick}>
        {showInfo ? 'Hide Info' : 'Show Info'}
      </button>

      <br /><br />
      {showInfo && (
        <div>
          <strong>Usernamee:</strong> {submittedData.username} <br />
          <strong>Password:</strong> {submittedData.password}
        </div>
      )}
    </div>
  );
}



export default App;


