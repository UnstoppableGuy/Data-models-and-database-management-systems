import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useHistory } from "react-router";
import agent from "../../../api/agent";
import { useStore } from "../../../Store";

function Orders() {
  const { orderStore } = useStore();

  useEffect(() => {}, []);

  return (
    <Container style={{ marginTop: "100px" }}>
      <Button
        variant="secondary"
        style={{ float: "right", margin: "20px" }}
        onClick={() => {
          agent.User.get("F43E66DF-A64E-4652-B85A-67FC3841938A").then((data) =>
            orderStore.setCategories(data)
          );
        }}
      >
        Get Orders
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Store Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orderStore.orders.map((order: any) => (
            <tr>
              <td>{order.id}</td>
              <td>{order.productName}</td>
              <td>{order.storeName}</td>
              <td>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default observer(Orders);
