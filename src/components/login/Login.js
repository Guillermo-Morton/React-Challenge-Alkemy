import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  // const token= '4060184407368673'
  // const URL=`https://superheroapi.com/api/${token}/`

  // Definimos la URL
  const URL = "http://challenge-react.alkemy.org/";
  // Definimos Axios
  const axios = require("axios").default;
  // Definimos el token
  const [token, setToken] = useState("");
  const [logged, setlogged] = useState(false);
  // Definimos los state de los input
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (email != "" || pass != "") &&
      email === "challenge@alkemy.org" &&
      pass === "react"
    ) {
      // Pasa la validacion, hacer un post a la api
      axios
        .post(URL, {
          email: email,
          password: pass,
        })
        .then(function (response) {
          setToken(response.data.token);
          setlogged(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("datos invalidos");
      setToken('');
      setlogged(false);
    }
  };
  useEffect(() => {
    localStorage.setItem("tokenKey", JSON.stringify(token));
  }, [token]);
  return (
    <div className="container">
      <div class="w-50 mx-auto my-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
