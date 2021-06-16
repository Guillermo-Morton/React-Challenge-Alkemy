import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

const Team = () => {
  const [teams, setTeams] = useState(undefined);
  useEffect(() => {
    setTeams(JSON.parse(localStorage.getItem("teamsKey")));
  }, []);
  return (
    <div className="container">
      {teams &&
        teams.map((team) => (
          <div key={team[0].id+745} className="row my-5">
            <div className="col-lg-12 text-center my-3">
              <h3 className="my-3">Team powerStats</h3>
              <p className="d-inline mx-3">Inteligence: 5.6</p>
              <p className="d-inline mx-3">Inteligence: 5.6</p>
              <p className="d-inline mx-3">Inteligence: 5.6</p>
              <p className="d-inline mx-3">Inteligence: 5.6</p>
              <p className="d-inline mx-3">Inteligence: 5.6</p>
              <p className="d-inline mx-3">Inteligence: 5.6</p>
            </div>
            {team.map((hero) => (
              <div key={hero.id+432} className="col-lg-4">
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
