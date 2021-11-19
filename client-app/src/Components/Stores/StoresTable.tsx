import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useHistory } from "react-router";
import agent from "../../api/agent";
import { useStore } from "../../Store";

function StoresTable() {
  const { storesStore } = useStore();
  const { stores } = storesStore;
  const history = useHistory();

  useEffect(() => {
    agent.Stores.get().then((data) => storesStore.setStores(data));
  }, [storesStore]);

  return (
    <Container style={{ marginTop: "100px" }}>
      <Button
        variant="secondary"
        style={{ float: "right", margin: "20px" }}
        onClick={() => {
          history.push("/admin/createStore");
        }}
      >
        Add Store
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store: any) => (
            <tr>
              <td>{store.id}</td>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>
                <Button
                  style={{ marginRight: "16px" }}
                  onClick={() => {
                    history.push({
                      pathname: "/admin/updateStore",
                      state: { id: store.id },
                    });
                  }}
                >
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default observer(StoresTable);
