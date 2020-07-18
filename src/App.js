import React, { useContext, useEffect } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/Register";
import Profiles from "./pages/profiles/Profiles";
import Profile from "./pages/Profile/Profile";
import Navigation from "./components/navigation/Navigation";
import { Context } from "./state/reducer";
import EditResume from "./pages/EditResume/EditResume";
import { SetToken, SetId } from "./state/actions";

function App() {
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    if (token != "NONE" && id != "NONE") {
      dispatch(SetToken(token));
      dispatch(SetId(id));
    }
  }, []);
  return (
    <div className="app">
      <header>
        <Navigation></Navigation>{" "}
      </header>
      <Route path="/users" exact>
        <Profiles></Profiles>
      </Route>
      <Route path="/login">
        <div style={{ height: "70px" }} />
        <Login />
      </Route>
      <Route path="/register">
        <div style={{ height: "70px" }} />
        <Register />
      </Route>
      <Switch>
        <Route path="/users/:id">
          <Profile></Profile>
        </Route>
      </Switch>
      <Route path="/edit">
        {state.token ? <EditResume /> : <Redirect to="/login"></Redirect>}
      </Route>
    </div>
  );
}

export default App;
