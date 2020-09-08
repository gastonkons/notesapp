import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CreateUser.css";
import Loading from "../../assets/images/loading.gif";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function CreateUser() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusRes, setStatusRes] = useState(false);
  const URL = "https://safe-scrubland-91703.herokuapp.com/api";

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(URL + "/users").catch((err) => {
        return { statusText: "ERROR" };
      });
      if (res.statusText === "OK") {
        setUsers(res.data);
        setStatusRes(true);
      } else if (res.statusText === "ERROR") {
        setStatusRes(false);
      }

      setLoading(false);
    }

    fetchData();
  }, [loading]);

  async function createUsername() {
    let create = userValidate();

    if (create) {
      await axios
        .post(URL + "/users", { username: username })
        .then((res) => console.log("Usuario creado" + res))
        .catch((err) => console.log(err));
    }
  }

  const userValidate = () => {
    const paragraph = document.querySelector(".form-message");
    paragraph.innerHTML = "";
    if (username === "") {
      paragraph.innerHTML = "* The field is empty";
      return false;
    }
    paragraph.style.color = "green";
    paragraph.innerHTML = "User created";
    return true;
  };

  const confirmDeleteUser = async (id) => {
    confirmAlert({
      message: "¿Estás seguro que quieres eliminarlo?",
      buttons: [
        {
          label: "No",
          onClick: () => {},
        },
        {
          label: "Si, quiero hacerlo",
          onClick: () => deleteUser(id),
        },
      ],
    });
  };

  const deleteUser = async (id) => {
    await axios.delete(URL + "/users/" + id);
    setLoading(true);
  };

  return (
    <div className="content">
      <div className="createUser">
        <div className="createUser-form">
          <h3 className="title">Create New User:</h3>
          <form>
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <button className="form-btn" onClick={createUsername}>
                Create
              </button>
              <p className="form-message"></p>
            </div>
          </form>
        </div>
        <div className="createUser-list">
          <h3 className="title">Users:</h3>

          {loading ? (
            <div className="loading-container">
              <img src={Loading} alt="Loading.." />
            </div>
          ) : statusRes ? (
            <ul className="createUser-list-ul">
              {users.map((user) => (
                <li className="createUser-list-li" key={user._id}>
                  {user.username}
                  <span
                    className="createUser-list-icon"
                    onClick={() => confirmDeleteUser(user._id)}
                  ></span>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              Los usuarios no se han podido cargar..{" "}
              <Link to="/user" onClick={() => setLoading(true)}>
                Volver a intentar
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
