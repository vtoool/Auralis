
import React from 'react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import AnimatedSection from '../AnimatedSection';
import { useLanguage } from '../../context/LanguageContext';

// Static data that doesn't need translation
const productIds = [101, 102, 103, 104, 105, 106];
const mockProductImages: {[key: number]: string} = {
    101: 'https://picsum.photos/seed/saltlamp/400/400',
    102: 'https://picsum.photos/seed/cushion/400/400',
    103: 'https://picsum.photos/seed/singingbowl/400/400',
    104: 'https://picsum.photos/seed/diffuser/400/400',
    105: 'https://picsum.photos/seed/chakraset/400/400',
    106: 'https://picsum.photos/seed/sage/400/400'
};
const mockProductPrices: {[key: number]: number} = {
    101: 34.99,
    102: 49.99,
    103: 59.99,
    104: 39.99,
    105: 24.99,
    106: 12.99
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart } = useCart();
    const { t } = useLanguage();
    return (
        <div className="bg-card-background border border-border-color shadow-sm transition-all duration-300 hover:shadow-elegant-lg group overflow-hidden rounded-sm text-center flex flex-col">
            <div className="h-64 overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-display text-xl text-primary font-semibold mb-2">{product.name}</h3>
                <p className="text-text-secondary text-sm mb-4 flex-grow">{product.description}</p>
                <p className="text-2xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>
                <button 
                    onClick={() => addToCart(product)}
                    className="mt-auto w-full px-6 py-2 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
                >
                    {t('oasis.shop.addToCart')}
                </button>
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
        <div className="py-24 bg-background">
            <div className="container mx-auto px-6">
                 <AnimatedSection>
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <p className="text-accent font-semibold tracking-wider">{t('oasis.shop.title')}</p>
                        <h1 className="font-display text-5xl font-bold text-primary mt-2 mb-4">{t('oasis.shop.subtitle')}</h1>
                        <p className="text-text-secondary text-lg">{t('oasis.shop.text')}</p>
                    </div>
                </AnimatedSection>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <AnimatedSection key={product.id} delay={index * 100}>
                            <ProductCard product={product} />
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OasisShop;
