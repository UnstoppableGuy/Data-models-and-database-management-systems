import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import agent from "../../api/agent";

export default function CreateStore() {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const history = useHistory();

  console.log("name =", name);

  console.log("address = ", address);

  return (
    <Container style={{ marginTop: "100px" }}>
      <h1>Add Store</h1>
      <Form style={{ margin: "50px" }}>
        <Row>
          <Col>
            <Form.Control
              placeholder="Store Name"
              onChange={(e: any) => {
                setName(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              placeholder="Store Adress"
              onChange={(e: any) => {
                setAddress(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Button
          style={{ margin: "30px", float: "right" }}
          onClick={() => {
            if (name && address) {
                agent.Stores.addStore({
                  name: name,
                  address: address,
                }).then(() => history.push("/admin/stores"));
            }
          }}
        >
          Add Store
        </Button>
      </Form>
    </Container>
  );
}
