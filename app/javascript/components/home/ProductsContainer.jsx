import React, {useEffect, useState} from "react";
import {productIndexUrl, createOrderUrl} from "../../urls/base-urls"
import axios from "axios";
import {currentUser} from "../../constants";
import Product from "./Product";
import {useHistory} from "react-router-dom"

export default function ProductsContainer() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [checkoutAllProducts, setCheckoutAllProducts] = useState(false);
  
  useEffect(() => {
    axios.get(productIndexUrl, {
      headers: {
        'Accept': 'application/json'
      }
    })
        .then(response => {
          if (response.data.success === true) {
            setProducts(response.data.data);
          }
        });
    
  }, []);
  
  let cartProducts = JSON.parse(window.localStorage.getItem("cartProducts"));
  const cartItems = cartProducts.filter(x => x.userId === currentUser.id);
  const cartItemsIds = cartProducts.map(item => item.id);
  let disabledClass = true;
  if (cartItems.length > 0) {
    disabledClass = false;
  }
  
  const checkoutProducts = () => {
    let order_items_attributes = [];
  
    cartItemsIds.map(id => order_items_attributes.push({product_id: id}));
    
    axios.post(`/api/v1/users/${currentUser.id}/orders`, {order: {order_items_attributes: order_items_attributes}}, {
      headers: {
        'Accept': 'application/json'
      }
    })
        .then(response => {
          if (response.data.success === true) {
            const filterCartProducts = cartProducts.filter(x => x.userId !== currentUser.id && !(x.id in cartItemsIds));
            window.localStorage.setItem("cartProducts", JSON.stringify(filterCartProducts));
            setCheckoutAllProducts(false);
          }
        });
  };
  
  return (
      <div className="products-container">
        <div className="container">
          <div className="primary-color d-flex align-items-center justify-content-center">
            <div className="jumbotron jumbotron-fluid bg-transparent">
              <div className="secondary-color">
                <h1 className="display-4">Products</h1>
                <hr className="my-4 mb-4"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button className="btn btn-primary float-right" onClick={() => checkoutProducts()} disabled={disabledClass}> Checkout Products </button>
              <br/><br/>
            </div>
            {products.map((product, index) =>
                <div  key={ index } className="col-12 col-sm-6 col-md-4 p-3">
                  <Product product={product} setCheckoutAllProducts={setCheckoutAllProducts}/>
                </div>)}
          </div>
        </div>
      </div>
  )
}