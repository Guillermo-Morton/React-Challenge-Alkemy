import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { withRouter } from "react-router";
import * as Yup from "yup";

const Login = (props) => {
  // const token= '4060184407368673'
  // const URL=`https://superheroapi.com/api/${token}/`

  // Definimos la URL
  const URL = "http://challenge-react.alkemy.org/";
  // Definimos Axios
  const axios = require("axios").default;
  // Definimos el token
  const [token, setToken] = useState("");
  const [passed, setPassed] = useState(false);
  // Definimos los state de los input
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  //   use Effect que solo actua en la actualizacion
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (email === "challenge@alkemy.org" && pass === "react") {
        // Pasa la validacion, hacer un post a la api
        axios.post(URL, {
            email: email,
            password: pass,
          })
          .then(function (response) {
            setToken(response.data.token);
            localStorage.setItem("tokenKey", JSON.stringify(token));
            props.history.push('/')
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        console.log("Datos incorrectos");
      }
    }
  }, [token, passed]);
  return (
    <div className="container">
      <div class="w-50 mx-auto my-5">
        <Formik
          initialValues={{ pass: "", email: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            pass: Yup.string()
              .min(5, "Must be 5 characters or more")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setEmail(values.email);
              setPass(values.pass);
              setSubmitting(false);
            }, 390);
            setTimeout(() => {
              setPassed(!passed);
            }, 400);
          }}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <Field className="form-control" placeholder='example@example.com' name="email" type="email" />
              <ErrorMessage name="email" />
            </div>

            <div className="form-group">
              <label htmlFor="firstName">Password</label>
              <Field className="form-control" placeholder='Write your password' name="pass" type="password" />
              <ErrorMessage name="pass" />
            </div>

            <Button type="submit">Submit</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default withRouter(Login);
