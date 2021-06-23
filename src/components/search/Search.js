import React, { useState, useEffect, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { withRouter, useLocation } from "react-router-dom";
import * as Yup from "yup";
import {
  HeroCard,
  HeroImg,
  HeroDetails,
  HeroBtn,
  HeroTitle,
  HeroText,
  SearchContainer
} from "./SearchElements";
import Swal from "sweetalert2";
import LoadingScreen from "./LoadingScreen";
import './loading.scss'

export const deleteHero = (id, key, state, array) => {
  // filtramos los heroes que NO queremos eliminar
  const filteredHeroes = array.filter((e) => e.id != id);
  // Actualizamos el localstorage
  localStorage.setItem(key, JSON.stringify(filteredHeroes));
  state(filteredHeroes);
};
const Search = (props) => {
  // Base URL
  const URL = `https://www.superheroapi.com/api.php/4060184407368673/`;

  // Definimos nuestros states
  const [hero, setHeroSearched] = useState(undefined);
  const [search, setSearch] = useState("");
  const [selectedHeroes, setSelectedHeroes] = useState(undefined);
  const [allHeroes, setAllHeroes] = useState(undefined);
  const [ok, setOk] = useState(false);

  // Definimos Axios
  const axios = require("axios").default;

  // ps significa powerstats
  const _maxPsNum = [];
  const _psValues = [];
  const _psNames = [
    "Intelligence",
    "Strength",
    "Speed",
    "Durability",
    "Power",
    "Combat",
  ];

  const findMainPS = (state) => {
    for (let i in state) {
      // Obtenemos la estadistica mas alta
      _maxPsNum.push(
        Math.max(
          state[i].powerstats.intelligence === "null"
            ? 0
            : state[i].powerstats.intelligence,
          state[i].powerstats.strength === "null"
            ? 0
            : state[i].powerstats.strength,
          state[i].powerstats.speed === "null" ? 0 : state[i].powerstats.speed,
          state[i].powerstats.durability === "null"
            ? 0
            : state[i].powerstats.durability,
          state[i].powerstats.power === "null" ? 0 : state[i].powerstats.power,
          state[i].powerstats.combat === "null" ? 0 : state[i].powerstats.combat
        )
      );
      // Obtenemos los valores de las propiedades
      _psValues.push(Object.values(state[i].powerstats));
      // Obtenemos los nombres de las propiedades en forma de string
      // _psNames.push(Object.getOwnPropertyNames(state[i].powerstats));
      // Conseguimos la posicion de la powerstat dominante
      const index = _psValues[i].indexOf(_maxPsNum[i].toString());
      // Definimos una nueva propiedad con el valor del powerstat dominante, en forma de string
      Object.defineProperty(state[i], "mainPs", {
        value: _psNames[index] || "unknown",
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
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Can't choose the same hero twice!",
            });
          } else {
            // No se puede elegir mas de 3 heroes de la misma alineacion
            if (
              _selectedHeroes.filter(
                (e) =>
                  e.biography.alignment === response.data.biography.alignment
              ).length > 2
            ) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Can't choose more than 3 heroes from the same alignment!",
              });
            } else {
              _selectedHeroes.push(response.data);
            }
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Only up to 6 heroes per team!",
          });
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

  const _teams = JSON.parse(localStorage.getItem("teamsKey")) || [];
  const confirmTeam = () => {
    const _confirmTeam = () => {
      _teams.push(selectedHeroes);
      localStorage.setItem("teamsKey", JSON.stringify(_teams));
      localStorage.setItem("selectedHeroesKey", JSON.stringify([]));
      setSelectedHeroes(undefined);
    };
    if (JSON.parse(localStorage.getItem("selectedHeroesKey")).length > 5) {
      _confirmTeam();
    } else {
      Swal.fire({
        title: "Looks like your team is incomplete",
        text: "Do you want to create the team anyway?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          _confirmTeam();
          Swal.fire("Good job!", "You created/changed a team!", "success");
        } else {
          return;
        }
      });
    }
  };

  const getAllHeroes = () => {
    setOk(false);
    axios
      .get(`${URL}search/a`)
      .then(function (response) {
        // handle success
        setAllHeroes(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        setTimeout(()=>{
          setOk(true);

        },200)
      });
  };
  const token = JSON.parse(localStorage.getItem("tokenKey")) || "";
  const redirectLogin = () => {
    if (
      token !==
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE"
    ) {
      props.history.push("/login");
    }
  };
  // useEffect que solo actua en la actualizacion
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      findMainPS(hero);
    }
  }, [hero]);

  useEffect(() => {
    setSelectedHeroes(_selectedHeroes);
    getAllHeroes();
  }, []);
  useEffect(() => {
    findMainPS(allHeroes);
  }, [allHeroes]);
  // useEffect que actua cuando cambia la URL
  const location = useLocation();
  useEffect(() => {
    redirectLogin();
  }, [location.pathname]);

  const showLoad = ok === true ? "" : "d-none";
  const hideLoad = ok === false ? "" : "d-none";

  return (
    <SearchContainer>
      <SearchContainer className={hideLoad}><LoadingScreen/></SearchContainer>
      <div className={`container fadeIn ${showLoad}`}>
        <div className="w-50 mx-auto my-5">
          <Formik
            initialValues={{ search: "" }}
            validationSchema={Yup.object({
              search: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setOk(false);
              setTimeout(() => {
                axios
                  .get(`${URL}search/${values.search}`)
                  .then(function (response) {
                    // handle success
                    setSearch(values.search);
                    setHeroSearched(response.data.results);
                  })
                  .catch(function (error) {
                    // handle error
                    console.log(error);
                  })
                  .then(function () {
                    setOk(true);
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
              <HeroBtn type="submit">Submit</HeroBtn>
            </Form>
          </Formik>
        </div>

        <section>
          {selectedHeroes && selectedHeroes.length > 0 ? (
            <div>
              <h3 className="mb-4">Team preview</h3>
              <div className="d-flex flex-wrap">
                {selectedHeroes &&
                  selectedHeroes.map((teamMember) => (
                    <div
                      key={teamMember.id + 1234}
                      className="col-lg-4 col-md-6 col-12"
                    >
                      <HeroCard>
                        <HeroImg src={teamMember.image.url} />
                        <HeroDetails>
                          <HeroText className="text-center">
                            {teamMember.name}
                          </HeroText>
                          <HeroBtn
                            onClick={() => {
                              deleteHero(
                                teamMember.id,
                                "selectedHeroesKey",
                                setSelectedHeroes,
                                _selectedHeroes
                              );
                            }}
                          >
                            Delete
                          </HeroBtn>
                        </HeroDetails>
                      </HeroCard>
                    </div>
                  ))}
              </div>
              <HeroBtn
                onClick={confirmTeam}
                className="my-3 mx-auto d-block w-50"
              >
                Confirm team
              </HeroBtn>
            </div>
          ) : null}
        </section>
        <section>
          {hero && hero.length > 0 ? (
            <div>
              <hr className="my-5" />
              <h3 className="mb-3">Results for {search && search}</h3>
              <div className="d-flex flex-wrap">
                {hero.map((hero) => (
                  <div className="col-md-6 col-sm-12" key={hero.id}>
                    <HeroCard>
                      <HeroImg src={hero.image.url} />
                      <HeroDetails>
                        <HeroTitle>{hero.name}</HeroTitle>
                        <HeroText>
                          {hero.biography.alignment === "good"
                            ? "Hero"
                            : hero.biography.alignment === "bad"
                            ? "Villain"
                            : "Neutral"}
                        </HeroText>
                        <HeroText>{hero.mainPs}</HeroText>
                        <HeroBtn
                          onClick={() => {
                            getHero(hero.id);
                          }}
                        >
                          ADD TO TEAM
                        </HeroBtn>
                      </HeroDetails>
                    </HeroCard>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </section>
        <hr className="my-5" />
        <h3>All Heroes</h3>
        <section className="d-flex flex-wrap">
          {allHeroes &&
            allHeroes.map((hero) => (
              <div className="col-md-6 col-sm-12" key={hero.id + 5555}>
                <HeroCard>
                  <HeroImg src={hero.image.url} />
                  <HeroDetails>
                    <HeroTitle>{hero.name}</HeroTitle>
                    <HeroText>
                      {hero.biography.alignment === "good"
                        ? "Hero"
                        : hero.biography.alignment === "bad"
                        ? "Villain"
                        : "Neutral"}
                    </HeroText>
                    <HeroText>{hero.mainPs}</HeroText>
                    <HeroBtn
                      onClick={() => {
                        getHero(hero.id);
                      }}
                      variant="success"
                    >
                      ADD TO TEAM
                    </HeroBtn>
                  </HeroDetails>
                </HeroCard>
              </div>
            ))}
        </section>
      </div>
    </SearchContainer>
  );
};

export default withRouter(Search);
