import React, { useState, useEffect, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Search = () => {
  // Base URL
  const URL = `https://www.superheroapi.com/api.php/4060184407368673/`;

  // Definimos nuestros states
  const [hero, setHeroSearched] = useState(undefined);
  const [ok, setOk] = useState(false);

  // Definimos Axios
  const axios = require("axios").default;

    // ps significa powerstats
  const _maxPsNum = [];
  const _psValues = [];
  const _psNames = [];

  const findMainPS = () => {
    for (let i in hero) {
      // Obtenemos la estadistica mas alta
      _maxPsNum.push(
        Math.max(
          hero[i].powerstats.intelligence,
          hero[i].powerstats.strength,
          hero[i].powerstats.speed,
          hero[i].powerstats.durability,
          hero[i].powerstats.power,
          hero[i].powerstats.combat
        )
      );
      // Obtenemos los valores de las propiedades
      _psValues.push(Object.values(hero[i].powerstats));
      // Obtenemos los nombres de las propiedades en forma de string
      _psNames.push(Object.getOwnPropertyNames(hero[i].powerstats));
      // Conseguimos la posicion de la powerstat dominante
      const index = _psValues[i].indexOf(_maxPsNum[i].toString());
      const names = _psNames[i];
      // Definimos una nueva propiedad con el valor del powerstat dominante, en forma de string
      Object.defineProperty(hero[i], "mainPs", {
        value: names[index],
      });
    }
  };

  // useEffect que solo actua en la actualizacion
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      findMainPS();
    }
  }, [hero]);

  return (
    <div>
      <div className="container">
        <div className="w-50 mx-auto my-5">
          <Formik
            initialValues={{ search: "" }}
            validationSchema={Yup.object({
              search: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                axios
                  .get(`${URL}search/${values.search}`)
                  .then(function (response) {
                    // handle success
                    console.log(response);
                    setHeroSearched(response.data.results);
                  })
                  .catch(function (error) {
                    // handle error
                    console.log(error);
                  })
                  .then(function () {
                    setOk(!ok);
                  });
                setSubmitting(false);
              }, 390);
            }}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="search">Search Hero</label>
                <Field
                  className="form-control"
                  placeholder="Batman"
                  name="search"
                  type="text"
                />
                <ErrorMessage name="search" />
              </div>
              <Button type="submit">Submit</Button>
            </Form>
          </Formik>
        </div>
        <section>
          {hero &&
            hero.map((hero) => (
              <Card key={hero.id} style={{ width: "18rem" }}>
                <Card.Img variant="top" src={hero.image.url} />
                <Card.Body>
                  <Card.Title>{hero.name}</Card.Title>
                  <Card.Text>{hero.biography.alignment}</Card.Text>
                  <Card.Text>{hero.mainPs}</Card.Text>
                  <Button variant="success">ADD TO TEAM</Button>
                </Card.Body>
              </Card>
            ))}
        </section>
      </div>
    </div>
  );
};

export default Search;
