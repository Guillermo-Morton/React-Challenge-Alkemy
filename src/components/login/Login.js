import React, { useState, useEffect, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { withRouter, useLocation } from "react-router";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Btn, LoginContainer } from "./LoginElements";
import LoadingScreen from "../search/LoadingScreen";
import "../search/loading.scss";

const Login = (props) => {
  // const token= '4060184407368673'
  // const URL=`https://superheroapi.com/api/${token}/`

  // Definimos la URL
  const URL = "http://challenge-react.alkemy.org/";
  // Definimos Axios
  const axios = require("axios").default;
  // Definimos el token
  const [token, setToken] = useState("");
  const [passed, setPassed] = useState(undefined);
  // Definimos los state de los input
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loaded, setLoaded] = useState(true);

  //   use Effect que solo actua en la actualizacion
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (email === "challenge@alkemy.org" && pass === "react") {
        // Pasa la validacion, hacer un post a la api
        setLoaded(false);
        setPassed(true);
        axios
          .post(URL, {
            email: email,
            password: pass,
          })
          .then(function (response) {
            setToken(response.data.token);
            localStorage.setItem("tokenKey", JSON.stringify(token));
            setTimeout(()=>{
              setLoaded(true)
            },400)
            setTimeout(()=>{
              props.history.push('/')
            },390)
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      } else {
        setPassed(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Incorrect data!",
        });
      }
    }
  }, [token, passed]);
  const location = useLocation();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("tokenKey")) || "" !== "") {
      props.history.push("/");
    }
  }, [location.pathname]);
  const showLoad = loaded === true ? "" : "d-none";
  const hideLoad = loaded === false ? "" : "d-none";
  return (
    <div>
      <div className={hideLoad}>
        <LoadingScreen />
      </div>
      <LoginContainer className="container d-flex align-items-center">
        <div class={`w-50 m-auto fadeIn ${showLoad}`}>
          <Formik
            initialValues={{ pass: "", email: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("*Email is required"),
              pass: Yup.string()
                .min(5, "Must be 5 characters or more")
                .required("*Password is required"),
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
                <Field
                  className={`form-control ${
                    passed === false
                      ? "is-invalid"
                      : passed === true
                      ? "is-valid"
                      : null
                  }`}
                  placeholder="example@example.com"
                  name="email"
                  type="email"
                />
                <ErrorMessage name="email" />
              </div>

              <div className="form-group">
                <label htmlFor="firstName">Password</label>
                <Field
                  className={`form-control ${
                    passed === false
                      ? "is-invalid"
                      : passed === true
                      ? "is-valid"
                      : null
                  }`}
                  placeholder="Write your password"
                  name="pass"
                  type="password"
                />
                <ErrorMessage name="pass" />
              </div>

              <Btn type="submit">Submit</Btn>
            </Form>
          </Formik>
        </div>
      </LoginContainer>
    </div>
  );
};

export default withRouter(Login);
