import React, { useEffect, useState } from "react";
import agent from "../../../api/agent";
import { useStore } from "../../../Store";
import photo from "../../../images/cat.jpg";
import { observer } from "mobx-react-lite";
import { Button, Dropdown } from "react-bootstrap";

function UserProducts() {
  const { productStore, categoryStore, userStore } = useStore();
  const { products, productStores } = productStore;
  const { categories } = categoryStore;
  const { currentUser } = userStore;
  const [category, setCategory] = useState();

  useEffect(() => {
    agent.Products.get().then((data) => productStore.setProducts(data));
    agent.Categories.get().then((data) => categoryStore.setCategories(data));
  }, []);

  console.log("products", products);
  console.log("categories", categories);
  console.log("user", userStore.currentUser);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: "30px 0px",
        }}
      >
        <Dropdown style={{ margin: "0px 30px" }}>
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
        <Button
          variant="secondary"
          style={{ width: "100px", height: "38px" }}
          onClick={() => {
            if (category) {
              agent.Products.getFiltered(category as string).then((data) =>
                productStore.setProducts(data)
              );
            }
          }}
        >
          Sort
        </Button>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {products.map((product: any) => (
          <div className="card" style={{ marginLeft: "20px" }}>
            <img
              style={{ width: "270px", height: "207px" }}
              className="card-img-top"
              src={photo}
              alt=""
            />
            {/* <div>{product}</div> */}
            <div className="card-body">
              <h4 className="card-title">{product.name}</h4>
              <p className="card-text">{product.description}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{product.categoryName}</li>
              <li className="list-group-item">{product.price} $</li>
            </ul>
            <div className="card-body">
              <Button
                variant="secondary"
                style={{}}
                onClick={() => {
                  agent.User.createOrder(
                    "F43E66DF-A64E-4652-B85A-67FC3841938A",
                    product.id
                  );
                }}
              >
                Buy Product
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default observer(UserProducts);
