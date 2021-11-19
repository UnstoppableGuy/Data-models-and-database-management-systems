import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import agent from "../../api/agent";

interface LocationProps {
  id: string;
}

export default function UpdateStore() {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const history = useHistory();
  const location = useLocation<LocationProps>();

  return (
    <Container style={{ marginTop: "100px" }}>
      <h1>Update Store</h1>
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
              agent.Stores.updateStore({
                id: location.state.id,
                name: name,
                address: address,
              });
              history.push("/admin/stores");
            }
          }}
        >
          Update Category
        </Button>
      </Form>
    </Container>
  );
}
