import React, { useState, useEffect, Fragment } from "react";
import { Card, Button } from "react-bootstrap";
import { withRouter, useLocation } from "react-router-dom";
import './team.scss'
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
  const completeTeam = (id, key, state, array)=>{
    const incompleteTeam = array[id].heroes
    localStorage.setItem(key, JSON.stringify(incompleteTeam));
    let _filteredTeams = [];
    const filteredTeam = array.filter((e)=> e.id!=id)
    for(let i in filteredTeam){
      _filteredTeams.push(filteredTeam[i].heroes)
    }
    localStorage.setItem('teamsKey', JSON.stringify(_filteredTeams));
    state(filteredTeam)
    
  }
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
  const token= JSON.parse(localStorage.getItem('tokenKey'))||''
  const redirectLogin = ()=>{
    console.log(token)
    if(token!='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE'){
    props.history.push('/login')
    }
  }
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
    // localStorage.setItem("teamObjectKey", JSON.stringify(_team));
  };

  useEffect(() => {
    createTeamObject();
  }, [test]);

   // useEffect que actua cuando cambia la URL
   const location = useLocation();
   useEffect(() => {
    redirectLogin()
   }, [location.pathname]);

  return (
    <div className="container">
      {teams &&
        teams.map((team) => (
          <div>
            <div key={team.heroes[0].id + 745} className="row my-5">
              <div className="col-lg-12 text-center my-3">
                <h3 className="my-3">Team powerStats</h3>
                <h4 className="my-3">
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
                <div className="my-4">
                  <h5 className="d-inline mx-3">
                    Average weight: {team.fisicalFeatures.weight}
                  </h5>
                  <h5 className="d-inline mx-3">
                    Average height: {team.fisicalFeatures.height}
                  </h5>
                </div>
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
              {team.heroes &&
                team.heroes.map((hero) => (
                  <div key={hero.id + 432} className="col-lg-4">
                    <Card className="text-center w-100 h-100">
                      <Card.Body>
                        <Card.Title>{hero.name}</Card.Title>
                      </Card.Body>
                      <Fragment>
                      <Card.Img className='img' variant="top" src={hero.image.url} />
                      <div className='popDetails'>
                        <p>{hero.appearance.weight[1]==='0 kg'? 'Unknown':hero.appearance.weight[1] }</p>
                        <p>{hero.appearance.height[1]==='0 cm'? 'Unknown':hero.appearance.height[1] }</p>
                        <p>{hero.biography.aliases[0]==='-'?'Unknown':hero.biography.aliases[0]}</p>
                        <p>{hero.appearance['eye-color']}</p>
                        <p>{hero.appearance['hair-color']}</p>
                        <p className='px-5'>{hero.work.occupation}</p>
                      </div>
                      </Fragment>
                      <Card.Body>
                        <Card.Title>
                          {hero.biography.alignment === "good"
                            ? "Hero"
                            : hero.biography.alignment === "bad"
                            ? "Villain"
                            : "Neutral"}{" "}
                          powerstats
                        </Card.Title>
                        <div className="row">
                          <div className="col-lg-6">
                            <p>
                              Intelligence:{" "}
                              {hero.powerstats.intelligence === "null"
                                ? "Unknown"
                                : hero.powerstats.intelligence}
                            </p>
                            <p>
                              Strength:{" "}
                              {hero.powerstats.strength === "null"
                                ? "Unknown"
                                : hero.powerstats.strength}
                            </p>
                            <p>
                              Speed:{" "}
                              {hero.powerstats.speed === "null"
                                ? "Unknown"
                                : hero.powerstats.speed}
                            </p>
                          </div>
                          <div className="col-lg-6">
                            <p>
                              Durability:{" "}
                              {hero.powerstats.durability === "null"
                                ? "Unknown"
                                : hero.powerstats.durability}
                            </p>
                            <p>
                              Power:{" "}
                              {hero.powerstats.power === "null"
                                ? "Unknown"
                                : hero.powerstats.power}
                            </p>
                            <p>
                              Combat:{" "}
                              {hero.powerstats.combat === "null"
                                ? "Unknown"
                                : hero.powerstats.combat}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            deleteHero(hero.id, "teamsKey", setTest, _teams);
                          }}
                          className="mx-2"
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
            </div>
            {team.heroes.length < 6 ? <Button onClick={()=>{completeTeam(team.id, 'selectedHeroesKey', setTeams, teams)}}>Complete Team {team.id}</Button> : null}
          </div>
        ))}
    </div>
  );
};

export default withRouter(Team);
