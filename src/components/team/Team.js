import React, { useState, useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import {
  TeamContainer,
  HeroName,
  HeroContainer,
  Appearance,
  Details,
  HeroImage,
  InnerBorder,
  InnerBorder2,
  InnerBorder3,
  AddHeroe,
  Title,
  Btn,
} from "./TeamElements";
const Team = (props) => {
  const [teams, setTeams] = useState([]);
  const [test, setTest] = useState([]);
  const _teams = JSON.parse(localStorage.getItem("teamsKey")) || [];

  const _psValues = [];
  const _psNames = [
    "Intelligence",
    "Strength",
    "Speed",
    "Durability",
    "Power",
    "Combat",
  ];
  const _teamsPs = [];
  const _team = [];
  const _fisicalFeatures = [];

  class Team {
    constructor(powerstats, heroes, dominance, fisicalFeatures, id) {
      this.powerstats = powerstats;
      this.heroes = heroes;
      this.dominance = dominance;
      this.fisicalFeatures = fisicalFeatures;
      this.id = id;
    }
  }
  class FisicalFeatures {
    constructor(weight, height) {
      this.weight = weight;
      this.height = height;
    }
  }
  const deleteHero = (id, key, state, array) => {
    let filteredTeams = [];
    for (let i in array) {
      // filtramos los heroes que NO queremos eliminar
      const filteredHeroes = array[i].filter((e) => e.id != id);
      filteredTeams.push(filteredHeroes);
      // Actualizamos el localstorage
    }
    for (let i in filteredTeams) {
      if (filteredTeams[i].length === 0) {
        filteredTeams.splice(i, 1);
        localStorage.setItem(key, JSON.stringify(filteredTeams));
      } else {
        localStorage.setItem(key, JSON.stringify(filteredTeams));
      }
    }
    state(filteredTeams);
  };
  const completeTeam = (id, key, state, array) => {
    const incompleteTeam = array[id].heroes;
    localStorage.setItem(key, JSON.stringify(incompleteTeam));
    let _filteredTeams = [];
    const filteredTeam = array.filter((e) => e.id != id);
    for (let i in filteredTeam) {
      _filteredTeams.push(filteredTeam[i].heroes);
    }
    localStorage.setItem("teamsKey", JSON.stringify(_filteredTeams));
    state(filteredTeam);
    props.history.push('/search')
  };
  const getTeamStats = () => {
    for (let e of _teams) {
      let ps = [];
      for (let i in e) {
        ps.push(Object.values(e[i].powerstats));
      }
      _psValues.push(ps);
    }
    for (let e of _psValues) {
      let array = [];
      let intelligence = 0;
      let strength = 0;
      let speed = 0;
      let durability = 0;
      let power = 0;
      let combat = 0;
      for (let el of e) {
        intelligence = intelligence + (el[0] === "null" ? 0 : parseInt(el[0]));
        strength = strength + (el[1] === "null" ? 0 : parseInt(el[1]));
        speed = speed + (el[2] === "null" ? 0 : parseInt(el[2]));
        durability = durability + (el[3] === "null" ? 0 : parseInt(el[3]));
        power = power + (el[4] === "null" ? 0 : parseInt(el[4]));
        combat = combat + (el[5] === "null" ? 0 : parseInt(el[5]));
      }
      array.push(intelligence, strength, speed, durability, power, combat);
      _teamsPs.push(array);
    }
  };
  const getTeamFisicalFeatures = () => {
    for (let e of _teams) {
      let _weight = [];
      let _height = [];
      for (let i in e) {
        _weight.push(
          parseInt(e[i].appearance.weight[1]) === 0
            ? 154
            : parseInt(e[i].appearance.weight[0])
        );
        _height.push(
          parseInt(e[i].appearance.height[1]) === 0
            ? 170
            : parseInt(e[i].appearance.height[1])
        );
      }
      // Forma de sumar los datos de un array en una linea
      let totalW = _weight.reduce((a, b) => a + b, 0);
      // Sacamos el promedio y convertimos libras a kg
      totalW = (parseInt(totalW / _weight.length) * 0.453592).toFixed(1);
      // Forma de sumar los datos de un array en una linea
      let totalH = _height.reduce((a, b) => a + b, 0);
      // Sacamos el promedio y convertidos cm a metro
      totalH = (parseInt(totalH / _height.length) / 100).toFixed(2);
      const fisicalFeatures = new FisicalFeatures(`${totalW}kg`, `${totalH}m`);

      _fisicalFeatures.push(fisicalFeatures);
    }
  };
  const token = JSON.parse(localStorage.getItem("tokenKey")) || "";
  const redirectLogin = () => {
    console.log(token);
    if (
      token !=
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE"
    ) {
      props.history.push("/login");
    }
  };
  const createTeamObject = () => {
    getTeamStats();
    getTeamFisicalFeatures();
    for (let i in _teams) {
      const maxNum = Math.max.apply(null, _teamsPs[i]);
      const index = _teamsPs[i].indexOf(maxNum);
      const team = new Team(
        _teamsPs[i],
        _teams[i],
        _psNames[index],
        _fisicalFeatures[i],
        i
      );
      _team.push(team);
    }
    setTeams(_team);
  };

  useEffect(() => {
    createTeamObject();
  }, [test]);

  // useEffect que actua cuando cambia la URL
  const location = useLocation();
  useEffect(() => {
    redirectLogin();
  }, [location.pathname]);

  return (
    <div className="container">
      {teams &&
        teams.map((team) => (
          <div>
            <div key={team.heroes[0].id + 745} className="row">
              <div className="text-center col-12">
                <h4 className="m-3">
                  Dominance:{" "}
                  {team.powerstats[0] === 0 &&
                  team.powerstats[1] === 0 &&
                  team.powerstats[2] === 0 &&
                  team.powerstats[3] === 0 &&
                  team.powerstats[4] === 0 &&
                  team.powerstats[5] === 0
                    ? "Unknown"
                    : " " + team.dominance}{" "}
                </h4>
                <div className="my-4 d-flex flex-wrap justify-content-center">
                  <h5 className="d-inline mx-3">
                    Average weight: {team.fisicalFeatures.weight}
                  </h5>
                  <h5 className="d-inline mx-3">
                    Average height: {team.fisicalFeatures.height}
                  </h5>
                </div>
                <div className='d-flex flex-wrap justify-content-center'>
                  <p className="d-inline mx-3">
                    Inteligence:
                    {team.powerstats[0] === "null"
                      ? "Unknown"
                      : " " + team.powerstats[0]}
                  </p>
                  <p className="d-inline mx-3">
                    Strength:
                    {team.powerstats[1] === "null"
                      ? "Unknown"
                      : " " + team.powerstats[1]}
                  </p>
                  <p className="d-inline mx-3">
                    Speed:
                    {team.powerstats[2] === "null"
                      ? "Unknown"
                      : " " + team.powerstats[2]}
                  </p>
                  <p className="d-inline mx-3">
                    Durability:
                    {team.powerstats[3] === "null"
                      ? "Unknown"
                      : " " + team.powerstats[3]}
                  </p>
                  <p className="d-inline mx-3">
                    Power:
                    {team.powerstats[4] === "null"
                      ? "Unknown"
                      : " " + team.powerstats[4]}
                  </p>
                  <p className="d-inline mx-3">
                    Combat:
                    {team.powerstats[5] === "null"
                      ? "Unknown"
                      : " " + team.powerstats[5]}
                  </p>
                </div>
              </div>
              <TeamContainer>
                <InnerBorder />
                <InnerBorder2 />
                <InnerBorder3 />
                  {team.heroes &&
                    team.heroes.map((hero) => (
                      <HeroContainer
                        key={hero.id + 432}
                        className="text-center col-lg-4 col-md-6 col-12"
                      >
                        <HeroName>{hero.name}</HeroName>
                        <Appearance>
                          <HeroImage src={hero.image.url} />
                          <Details className="popDetails">
                            <p>
                              {hero.appearance.weight[1] === "0 kg"
                                ? "Weight: 75 kg"
                                : 'Weight: ' +hero.appearance.weight[1]}
                            </p>
                            <p>
                              {hero.appearance.height[1] === "0 cm"
                                ? "Heigth: 170 cm"
                                : 'Heigth: ' +hero.appearance.height[1]}
                            </p>
                            <p>
                              {hero.biography.aliases[0] === "-"
                                ? "Alias: Unknown"
                                : 'Alias: '+hero.biography.aliases[0]}
                            </p>
                            <p>
                              {hero.appearance["eye-color"] === "-"
                                ? "Unknown"
                                : hero.appearance["eye-color"]+' eyes'}
                            </p>
                            <p>
                              {hero.appearance["hair-color"] === "-"
                                ? "Unknown"
                                : hero.appearance["hair-color"]==='No Hair' ? hero.appearance["hair-color"] : hero.appearance["hair-color"]+' Hair'}
                            </p>
                            <p className="px-5">
                              {hero.work.occupation === "-"
                                ? "Ocupation: Unknown"
                                : 'Ocupation: ' + hero.work.occupation}
                            </p>
                          </Details>
                        </Appearance>
                        <div>
                          <Title className="pb-5">
                            {hero.biography.alignment === "good"
                              ? "Hero"
                              : hero.biography.alignment === "bad"
                              ? "Villain"
                              : "Neutral"}{" "}
                            powerstats
                          </Title>
                          <div className="row">
                            <div className="col-6">
                              <p className="mb-4">
                                Intelligence:{" "}
                                {hero.powerstats.intelligence === "null"
                                  ? "Unknown"
                                  : hero.powerstats.intelligence}
                              </p>
                              <p className="mb-4">
                                Strength:{" "}
                                {hero.powerstats.strength === "null"
                                  ? "Unknown"
                                  : hero.powerstats.strength}
                              </p>
                              <p className="mb-4">
                                Speed:{" "}
                                {hero.powerstats.speed === "null"
                                  ? "Unknown"
                                  : hero.powerstats.speed}
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="mb-4">
                                Durability:{" "}
                                {hero.powerstats.durability === "null"
                                  ? "Unknown"
                                  : hero.powerstats.durability}
                              </p>
                              <p className="mb-4">
                                Power:{" "}
                                {hero.powerstats.power === "null"
                                  ? "Unknown"
                                  : hero.powerstats.power}
                              </p>
                              <p className="mb-4">
                                Combat:{" "}
                                {hero.powerstats.combat === "null"
                                  ? "Unknown"
                                  : hero.powerstats.combat}
                              </p>
                            </div>
                          </div>
                          <Btn
                            onClick={() => {
                              deleteHero(hero.id, "teamsKey", setTest, _teams);
                            }}
                          >
                            Delete
                          </Btn>
                        </div>
                      </HeroContainer>
                    ))}

                {team.heroes.length < 6 ? (
                  <AddHeroe className='text-center col-lg-4 col-md-6 col-12'>
                    <h4 class='pt-5'>
                      Looks like your team is incomplete
                    </h4>
                    <Btn
                      onClick={() => {
                        completeTeam(
                          team.id,
                          "selectedHeroesKey",
                          setTeams,
                          teams
                        );
                      }}
                      className="w-50"
                    >
                      Complete Team
                    </Btn>
                  </AddHeroe>
                ) : null}
              </TeamContainer>
            </div>
          </div>
        ))}
    </div>
  );
};

export default withRouter(Team);
