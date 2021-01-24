import React from "react";
import SignIn from "../user/SignIn";
import Header from "../Header";
import ProductsContainer from "./ProductsContainer";

export default function Home() {
  
  if (localStorage.getItem("isLogin") === null) {
    return ( <SignIn /> )
  } else {
    return (
        <>
          <Header />
          <ProductsContainer />
        </>
    )
  }
}