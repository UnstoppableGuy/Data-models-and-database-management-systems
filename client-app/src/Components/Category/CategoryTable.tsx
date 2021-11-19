import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useHistory } from "react-router";
import agent from "../../api/agent";
import { useStore } from "../../Store";

function CategoryTable() {
  const { categoryStore } = useStore();
  const { categories } = categoryStore;
  const history = useHistory();

  useEffect(() => {
    agent.Categories.get().then((data) => categoryStore.setCategories(data));
  }, [categoryStore]);

  return (
    <Container style={{ marginTop: "100px" }}>
      <Button
        variant="secondary"
        style={{ float: "right", margin: "20px" }}
        onClick={() => {
          history.push("/admin/createCategory");
        }}
      >
        Add a Category
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: any) => (
            <tr>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <Button
                  onClick={() => {
                    history.push({
                      pathname: "/admin/updateCategory",
                      state: { id: category.id },
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

export default observer(CategoryTable);
