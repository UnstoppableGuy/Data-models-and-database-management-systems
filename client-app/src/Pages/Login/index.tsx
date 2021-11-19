import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import agent from "../../api/agent";
import { useStore } from "../../Store";
import "./index.css";

function LoginPage() {
  const loginField = useRef(null);
  const passwordField = useRef(null);
  const history = useHistory();

  const { userStore } = useStore();
  const { currentUser, setUser1 } = userStore;

  const loginHandler = () => {
    const email: any = loginField.current;
    const password: any = passwordField.current;

    const user = {
      email: email.value,
      passwordHash: password.value,
    };

    agent.Account.login(user)
      .then((response: any) => userStore.setUser(response))
      .then(() => {
        console.log("user = ", currentUser);

        if (currentUser?.roleName === "Admin") {
          history.push("/admin/categories");
        }

        if (currentUser?.roleName === "User") {
          history.push("/user/products");
        }
      });
  };

  return (
    <div id="loginform">
      <h2 id="headerTitle">Login</h2>
      <div>
        <div className="row">
          <label>Email</label>
          <input
            type={"text"}
            placeholder={"Enter your email"}
            ref={loginField}
          />
        </div>
        <div className="row">
          <label>Password</label>
          <input
            type={"password"}
            placeholder={"Enter your password"}
            ref={passwordField}
          />
        </div>
        <div id="button" className="row">
          <button onClick={loginHandler}>Log in</button>
        </div>
      </div>
      <div id="alternativeLogin">
        <label>Or sign in with:</label>
        <div id="iconGroup">
          <Link to="#" id="facebookIcon"></Link>
          <Link to="#" id="twitterIcon"></Link>
          <Link to="#" id="googleIcon"></Link>
        </div>
      </div>
    </div>
  );
}

export default observer(LoginPage);
