import React, { useState } from 'react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import AnimatedSection from '../AnimatedSection';
import { useLanguage } from '../../context/LanguageContext';

const productIds = [101, 102, 103, 104, 105, 106];
const mockProductPrices: { [key: number]: number } = {
    101: 45.00,
    102: 60.00,
    103: 30.00,
    104: 20.00,
    105: 35.00,
    106: 80.00
};
const mockProductImages: {[key: number]: string} = {
    101: 'https://picsum.photos/seed/crystals/400/400',
    102: 'https://picsum.photos/seed/diffuser-vase/400/400',
    103: 'https://picsum.photos/seed/mala-beads/400/400',
    104: 'https://picsum.photos/seed/sage-kit/400/400',
    105: 'https://picsum.photos/seed/elixir-oils/400/400',
    106: 'https://picsum.photos/seed/throw-blanket/400/400'
};


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart } = useCart();
    const { t } = useLanguage();
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (amount: number) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };

    return (
        <div className="bg-card-background shadow-elegant transition-all duration-300 hover:shadow-elegant-lg group rounded-2xl text-left flex flex-col overflow-hidden">
            <div className="h-64 overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-sans text-xl font-bold text-primary mb-1">{product.name}</h3>
                <p className="text-text-secondary text-sm mb-2">{product.description}</p>
                <p className="text-lg font-sans font-bold text-primary my-2">${product.price.toFixed(2)}</p>
                <div className="mt-auto flex items-stretch space-x-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-border-color rounded-lg">
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            className="px-3 py-2 text-primary hover:bg-primary-light rounded-l-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Decrease quantity"
                            disabled={quantity <= 1}
                        >
                            &ndash;
                        </button>
                        <span className="px-3 text-text-primary font-semibold text-center w-10 flex items-center justify-center border-x border-border-color" aria-live="polite">
                            {quantity}
                        </span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            className="px-3 py-2 text-primary hover:bg-primary-light rounded-r-lg transition-colors"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>
                    {/* Add to Cart Button */}
                    <button 
                        onClick={() => addToCart(product, quantity)}
                        className="flex-grow py-3 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors rounded-lg text-sm uppercase tracking-wider"
                    >
                        {t('oasis.shop.addButton')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const OasisShop: React.FC = () => {
    const { t } = useLanguage();

    const products: Product[] = productIds.map(id => ({
        id,
        name: t(`oasis.shop.products.${id}.name`),
        description: t(`oasis.shop.products.${id}.description`),
        price: mockProductPrices[id],
        imageUrl: mockProductImages[id]
    }));
    
    return (
        <div className="pb-20 bg-background">
            <div className="container mx-auto px-6">
                 <AnimatedSection>
                    <div className="text-center mb-12 pt-12">
                        <h1 className="font-sans text-4xl font-bold text-primary tracking-widest uppercase">Tools for Your Journey</h1>
                        <p className="text-text-secondary text-lg mt-2">Curated essentials for mind, body & soul</p>
                    </div>
                </AnimatedSection>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <AnimatedSection key={product.id} delay={100 + index * 100}>
                            <ProductCard product={product} />
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OasisShop;