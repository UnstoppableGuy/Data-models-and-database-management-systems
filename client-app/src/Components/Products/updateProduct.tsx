import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import agent from "../../api/agent";

interface LocationProps {
  id: string;
}

export default function UpdateProduct() {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const history = useHistory();
  const location = useLocation<LocationProps>();

  return (
    <Container style={{ marginTop: "30px" }}>
      <h1>Update Product</h1>
      <Form style={{ margin: "50px" }}>
        <Row>
          <Col>
            <Form.Control
              placeholder="Product name"
              onChange={(e: any) => {
                setName(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              placeholder="Product price"
              onChange={(e: any) => {
                setPrice(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              placeholder="Product description"
              onChange={(e: any) => {
                setDescription(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Button
          style={{ margin: "30px", float: "right" }}
          onClick={() => {
            if (name && price && description) {
              console.log("price", price);
              agent.Products.updateProduct({
                id: location.state.id,
                name: name,
                description: description,
                price: price,
              }).then(() => history.push("/admin/products"));
            }
          }}
        >
          Update Product
        </Button>
      </Form>
    </Container>
  );
}
