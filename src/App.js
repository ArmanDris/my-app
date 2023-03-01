import './App.css';
import React, { useState, useEffect } from "react";

// https://create-react-app.dev/docs/developing-components-in-isolation/
function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('http://localhost:8000/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <div class='enterinfo'>
        <span class="login">Login</span>
        <input class='unameField lightText' type="text" name="uname" required />
        {renderErrorMessage("uname")}
        <input class='passField lightText' type="password" name="pass" required />
        {renderErrorMessage("pass")}
        <input class='submit' type="submit" value=">"></input>
        <span class="register">- register</span>
      </div>
    </form>
  );

  const renderHome = (
    <div class='enterinfo'>
      <span class='login'>Welcome.</span>
    </div>
  );

  function setWindow() {
    if (isSubmitted) {
      return renderHome;
    } else {
      return renderForm;
    }
  }

  return (
    <div className="App" id="App">
      <h1>{message}</h1>
      {setWindow()}
    </div>
  );
}

export default App;