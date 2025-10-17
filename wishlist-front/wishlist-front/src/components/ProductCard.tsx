import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
  isSaved: boolean;
  onToggle: (product: Product) => void;
}

export default function ProductCard({ product, isSaved, onToggle }: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} width={150} />
      <h3>{product.name}</h3>
      <p>R$ {(Number(product.priceInCents) / 100).toFixed(2)}</p>
      <button onClick={() => onToggle(product)}>
        {isSaved ? "Remover" : "Salvar na Wishlist"}
      </button>
    </div>
  );
}
