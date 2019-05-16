import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./pages/home";
import Dashboard from "./pages/dashboard";
import Callback from "./pages/callback";
import Book from "./pages/book";
import Auth from "./components/Auth";
import CreateRestaurant from "./pages/restaurant/create";
import EditRestaurant from "./pages/restaurant/edit";
import DetailRestaurant from "./pages/restaurant/detail";
import withStyle from "react-jss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const styles = {
  container: {
    width: "100%",
    height: "100%"
  }
};

class App extends Component {
  render() {
    //1
    return (
      <div className={this.props.classes.container}>
        <ToastContainer />
        <Auth>
          <Router>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/book/:id" component={Book} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route
                path="/dashboard/restaurant/create"
                component={CreateRestaurant}
              />
              <Route
                path="/dashboard/restaurant/edit/:id"
                component={EditRestaurant}
              />
              <Route
                path="/dashboard/restaurant/details/:id"
                component={DetailRestaurant}
              />
              <Route path="/callback" component={Callback} />
            </Switch>
          </Router>
        </Auth>
      </div>
    );
  }
}

export default withStyle(styles)(App);
