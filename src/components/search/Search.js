import React, { useState, useEffect, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Search = () => {
  // Base URL
  const URL = `https://www.superheroapi.com/api.php/4060184407368673/`;

  // Definimos nuestros states
  const [hero, setHeroSearched] = useState(undefined);
  const [selectedHeroes, setSelectedHeroes] = useState(undefined);
  const [allHeroes, setAllHeroes] = useState(undefined)
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
          hero[i].powerstats.intelligence === "null"
            ? 0
            : hero[i].powerstats.intelligence,
          hero[i].powerstats.strength === "null"
            ? 0
            : hero[i].powerstats.strength,
          hero[i].powerstats.speed === "null" ? 0 : hero[i].powerstats.speed,
          hero[i].powerstats.durability === "null"
            ? 0
            : hero[i].powerstats.durability,
          hero[i].powerstats.power === "null" ? 0 : hero[i].powerstats.power,
          hero[i].powerstats.combat === "null" ? 0 : hero[i].powerstats.combat
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
        value: names[index] || "none",
      });
    }
  };
  const _selectedHeroes =
    JSON.parse(localStorage.getItem("selectedHeroesKey")) || [];

  const getHero = (id) => {
    axios
      .get(`${URL}${id}`)
      .then(function (response) {
        // Limitamos la seleccion hasta 6 heroes
        if (_selectedHeroes.length < 6) {
          // Los heroes no se pueden agregar mas de una vez por equipo
          if (_selectedHeroes.filter((e) => e.id === id).length > 0) {
            console.log("cant choose the same hero twice");
          } else {
            // No se puede elegir mas de 3 heroes de la misma alineacion
            if (
              _selectedHeroes.filter(
                (e) =>
                  e.biography.alignment === response.data.biography.alignment
              ).length > 2
            ) {
              console.log(
                "cant choose more than 3 heroes from the same alignment"
              );
            } else {
              _selectedHeroes.push(response.data);
            }
          }
        } else {
          console.log("Only up to 6 heroes per team");
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        localStorage.setItem(
          "selectedHeroesKey",
          JSON.stringify(_selectedHeroes)
        );
        setSelectedHeroes(_selectedHeroes);
      });
  };

  const deleteHero = (id) => {
    // filtramos los heroes que NO queremos eliminar
    const filteredHeroes = _selectedHeroes.filter((e) => e.id != id);
    // Actualizamos el localstorage
    localStorage.setItem("selectedHeroesKey", JSON.stringify(filteredHeroes));
    setSelectedHeroes(filteredHeroes);
  };
  const _teams=JSON.parse(localStorage.getItem("teamsKey")) || [];
  const confirmTeam = ()=>{
      _teams.push(selectedHeroes)
    localStorage.setItem("teamsKey", JSON.stringify(_teams));
    localStorage.setItem("selectedHeroesKey", JSON.stringify([]));
    setSelectedHeroes(undefined);
  }
  const getAllHeroes = ()=>{
      axios
      .get(`${URL}search/a`)
      .then(function (response) {
        // handle success
        console.log(response);
        setAllHeroes(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
      });
  }
  // useEffect que solo actua en la actualizacion
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      findMainPS();
    }
  }, [hero]);

  useEffect(() => {
    setSelectedHeroes(_selectedHeroes);
    getAllHeroes();
  }, []);

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
        <h3>Team preview</h3>
        <section className="row">
          {selectedHeroes &&
            selectedHeroes.map((teamMember) => (
              <div key={teamMember.id + 1234} className="col-lg-4">
                <p>{teamMember.name}</p>
                <Button
                  onClick={() => {
                    deleteHero(teamMember.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            ))}
          <Button onClick={confirmTeam} className="my-3 ml-auto">Confirm team</Button>
        </section>
        <section className="row">
          {hero &&
            hero.map((hero) => (
              <div className="col-lg-4 col-md-6 col-sm-12"  key={hero.id} >
                <Card className='w-100 h-100'>
                  <Card.Img variant="top" src={hero.image.url} />
                  <Card.Body>
                    <Card.Title>{hero.name}</Card.Title>
                    <Card.Text>{hero.biography.alignment}</Card.Text>
                    <Card.Text>{hero.mainPs}</Card.Text>
                    <Button
                      onClick={() => {
                        getHero(hero.id);
                      }}
                      variant="success"
                    >
                      ADD TO TEAM
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </section>
        <h3>All Heroes</h3>
        <section className="row">
          {allHeroes &&
            allHeroes.map((hero) => (
              <div className="col-lg-4 col-md-6 col-sm-12"  key={hero.id+5555} >
                <Card className='w-100 h-100'>
                  <Card.Img variant="top" src={hero.image.url} />
                  <Card.Body>
                    <Card.Title>{hero.name}</Card.Title>
                    <Card.Text>{hero.biography.alignment}</Card.Text>
                    <Card.Text>{hero.mainPs}</Card.Text>
                    <Button
                      onClick={() => {
                        getHero(hero.id);
                      }}
                      variant="success"
                    >
                      ADD TO TEAM
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </section>
      </div>
    </div>
  );
};

export default Search;
