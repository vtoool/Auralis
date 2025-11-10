
import React, { useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';

const OasisCart: React.FC = () => {
    const { isCartOpen, toggleCart, setCartOpen, cartItems, cartTotal, removeFromCart } = useCart();
    const cartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setCartOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setCartOpen]);
    
    return (
        <div className={`fixed inset-0 z-[100] transition-all duration-300 ${isCartOpen ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent pointer-events-none'}`}>
            <div
                ref={cartRef}
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-card-background shadow-elegant-lg transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex justify-between items-center p-6 border-b border-border-color">
                    <h2 className="font-display text-2xl text-primary font-semibold">Your Cart</h2>
                    <button onClick={toggleCart} className="p-2 rounded-full text-text-secondary hover:bg-border-color">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                {cartItems.length > 0 ? (
                    <>
                        <div className="flex-grow p-6 space-y-4 overflow-y-auto">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center space-x-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-sm" />
                                    <div className="flex-grow">
                                        <p className="font-semibold text-text-primary">{item.name}</p>
                                        <p className="text-sm text-text-secondary">{item.quantity} x ${item.price.toFixed(2)}</p>
                                    </div>
                                    <p className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                                    <button onClick={() => removeFromCart(item.id)} className="text-text-secondary hover:text-red-500 p-1">
                                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 border-t border-border-color">
                            <div className="flex justify-between text-lg font-bold text-primary mb-4">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <a href="#/checkout" onClick={toggleCart} className="block w-full text-center p-3 font-semibold rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-300">
                                Proceed to Checkout
                            </a>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                        <p className="text-text-secondary text-lg">Your cart is empty.</p>
                        <a href="#/shop" onClick={toggleCart} className="mt-4 px-6 py-2 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                           Start Shopping
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OasisCart;
