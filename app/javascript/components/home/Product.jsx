import React, {useState, useEffect} from "react";
import {currentUser} from "../../constants";

export default function Product(props) {
  let cartProducts = JSON.parse(window.localStorage.getItem("cartProducts"));
  const [item, setItem] = useState({});
  const addProductToCart = (product) => {
    cartProducts.push({...product, userId: currentUser.id});
    setItem({...product, userId: currentUser.id});
    window.localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    props.setCheckoutAllProducts(true)
  };
  
  const cartProduct = cartProducts.find(x => x.userId === currentUser.id && x.id === props.product.id);
  
  return (
      <div key={props.product.id} className="card border-0 p-1">
        <div className="html-card">
          <img className="product-image" height={200} src={ props.product.image_url } alt="Card image cap" />
        </div>
      
        <div className="card-body">
          <h5 className="card-title blog-name"> { props.product.name } </h5>
          <div className="blog-type"> Price: { props.product.price } </div>
          <div className="blog-type"> Quantity: { props.product.quantity } </div>
          <button className="btn btn-primary float-right" onClick={() => addProductToCart(props.product)} disabled={cartProduct ? true : false}> Add to cart </button>
        </div>
      </div>
  )
}