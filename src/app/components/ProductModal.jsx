import React from "react";

const ProductModal = ({isOpen, onClose, product }) => {
    if (!isOpen || !product) return null;
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{product.title}</h2>
                <p>{product.summary}</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default ProductModal;