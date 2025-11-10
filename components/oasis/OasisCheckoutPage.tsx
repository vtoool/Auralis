
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import AnimatedSection from '../AnimatedSection';

const OasisCheckoutPage: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // This is a mock checkout. In a real app, you would process payment here.
        setIsSubmitted(true);
        clearCart();
    };

    if (isSubmitted) {
        return (
            <div className="py-24 bg-background">
                <div className="container mx-auto px-6 text-center">
                    <AnimatedSection>
                        <h1 className="font-display text-4xl text-primary font-bold mb-4">Thank You for Your Order!</h1>
                        <p className="text-text-secondary text-lg mb-8">A confirmation email has been sent. Your items will be shipped shortly.</p>
                        <a href="#/shop" className="px-8 py-3 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                            Continue Shopping
                        </a>
                    </AnimatedSection>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="py-24 bg-background">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="font-display text-4xl text-primary font-bold mb-4">Your Cart is Empty</h1>
                    <p className="text-text-secondary text-lg mb-8">Browse our shop to find tools for your journey.</p>
                    <a href="#/shop" className="px-8 py-3 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                        Go to Shop
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="py-24 bg-primary-light">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <h1 className="font-display text-5xl font-bold text-primary text-center mb-12">Checkout</h1>
                </AnimatedSection>
                <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                    <AnimatedSection delay={100}>
                        <div className="bg-card-background p-8 shadow-lg rounded-sm">
                            <h2 className="font-display text-2xl text-primary font-semibold border-b border-border-color pb-4 mb-4">Your Order</h2>
                            <div className="space-y-4 mb-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between items-center text-text-secondary">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between font-bold text-lg text-primary border-t border-border-color pt-4">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </AnimatedSection>
                     <AnimatedSection delay={200}>
                        <div className="bg-card-background p-8 shadow-lg rounded-sm">
                            <h2 className="font-display text-2xl text-primary font-semibold mb-6">Shipping & Payment</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input type="text" placeholder="Full Name" required className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" />
                                <input type="email" placeholder="Email Address" required className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" />
                                <input type="text" placeholder="Shipping Address" required className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" />
                                <input type="text" placeholder="Card Number (mock)" required className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" />
                                <div className="flex gap-4">
                                    <input type="text" placeholder="MM/YY" required className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" />
                                    <input type="text" placeholder="CVC" required className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" />
                                </div>
                                <button type="submit" className="w-full mt-4 p-4 font-semibold rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
                                    Place Order
                                </button>
                            </form>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
};

export default OasisCheckoutPage;
