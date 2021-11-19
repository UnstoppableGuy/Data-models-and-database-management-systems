import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Profile() {
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const updateHandler = () => {
    
  };

  return (
    <Container style={{ marginTop: "30px" }}>
      <h1>Your Profile</h1>
      <Form style={{ margin: "50px" }}>
        <Row>
          <Col>
            <Form.Control
              placeholder="First name"
              onChange={(e: any) => {
                setName(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              placeholder="Last name"
              onChange={(e: any) => {
                setLastName(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              placeholder="Email"
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              placeholder="Password"
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Button style={{ margin: "30px", float: "right" }} onClick={() => {}}>
          Change data
        </Button>
      </Form>
    </Container>
  );
}
