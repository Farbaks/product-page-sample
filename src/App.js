import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import { CurrencyContextConsumer } from './CurrencyContextProvider';

function currencyFormat(amount) {
  try {
    if (amount % 1 == 0) {
      return (amount).toLocaleString() + ".00";
    }
    return (amount).toLocaleString();
  }
  catch (error) {
    return (0).toLocaleString() + ".00";
  }
}

// Product list functional component
function ProductList(props) {
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
    <div className="message">
      <p>Loading...</p>
    </div>
  );
  if (error) return (
    <div className="message">
      <p>An error occured. Please reload page.</p>
    </div>
  );
  const products = data.products;
  return (
    <div className="product-list">
      {products.map((product, index) =>
        <div key={index} className="product-item">
          <img src={product.image_url} alt={product.title} />
          <p className="product-title">{product.title}</p>
          <p className="product-price">From {props.context.state.currency} {currencyFormat(product.price)}</p>
          <button onClick={() => props.addToCart(product)}>Add to Cart</button>
        </div>
      )}
    </div>
  );
}

// Main component
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    }
    this.child = React.createRef();
  }

  addToCart = (product) => {
    this.child.current.addToCart(product);
  }

  render() {
    return (
      <div className="content">
        {/* Header and Side bar Component */}
        <CurrencyContextConsumer>
          {context => (
            <Header context={context} ref={this.child} />
          )}
        </CurrencyContextConsumer>

        <div>
          <div className="title">
            <p>All Products</p>
            <p>A 360° look at Lumin</p>
          </div>
          {/* React context to store selected currency */}
          <CurrencyContextConsumer>
            {context => (
              // Product Lists Component
              <ProductList context={context} addToCart={this.addToCart} />
            )}
          </CurrencyContextConsumer>
        </div>
      </div>
    );
  }
}

export default App;
