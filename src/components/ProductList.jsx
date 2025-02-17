import React from 'react';

const ProductList = ({ products }) => {

  React.useEffect(() => {
    console.log("PRODUCTS products", products.results);
  }, [products])
  return (
    <div className='grid grid-cols-3'>
      {products.map((product) => (
        <div className="product-card" style={styles.card} key={product.asin}>
          <img src={product.imgUrl} alt={product.title} style={styles.image} />
          <h3 style={styles.title}>{product.title}</h3>
          <p style={styles.price}>
            Price: ${product.price} <span style={styles.listPrice}>(${product.listPrice})</span>
          </p>
          <p style={styles.stars}>Stars: {product.stars} ⭐</p>
          <p style={styles.reviews}>Reviews: {product.reviews}</p>
          <p style={styles.bestseller}>{product.isBestSeller ? "Best Seller" : "Not a Best Seller"}</p>
          <p style={styles.boughtInLastMonth}>Bought in last month: {product.boughtInLastMonth}</p>
          <a href={product.productURL} target="_blank" rel="noopener noreferrer" style={styles.link}>View Product</a>
        </div>
      ))}
    </div>
  );
};

// Basic styles for the component
const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    textAlign: 'center',
    width: '250px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
  title: {
    fontSize: '1.2em',
    margin: '10px 0',
  },
  price: {
    fontSize: '1.1em',
    color: '#333',
  },
  listPrice: {
    textDecoration: 'line-through',
    color: '#999',
  },
  stars: {
    color: '#FFD700',
  },
  reviews: {
    color: '#555',
  },
  bestseller: {
    fontWeight: 'bold',
    color: 'green',
  },
  boughtInLastMonth: {
    color: '#555',
  },
  link: {
    display: 'inline-block',
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#007BFF',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
  },
};

export default ProductList;