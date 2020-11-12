import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import './Header.css';

const CURRENCY_QUERY = gql`
  {
    currency
  }`;

function CurrencyFilter(props) {

  function ChangeCurrency() {
    let currency = document.getElementById("currency").value;
    props.context.setCurrency(currency);
    props.showSideMenu();
  }

  const { data, loading, error } = useQuery(CURRENCY_QUERY);

  if (loading) return (
    <select>
      <option>Loading...</option>
    </select>
  );
  if (error) return (
    <select>
      <option>No Currency was fetched</option>
    </select>
  );
  const currencies = data.currency;
  return (
    <select id="currency" onChange={ChangeCurrency}>
      {currencies.map((currency, index) =>
        <option key={index} value={currency}>{currency}</option>
      )};
    </select>
  );
}

function currencyFormat(amount) {
  try {
    if (amount % 1 === 0) {
      return (amount).toLocaleString() + ".00";
    }
    return (amount).toLocaleString();
  }
  catch (error) {
    return (0).toLocaleString() + ".00";
  }
}

// Cart list functional component
function SideBar(props) {
  const PRODUCT_QUERY = gql`
  {
    products {
      id,
      title,
      image_url,
      price(currency:${props.context.state.currency}),
    }
  }
`;
  const { data, loading, error } = useQuery(PRODUCT_QUERY);
  if (loading) return (
    <div className="cart-lower">
      <div className="cart-message">
        <p>Loading...</p>
      </div>
    </div>

  );
  if (error) return (
    <div className="cart-lower">
      <div className="cart-message">
        <p>An error occured. Please reload page</p>
      </div>
    </div>
  );
  const products = data.products;

  let cartItems = props.cartItems;
  if(cartItems.length === 0) {
    return (
      <div className="cart-lower">
        <div className="cart-message">
          <p>There are no items in your cart.</p>
        </div>
      </div>
    );
  }
  cartItems.forEach(Item => {
    Item.price = products.filter(product => product.id === Item.id)[0].price;
  });
  let subtotal = 0;
  cartItems.forEach(item => subtotal += item.price * item.quantity);
  return (
    <div className="cart-lower">
      <CartList
        context={props.context}
        cartItems={cartItems}
        increaseQuantity={props.increaseQuantity}
        reduceQuantity={props.reduceQuantity}
        removeItemFromCart={props.removeItemFromCart}
      />
      <div className="cart-footer">
        <div className="cart-subtotal">
          <p>Subtotal:</p>
          <p>{props.context.state.currency} {currencyFormat(subtotal)}</p>
        </div>
        <button>PROCEED TO CHECKOUT</button>
      </div>
    </div>
  );
}

// Cart list functional component
function CartList(props) {
  let cartItems = props.cartItems;
  return (
    <div className="cart-list">
      {/* Cart Lists Component */}
      {cartItems.map((item, index) =>
        <div className="cart-item" key={index}>
          <div className="cart-details">
            <p>{item.name}</p>
            <div className="cart-quantity">
              <span onClick={() => props.reduceQuantity(item.id)}>-</span>
              <span>{item.quantity}</span>
              <span onClick={() => props.increaseQuantity(item.id)}>+</span>
            </div>
          </div>
          <div className="cart-item-price">
            <span>{props.context.state.currency} {currencyFormat(item.price)}</span>
          </div>
          <div className="cart-item-img">
            <img src={item.image} alt={item.name} />
            <div className="cancel" onClick={() => props.removeItemFromCart(item.id)}>X</div>
          </div>
        </div>
      )}
    </div>
  );
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cartItems: [],
      subTotal: 0
    }
  }

  showSideMenu = () => {
    document.getElementById("side-back").style.display = "block";
    setTimeout(function () {
      document.getElementById("side-menu").style.right = "0%";
    }, 100);
    const body = document.body;
    body.style.height = '100vh';
    body.style.overflowY = 'hidden';
  }

  hideSideMenu = () => {
    document.getElementById("side-menu").style.right = "-40%";
    setTimeout(function () {
      document.getElementById("side-back").style.display = "none";
    }, 200);
    const body = document.body;
    body.style.height = '100%';
    body.style.overflowY = 'auto';
  }

  addToCart = (product) => {
    let Items = this.state.cartItems;
    let check = Items.filter(cartItem => cartItem.id === product.id);
    if (check.length === 0) {
      Items.push({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image_url,
        quantity: 1
      })
    }
    else {
      Items.filter(Item => Item.id === product.id).map(item => item.quantity += 1);
    }
    this.setState({ cartItems: Items });
    this.showSideMenu();
  }

  increaseQuantity = (cartid) => {
    let Items = this.state.cartItems;
    Items.filter(Item => Item.id === cartid).map(item => item.quantity += 1);
    this.setState({ cartItems: Items });
  }

  reduceQuantity = (cartid) => {
    let Items = this.state.cartItems;
    let item = Items.find(Item => Item.id === cartid);
    if (item.quantity > 1) {
      Items.filter(Item => Item.id === cartid).forEach(item => {
        item.quantity -= 1;
      });
      this.setState({ cartItems: Items });
    }
    else if(item.quantity === 1) {
      this.removeItemFromCart(item.id);
    }
    
    
  }

  removeItemFromCart = (cartid) => {
    let Items = this.state.cartItems;
    let newItems = Items.filter(Item => Item.id !== cartid);
    this.setState({ cartItems: newItems });
  }

  render() {
    return (
      <div className="header">
        <div className="top" id="top">
          <div className="logo-img">
            <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" />
          </div>
          <div className="cart-img" onClick={this.showSideMenu}>
            <img src={process.env.PUBLIC_URL + '/images/shopping-cart.png'} alt="cart" />
            <div className="cart-no">{this.state.cartItems.length}</div>
          </div>
        </div>
        <div className="side-background" id="side-back">
          <div className="side-con" id="side-menu">
            <div className="side-top">
              <p>YOUR CART</p>
              <div className="close" onClick={this.hideSideMenu}>
                <img src={process.env.PUBLIC_URL + '/images/right-arrow.png'} alt="cart" />
              </div>
            </div>
            <div className="currency-filter">
              <CurrencyFilter context={this.props.context} showSideMenu={this.showSideMenu} />
            </div>
            <SideBar
              context={this.props.context}
              cartItems={this.state.cartItems}
              increaseQuantity={this.increaseQuantity}
              reduceQuantity={this.reduceQuantity}
              removeItemFromCart={this.removeItemFromCart}
            />
          </div>
        </div>
      </div>

    );
  }


}

export default Header;
