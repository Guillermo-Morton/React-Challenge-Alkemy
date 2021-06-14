import React from "react";
import { Card, Button } from "react-bootstrap";

const Team = () => {
  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-lg-12 text-center my-3">
          <h3 className='my-3'>Team powerStats</h3>
          <p className='d-inline mx-3'>Inteligence: 5.6</p>
          <p className='d-inline mx-3'>Inteligence: 5.6</p>
          <p className='d-inline mx-3'>Inteligence: 5.6</p>
          <p className='d-inline mx-3'>Inteligence: 5.6</p>
          <p className='d-inline mx-3'>Inteligence: 5.6</p>
          <p className='d-inline mx-3'>Inteligence: 5.6</p>
        </div>
        <div className="col-lg-4">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Hero name</Card.Title>
            </Card.Body>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Hero powerstats</Card.Title>
              <div className="row px-4">
                <div className="col-lg-6">
                  <p>Inteligence: 5.6</p>
                  <p>Inteligence: 5.6</p>
                  <p>Inteligence: 5.6</p>
                </div>
                <div className="col-lg-6">
                  <p>Inteligence: 5.6</p>
                  <p>Inteligence: 5.6</p>
                  <p>Inteligence: 5.6</p>
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
       
        
      </div>
    </div>
  );
};

export default Team;
