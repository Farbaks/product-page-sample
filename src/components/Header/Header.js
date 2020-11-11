import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = () => (
  <div className="header">
    <div className="top" id="top">
      <div className="logo-img">
        <img src={process.env.PUBLIC_URL+'/images/logo.png'} alt="logo" />
      </div>
      <div className="cart-img">
        <img src={process.env.PUBLIC_URL+'/images/shopping-cart.png'} alt="cart" />
        <div className="cart-no">99</div>
      </div>
    </div>  
    <div className="side-background">
      <div className="side-con">
          <div className="side-top">
              <p>YOUR CART</p>
              <div className="close">
                <img src={process.env.PUBLIC_URL+'/images/right-arrow.png'} alt="cart" />
              </div>
          </div>
          <div className="currency-filter">
            <select>
              <option>USD</option>
            </select>
          </div>
          <div className="cart-list">
            <div className="cart-item">
              <div className="cart-details">
                <p>Age Management Set</p>
                <div className="cart-quantity">
                  <span>-</span>
                  <span>1</span>
                  <span>+</span>
                </div>
              </div>
              <div className="cart-item-price">
                <span>$10.00</span>
              </div>
              <div className="cart-item-img">
                <img src={process.env.PUBLIC_URL+'/images/sample4.png'} alt="cart" />
                <div className="cancel">X</div>
              </div> 
            </div>
            <div className="cart-item">
              <div className="cart-details">
                <p>Age Management Set</p>
                <div className="cart-quantity">
                  <span>-</span>
                  <span>1</span>
                  <span>+</span>
                </div>
              </div>
              <div className="cart-item-price">
                <span>$10.00</span>
              </div>
              <div className="cart-item-img">
                <img src={process.env.PUBLIC_URL+'/images/sample4.png'} alt="cart" />
                <div className="cancel">X</div>
              </div> 
            </div>
            <div className="cart-item">
              <div className="cart-details">
                <p>Age Management Set</p>
                <div className="cart-quantity">
                  <span>-</span>
                  <span>1</span>
                  <span>+</span>
                </div>
              </div>
              <div className="cart-item-price">
                <span>$10.00</span>
              </div>
              <div className="cart-item-img">
                <img src={process.env.PUBLIC_URL+'/images/sample4.png'} alt="cart" />
                <div className="cancel">X</div>
              </div> 
            </div>
            <div className="cart-item">
              <div className="cart-details">
                <p>Age Management Set</p>
                <div className="cart-quantity">
                  <span>-</span>
                  <span>1</span>
                  <span>+</span>
                </div>
              </div>
              <div className="cart-item-price">
                <span>$10.00</span>
              </div>
              <div className="cart-item-img">
                <img src={process.env.PUBLIC_URL+'/images/sample4.png'} alt="cart" />
                <div className="cancel">X</div>
              </div> 
            </div>
          </div>
          <div className="cart-footer">
            <div className="cart-subtotal">
              <p>Subtotal:</p>
              <p>$100.00</p>
            </div>
            <button>PROCEED TO CHECKOUT</button>
          </div>
      </div>
    </div>
  </div>
);

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
