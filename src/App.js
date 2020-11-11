import './App.css';
import Header from './components/Header/Header';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const PRODUCT_QUERY = gql`
  {
    products {
      id,
      title,
      image_url,
      price(currency:USD),
    }
  }
`

function App() {

  const { data, loading, error } = useQuery(PRODUCT_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const products = data.products;

  const productList = <div className="product-list">
  {products.map((product, index) =>
    <div key={index} className="product-item">
      <img src={product.image_url} alt={product.title} />
      <p className="product-title">{product.title}</p>
      <p className="product-price">From ${product.price}</p>
      <button onClick={() => console.log(product.id)}>Add to Cart</button>
    </div>
  )}
</div>;

  return (
    <div className="content">
      <Header/>
      <div>
        <div className="title">
          <p>All Products</p>
          <p>A 360° look at Lumin</p>
        </div>
        {productList}
      </div>
    </div>
  );
}

export default App;
