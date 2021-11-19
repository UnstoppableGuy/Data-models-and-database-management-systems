import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import agent from "../../api/agent";

export default function Create() {
  const [name, setName] = useState();
  const history = useHistory();
  console.log(name);

  return (
    <Container style={{ marginTop: "100px" }}>
      <h1>Add Category</h1>
      <Form style={{ margin: "50px" }}>
        <Row>
          <Col>
            <Form.Control
              placeholder="Category Name"
              onChange={(e: any) => {
                setName(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Button
          style={{ margin: "30px", float: "right" }}
          onClick={() => {
            if (name) {
              agent.Categories.addCategory({
                name: name,
              }).then(() => history.push("/admin/categories"));
            }
          }}
        >
          Add Category
        </Button>
      </Form>
    </Container>
  );
}
