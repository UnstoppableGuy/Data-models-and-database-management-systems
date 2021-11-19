import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import agent from "../../api/agent";

export default function CreateProduct() {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [store, setStore] = useState();
  const [description, setDescription] = useState();
  const history = useHistory();
  const [categories, setCategories] = useState<any>([]);
  const [stores, setStores] = useState<any>([]);

  useEffect(() => {
    agent.Categories.get().then((data) => setCategories(data));
    agent.Stores.get().then((data) => setStores(data));
  }, []);

  return (
    <Container style={{ marginTop: "30px" }}>
      <h1>Add Product</h1>
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
        <Dropdown style={{ marginTop: "30px" }}>
          <Dropdown.Toggle
            id="dropdown-button-dark-example1"
            variant="secondary"
          >
            {category ? category : "Product category"}
          </Dropdown.Toggle>

          <Dropdown.Menu variant="dark">
            {categories.map((elem: any) => (
              <Dropdown.Item onClick={() => setCategory(elem.name)}>
                {elem.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown style={{ marginTop: "30px" }}>
          <Dropdown.Toggle
            id="dropdown-button-dark-example1"
            variant="secondary"
          >
            {store ? store : "Product store"}
          </Dropdown.Toggle>

          <Dropdown.Menu variant="dark">
            {stores.map((elem: any) => (
              <Dropdown.Item onClick={() => setStore(elem.name)}>
                {elem.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
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
            if (name && price && category && store && description) {
              agent.Products.addProduct(
                {
                  categoryName: category,
                  name: name,
                  description: description,
                  price: price,
                },
                store
              ).then(() => history.push("/admin/products"));
            }
          }}
        >
          Add Product
        </Button>
      </Form>
    </Container>
  );
}
