import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import Home from "./home";

class App extends React.Component {
  render() {
    if (window.localStorage.getItem('cartProducts') === null) {
      window.localStorage.setItem('cartProducts', JSON.stringify([]));
    }
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} component={Home}/>
            <Route exact path={"/users/sign_in"} component={SignIn}/>
            <Route exact path={"/users/sign_up"} component={SignUp}/>
            {/*{ (localStorage.getItem("isLogin") === null) &&*/}
            {/*    <>*/}
            {/*      <Route exact path={"/users/sign_in"} component={SignIn}/>*/}
            {/*      <Route exact path={"/users/sign_up"} component={SignUp}/>*/}
            {/*    </>*/}
            {/*}*/}
          </Switch>
        </BrowserRouter>
    )
  }
}

export default App