import React, { useState } from "react";
import productos from "../productos.json";
import productosDeporte from "../productosDeporte.json";
import ProductModal from "./ProductModal";

export const ProductList = ({
    allProducts = [],
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal,
}) => {
    const [showFullDescripcion, setShowFullDescripcion] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setModalIsOpen(false);
    };

    const onAddProduct = product => {
        if (Array.isArray(allProducts) && allProducts.find(item => item.id === product.id)) {
            const products = allProducts.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setTotal(total + product.price * product.quantity);
            setCountProducts(countProducts + product.quantity);
            return setAllProducts([...products]);
        }

        setTotal(total + product.price * product.quantity);
        setCountProducts(countProducts + product.quantity);
        setAllProducts([...allProducts, product]);
    };

    const toggleDescipcion = () => {
        setShowFullDescripcion(!showFullDescripcion);
    };

    return (
        <div className='container-items'>
            {productos.map((product) => (
                <div className='item' key={product.id}>
                    <figure>
                        <img src={product.urlImage} alt={product.title} onClick={() => openModal(product)} />
                    </figure>
                    <div className='info-product'>
                        <h2 className='titulo-producto-carrito'>{product.title}</h2>
                        <p className="descipcion-producto">{product.fullDescripcion || product.summary}</p>
                        <p className='price'>${product.price}</p>
                        <button onClick={() => onAddProduct(product)}>Anadir al carrito</button>
                    </div>
                </div>
            ))}
            {productosDeporte.map((product) => (
                <div className='item' key={product.id}>
                <figure>
                    <img src={product.urlImage} alt={product.title} onClick={() => openModal(product)} />
                </figure>
                <div className='info-product'>
                    <h2 className='titulo-producto-carrito'>{product.title}</h2>
                    <p className="descipcion-producto">{product.fullDescripcion || product.summary}</p>
                    <p className='price'>${product.price}</p>
                    <button onClick={() => onAddProduct(product)}>Anadir al carrito</button>
                </div>
            </div>
            ))}
            <ProductModal isOpen={modalIsOpen} onClose={closeModal} product={selectedProduct}/>
        </div>
    );
};