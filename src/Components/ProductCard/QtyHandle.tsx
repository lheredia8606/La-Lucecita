import "./QtyHandle.css";
export const QtyHandle = () => {
  return (
    <div className="qty-selector">
      <button className="qty-btn decrease">−</button>
      <input type="number" className="qty-input" />
      <button className="qty-btn increase">+</button>
    </div>
  );
};
