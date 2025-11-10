
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import AnimatedSection from '../AnimatedSection';
import { useLanguage } from '../../context/LanguageContext';

const OasisCheckoutPage: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { t } = useLanguage();

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
                        <h1 className="font-display text-4xl text-primary font-bold mb-4">{t('oasis.checkout.thanks')}</h1>
                        <p className="text-text-secondary text-lg mb-8">{t('oasis.checkout.confirmation')}</p>
                        <a href="#/shop" className="px-8 py-3 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                            {t('oasis.checkout.continueShopping')}
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
                    <h1 className="font-display text-4xl text-primary font-bold mb-4">{t('oasis.checkout.emptyTitle')}</h1>
                    <p className="text-text-secondary text-lg mb-8">{t('oasis.checkout.emptyText')}</p>
                    <a href="#/shop" className="px-8 py-3 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                        {t('oasis.checkout.goToShop')}
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="py-24 bg-primary-light">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <h1 className="font-display text-5xl font-bold text-primary text-center mb-12">{t('oasis.checkout.title')}</h1>
                </AnimatedSection>
                <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                    <AnimatedSection delay={100}>
                        <div className="bg-card-background p-8 shadow-lg rounded-sm">
                            <h2 className="font-display text-2xl text-primary font-semibold border-b border-border-color pb-4 mb-4">{t('oasis.checkout.order')}</h2>
                            <div className="space-y-4 mb-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between items-center text-text-secondary">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between font-bold text-lg text-primary border-t border-border-color pt-4">
                                <span>{t('oasis.checkout.total')}</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </AnimatedSection>
                     <AnimatedSection delay={200}>
                        <div className="bg-card-background p-8 shadow-lg rounded-sm">
                            <h2 className="font-display text-2xl text-primary font-semibold mb-6">{t('oasis.checkout.shipping')}</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input type="text" placeholder={t('oasis.checkout.name')} required className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" />
                                <input type="email" placeholder={t('contact.email')} required className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" />
                                <input type="text" placeholder={t('oasis.checkout.address')} required className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" />
                                <input type="text" placeholder={t('oasis.checkout.card')} required className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" />
                                <div className="flex gap-4">
                                    <input type="text" placeholder={t('oasis.checkout.expiry')} required className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" />
                                    <input type="text" placeholder={t('oasis.checkout.cvc')} required className="w-full p-3 bg-background border-b-2 border-border-color focus:border-accent outline-none transition" />
                                </div>
                                <button type="submit" className="w-full mt-4 p-4 font-semibold rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
                                    {t('oasis.checkout.placeOrder')}
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
