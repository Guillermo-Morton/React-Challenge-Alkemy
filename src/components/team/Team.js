import React, { useState, useEffect, useRef } from "react";
import { Card, Button } from "react-bootstrap";

const Team = () => {
  const [teams, setTeams] = useState([]);

  const _teams = JSON.parse(localStorage.getItem("teamsKey")) || [];
  
  const _psValues = [];
  const _teamsPs= [];
  const _team=[]

  class Team {
    constructor(powerstats, heroes) {
      this.powerstats = powerstats;
      this.heroes = heroes;
    }
  }
  
  const getTeamPs = () => {
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
        intelligence=intelligence+(el[0] === "null" ? 0 : parseInt(el[0]));
        strength=strength+(el[1] === "null" ? 0 : parseInt(el[1]));
        speed=speed+(el[2] === "null" ? 0 : parseInt(el[2]));
        durability=durability+(el[3] === "null" ? 0 : parseInt(el[3]));
        power=power+(el[4] === "null" ? 0 : parseInt(el[4]));
        combat=combat+(el[5] === "null" ? 0 : parseInt(el[5]));
      }
      array.push(intelligence,strength,speed,durability,power,combat)
      _teamsPs.push(array)
    }
    
    for(let i in _teams){
      const team = new Team(_teamsPs[i], _teams[i])
        _team.push(team)
    }
    setTeams(_team)
  };

  useEffect(() => {
    getTeamPs();
  }, [])


  return (
    <div className="container">
      {teams &&
        teams.map((team) => (
          <div key={team.heroes[0].id + 745} className="row my-5">
            <div className="col-lg-12 text-center my-3">
              <h3 className="my-3">Team powerStats</h3>
              <p className="d-inline mx-3">Inteligence: {team.powerstats[0]}</p>
              <p className="d-inline mx-3">Strength: {team.powerstats[1]}</p>
              <p className="d-inline mx-3">Speed: {team.powerstats[2]}</p>
              <p className="d-inline mx-3">Durability: {team.powerstats[3]}</p>
              <p className="d-inline mx-3">Power: {team.powerstats[4]}</p>
              <p className="d-inline mx-3">Combat: {team.powerstats[5]}</p>
            </div>
            {team.heroes && team.heroes.map((hero) => (
              <div key={hero.id + 432} className="col-lg-4">
                <Card className="text-center w-100 h-100">
                  <Card.Body>
                    <Card.Title>{hero.name}</Card.Title>
                  </Card.Body>
                  <Card.Img variant="top" src={hero.image.url} />
                  <Card.Body>
                    <Card.Title>Hero powerstats</Card.Title>
                    <div className="row">
                      <div className="col-lg-6">
                        <p>Intelligence: {hero.powerstats.intelligence}</p>
                        <p>Strength: {hero.powerstats.strength}</p>
                        <p>Speed: {hero.powerstats.speed}</p>
                      </div>
                      <div className="col-lg-6">
                        <p>Durability: {hero.powerstats.durability}</p>
                        <p>Power: {hero.powerstats.power}</p>
                        <p>Combat: {hero.powerstats.combat}</p>
                      </div>
                    </div>
                    <Button className="mx-2" variant="warning">
                      Details
                    </Button>
                    <Button className="mx-2" variant="danger">
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Team;
