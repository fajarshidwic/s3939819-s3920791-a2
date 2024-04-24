import React, { useState } from "react";
import blueImage from "../images/bluberry.jpg";
import carrotImage from "../images/carrots.jpg";
import cheeseImage from "../images/cheese.jpg";
import dragonfruitImage from "../images/dragonfruit.jpg";
import honeyImage from "../images/honey.jpg";
import pepperImage from "../images/pepper.jpg";
import pineappleImage from "../images/pineapple.jpg";
import pomeImage from "../images/promegran.jpg";
import riceImage from "../images/rice.jpg";
import waterImage from "../images/watermelon.jpg";
import "./Shop.css";


function Shop() {
  const [cartItems, setCartItems] = useState([]);

  const addToCartClicked = (title, price, imageSrc) => {
    const newItem = { title, price, imageSrc };
    setCartItems([...cartItems, newItem]);
  };

  const removeCartItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const updateCartTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += parseFloat(item.price.replace('$', '')) * item.quantity;
    });
    return total.toFixed(2);
  };

  const purchaseClicked = () => {
    alert('Thank you for your purchase!!!');
    setCartItems([]);
  };

  const quantityChanged = (index, quantity) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = quantity;
    setCartItems(newCartItems);
  };

  return (
    <div>
      <h2>Start Shopping</h2>
      <p>You can add to your cart</p>
      <section id="product-cards">

      <div class ="flex-container">
      <div class=" col filter-item all new ">
          <div class="card h-100">
          <img src={carrotImage} alt="Green Beans"/>
              <div class="card-body">
                  <h5 class="card-title shop-item-title">Carrot</h5>
                  <p class="card-text shop-item-price"> $5.00</p>
                  <button type="button" className="btn btn-warning mt-auto shop-item-button" onClick={() => addToCartClicked('Carrot', '$5.00', {carrotImage})}>
                      <i className="fa-solid fa-cart-shopping "></i>Add To Cart
                  </button>
              </div>
          </div>
      </div>

      <div class=" col filter-item all new">
          <div class="card h-100">
          <img src={pepperImage} alt="Green Beans"/>
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title shop-item-title">Pepper</h5>
                  <p class="card-text shop-item-price"> $5.00</p>
                  <button type="button" className="btn btn-warning mt-auto shop-item-button" onClick={() => addToCartClicked('Pepper', '$5.00', {pepperImage})}>
                      <i className="fa-solid fa-cart-shopping "></i>Add To Cart
                  </button>
              </div>
          </div>
      </div>

      <div class=" col filter-item all new">
          <div class="card h-100">
          <img src={pineappleImage} alt="Green Beans"/>
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title shop-item-title">Pineapple</h5>
                  <p class="card-text shop-item-price">$12.00</p>
                  <button type="button" className="btn btn-warning mt-auto shop-item-button" onClick={() => addToCartClicked('Pineapple', '$12.00', {pineappleImage})}>
                      <i className="fa-solid fa-cart-shopping "></i>Add To Cart
                  </button>
              </div>
          </div>
      </div>

      <div class=" col filter-item all new">
          <div class="card h-100">
          <img src={dragonfruitImage} alt="Green Beans"/>
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title shop-item-title">Dragonfruit</h5>
                  <p class="card-text shop-item-price">$10.00</p>
                  <button type="button" className="btn btn-warning mt-auto shop-item-button" onClick={() => addToCartClicked('Dragonfruit', '$10.00', {dragonfruitImage})}>
                      <i className="fa-solid fa-cart-shopping "></i>Add To Cart
                  </button>
              </div>
          </div>
      </div>

      <div class=" col filter-item all new">
          <div class="card h-100">
          <img src={honeyImage} alt="Green Beans"/>
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title shop-item-title">Honey</h5>
                  <p class="card-text shop-item-price">$4.00</p>
                  <button type="button" className="btn btn-warning mt-auto shop-item-button" onClick={() => addToCartClicked('Honey', '$4.00', {honeyImage})}>
                      <i className="fa-solid fa-cart-shopping "></i>Add To Cart
                  </button>
              </div>
          </div>
      </div>

      <div class=" col filter-item all new">
          <div class="card h-100">
          <img src={waterImage} alt="Green Beans"/>
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title shop-item-title">Watermelon</h5>
                  <p class="card-text shop-item-price">$7.00</p>
                  <button type="button" className="btn btn-warning mt-auto shop-item-button" onClick={() => addToCartClicked('Watermelon', '$7.00', {waterImage})}>
                      <i className="fa-solid fa-cart-shopping "></i>Add To Cart
                  </button>
              </div>
          </div>
      </div>

      <div class=" col filter-item all new">
          <div class="card h-100">
          <img src={blueImage} alt="Green Beans"/>
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title shop-item-title">Blueberries</h5>
                  <p class="card-text shop-item-price">$5.00</p>
                  <button type="button" className="btn btn-warning mt-auto shop-item-button" onClick={() => addToCartClicked('Blueberries', '$5.00', {blueImage})}>
                      <i className="fa-solid fa-cart-shopping "></i>Add To Cart
                  </button>
              </div>
          </div>
      </div>

      <div class=" col filter-item all new">
          <div class="card h-100">
          <img src={cheeseImage} alt="Green Beans"/>
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title shop-item-title">Cheese</h5>
                  <p class="card-text shop-item-price">$10.00</p>
                  <button type="button" className="btn btn-warning mt-auto shop-item-button" onClick={() => addToCartClicked('Cheese', '$10.00', {cheeseImage})}>
                      <i className="fa-solid fa-cart-shopping "></i>Add To Cart
                  </button>
              </div>
          </div>
      </div>

      <div class=" col filter-item all new">
          <div class="card h-100">
          <img src={riceImage} alt="Green Beans"/>
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title shop-item-title">Rice</h5>
                  <p class="card-text shop-item-price">$20.00</p>
                  <button type="button" className="btn btn-warning mt-auto shop-item-button" onClick={() => addToCartClicked('Rice', '$20.00', {riceImage})}>
                      <i className="fa-solid fa-cart-shopping "></i>Add To Cart
                  </button>
              </div>
          </div>
      </div>

      <div class=" col filter-item all new">
          <div class="card h-100">
          <img src={pomeImage} alt="Green Beans"/>
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title shop-item-title">Pomegranate</h5>
                  <p class="card-text shop-item-price"> $10.00</p>
                  <button type="button" className="btn btn-warning mt-auto shop-item-button" onClick={() => addToCartClicked('Pomegranate', '$10.00', {pomeImage})}>
                      <i className="fa-solid fa-cart-shopping "></i>Add To Cart
                  </button>
              </div>
          </div>
      </div>

  </div>

      </section>
      <section className="container content-section" id="shopping-cart">
        <h3>Shopping Cart</h3>
        <table className="table table-hover table-cart">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="cart-items">
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>
                  <img className="cart-item-image" src={item.imageSrc} width="50" height="50" alt="Product" />
                  <span className="cart-item-title">{item.title}</span>
                </td>
                <td className="cart-price">{item.price}</td>
                <td>
                  <input 
                    className="cart-quantity-input" 
                    type="number" 
                    value={item.quantity || 1} 
                    min="1" 
                    onChange={(e) => quantityChanged(index, parseInt(e.target.value))} 
                  />
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => removeCartItem(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cart-total"> 
          <strong className="cart-total-title">Total</strong>
          <span className="cart-total-price">$ {updateCartTotal()}</span>
        </div>
        <div className="btn-purchase">
          <button className="btn btn-dark btn-purchase" onClick={purchaseClicked}>PURCHASE</button>
        </div>
      </section>
    </div>
  );
}

export default Shop;
