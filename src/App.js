import './App.css';
import Header from './components/Header/Header';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import { CurrencyContextConsumer } from './CurrencyContextProvider';




function ProductList(props) {
  const PRODUCT_QUERY = gql`
  {
    products {
      id,
      title,
      image_url,
      price(currency:${props.currency}),
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
            <p className="product-price">From {props.currency} {product.price}</p>
            <button onClick={() => console.log(product.id)}>Add to Cart</button>
          </div>
        )}
    </div>
  );
}

function App() {
  return (
    <div className="content">
      <Header/>
      <div>
        <div className="title">
          <p>All Products</p>
          <p>A 360° look at Lumin</p>
        </div>
        <CurrencyContextConsumer>
          {context => (
            console.log(context.state.currency),
            <ProductList currency={context.state.currency} />
          )}
        </CurrencyContextConsumer>
        
      </div>
    </div>
  );
}

export default App;
