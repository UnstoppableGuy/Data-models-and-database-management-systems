import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useHistory } from "react-router";
import agent from "../../api/agent";
import { useStore } from "../../Store";

function ProductsTable() {
  const { productStore } = useStore();
  const { products } = productStore;
  const history = useHistory();

  useEffect(() => {
    agent.Products.get().then((data) => productStore.setProducts(data));
  }, [productStore]);

  return (
    <Container style={{ marginTop: "100px" }}>
      <Button
        variant="secondary"
        style={{ float: "right", margin: "20px" }}
        onClick={() => history.push("/admin/createProduct")}
      >
        Add Product
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr>
              <td>{product.id}</td>
              <td>{product.categoryName}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <Button
                  style={{ marginRight: "16px" }}
                  onClick={() => {
                    history.push({
                      pathname: "/admin/updateProduct",
                      state: { id: product.id },
                    });
                  }}
                >
                  Update
                </Button>
                <Button
                  style={{ marginRight: "16px" }}
                  variant="danger"
                  onClick={() => {
                    console.log(product.id);
                    agent.Products.removeProduct(product.id).then(() =>
                      history.push("/admin/products")
                    );
                  }}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    history.push({
                      pathname: "/admin/addImage",
                      state: { id: product.id },
                    });
                  }}
                >
                  Images
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default observer(ProductsTable);
