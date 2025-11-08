export default function ProductCard({ product, onCustomize }) {
  const img = product?.images?.[0] || product?.image || '';
  const price = product?.price ?? product?.variants?.[0]?.price ?? '';

  return (
    <div className="product-card">
      <div className="product-thumb">
        {img ? <img src={img} alt={product?.name || 'Product'} /> : <div className="thumb-placeholder" />}
      </div>
      <div className="product-info">
        <div className="product-name">{product?.name}</div>
        {price !== '' && <div className="product-price">{typeof price === 'number' ? `$${price.toFixed(2)}` : price}</div>}
      </div>
      <button className="secondary" onClick={() => onCustomize(product?.id)}>Start Customizing</button>
    </div>
  );
}


