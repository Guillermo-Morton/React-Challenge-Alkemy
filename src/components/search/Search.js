import React, { useState, useEffect, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Search = () => {
  // Base URL
  const URL = `https://www.superheroapi.com/api.php/4060184407368673/`;

  const [hero, setHeroSearched] = useState(undefined);
  const [mainPs, setMainPs] = useState("");
  const [maxPsNum, setMaxPsNum] = useState("");
  const [psValues, setPsValues] = useState([]);
  const [psNames, setPsNames] = useState([]);
  // Definimos Axios
  const axios = require("axios").default;

  const findMainPS = () => {
    // Obtenemos la estadistica mas alta
    setMaxPsNum(
      Math.max(
        hero.powerstats.intelligence,
        hero.powerstats.strength,
        hero.powerstats.speed,
        hero.powerstats.durability,
        hero.powerstats.power,
        hero.powerstats.combat
      )
    );
    // obtenemos los valores de todas las estadisticas
    setPsValues(Object.values(hero.powerstats));
    // obtenemos los nombres de las propiedades como strings
    setPsNames(Object.getOwnPropertyNames(hero.powerstats));

    /*
        Como psValues y psNames, comparten el mismo orden, mediante array.indexOf(value),
        podemos encontrar la posicion en el arreglo del valor maximo psValues.indexOf(maxPsNum.toString()).
        Convertimos este valor a string debido a que los datos de psValues, son strings.

        De esta forma podemos extraer el nombre de la propiedad del objeto con el numero mas alto:
          setState(ArrayOfNames[ArrayofValues.indexOf(maxNumber.toString())])
          setMainPs(psNames[psValues.indexOf(maxPsNum.toString())]);
    */
  };

  //   use Effect que solo actua en la actualizacion
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      findMainPS();
    }
  }, [hero]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setMainPs(psNames[psValues.indexOf(maxPsNum.toString())]);
    }
  }, [psNames]);
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
                    setHeroSearched(response.data.results[0]);
                  })
                  .catch(function (error) {
                    // handle error
                    console.log(error);
                  })
                  .then(function () {
                    // always executed
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
          {hero != undefined ? (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={hero.image.url} />
              <Card.Body>
                <Card.Title>{hero.name}</Card.Title>
                <Card.Text>{hero.biography.alignment}</Card.Text>
                <Card.Text>{mainPs}</Card.Text>
                <Button variant="success">ADD TO TEAM</Button>
              </Card.Body>
            </Card>
          ) : null}
        </section>
      </div>
    </div>
  );
};

export default Search;
