import axios from "axios";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import agent from "../../api/agent";
import { useStore } from "../../Store";

interface LocationProps {
  id: string;
}

export default function AddImage() {
  const location = useLocation<LocationProps>();
  const [images, setImages] = useState<any>([]);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    agent.Products.getImages(location.state.id).then((data) => setImages(data));
  }, []);

  console.log(images);
  console.log("id", location.state.id);

  return (
    <Container style={{ marginTop: "100px" }}>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Row style={{ paddingTop: "0px" }}>
          <Col>
            <Form.Control
              placeholder="Image url"
              onChange={(e: any) => {
                setImageUrl(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Button
          variant="secondary"
          style={{ float: "right", margin: "20px" }}
          onClick={() => {
            agent.Products.addImage({
              ProductId: location.state.id,
              Url: imageUrl,
            });
          }}
        >
          Add Image
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Id</th>
            <th>Url</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image: any) => (
            <tr>
              <td>{image.id}</td>
              <td>{image.productId}</td>
              <td>{image.url}</td>
              <td>
                <Button
                  variant="danger"
                  style={{ marginRight: "16px" }}
                  onClick={() => {
                    agent.Products.deleteImage(
                      image.id,
                      image.productId,
                      image.url
                    );
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
