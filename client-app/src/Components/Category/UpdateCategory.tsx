import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import agent from "../../api/agent";

interface LocationProps {
  id: string;
}

export default function UpdateCategory() {
  const [name, setName] = useState();
  const history = useHistory();
  const location = useLocation<LocationProps>();

  return (
    <Container style={{ marginTop: "100px" }}>
      <h1>Update Category</h1>
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
              agent.Categories.updateCategory({
                id: location.state.id,
                name: name,
              });
              history.push("/admin/categories");
            }
          }}
        >
          Update Category
        </Button>
      </Form>
    </Container>
  );
}
