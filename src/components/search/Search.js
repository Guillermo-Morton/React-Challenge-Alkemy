import React from "react";
import { Form, Button, Card } from "react-bootstrap";

const Search = () => {
  return (
    <div>
      <div className="container">
        <div class="w-50 mx-auto my-5">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Search hero" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <section>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>HERO NAME</Card.Title>
              <Card.Text>
                GOOD
              </Card.Text>
              <Card.Text>
                INTELIGENCE
              </Card.Text>
              <Button variant="success">ADD TO TEAM</Button>
            </Card.Body>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Search;
