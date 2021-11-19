import { useRef } from "react";
import { useHistory } from "react-router-dom";
import agent from "../../api/agent";
import { useStore } from "../../Store";
import "./index.css";

export default function RegisterPage() {
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailField = useRef(null);
  const passwordField = useRef(null);

  const { userStore } = useStore();
  const { currentUser } = userStore;
  const history = useHistory();

  const registerHandler = () => {
    const name: any = firstName.current;
    const surName: any = lastName.current;
    const email: any = emailField.current;
    const password: any = passwordField.current;

    const user = {
      firstName: name.value,
      lastName: surName.value,
      email: email.value,
      passwordHash: password.value,
    };

    agent.Account.register(user).then((data) => userStore.setUser(data));

    console.log(currentUser);

    if (currentUser?.roleName === "Admin") {
      history.push("/admin/categories");
    }

    if (currentUser?.roleName === "User") {
      history.push("/user");
    }
  };

  return (
    <div id="registerform">
      <h2 id="registerheaderTitle">Sign up</h2>
      <div>
        <div className="row">
          <label>FirstName</label>
          <input
            type={"FirstName"}
            placeholder={"Enter your FirstName"}
            ref={firstName}
          />
        </div>
        <div className="row">
          <label>LastName</label>
          <input
            type={"LastName"}
            placeholder={"Enter your LastName"}
            ref={lastName}
          />
        </div>
        <div className="row">
          <label>Email</label>
          <input
            type={"text"}
            placeholder={"Enter your email"}
            ref={emailField}
          />
        </div>
        <div className="row">
          <label>{"Password"}</label>
          <input
            type={"password"}
            placeholder={"Enter your password"}
            ref={passwordField}
          />
        </div>
        <div id="button" className="row">
          <button onClick={registerHandler}>Sign up</button>
        </div>
      </div>
    </div>
  );
}
