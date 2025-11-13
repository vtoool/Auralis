

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
    return (
        <div className="bg-card-background shadow-elegant transition-all duration-300 hover:shadow-elegant-lg group rounded-2xl text-left flex flex-col overflow-hidden">
            <div className="h-64 overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-sans text-xl font-bold text-primary mb-1">{product.name}</h3>
                <p className="text-text-secondary text-sm mb-2">{product.description}</p>
                <p className="text-lg font-sans font-bold text-primary my-2">${product.price.toFixed(2)}</p>
                <button 
                    onClick={() => addToCart(product)}
                    className="mt-auto w-full py-3 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors rounded-lg text-sm uppercase tracking-wider"
                >
                    {t('oasis.shop.addButton')}
                </button>
            </div>
        </div>
    );
};

const OasisShop: React.FC = () => {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState('All');

    const products: Product[] = productIds.map(id => ({
        id,
        name: t(`oasis.shop.products.${id}.name`),
        description: t(`oasis.shop.products.${id}.description`),
        price: mockProductPrices[id],
        imageUrl: mockProductImages[id]
    }));
    
    const categories = ['All', 'Home', 'Crystals', 'Accessories', 'Rituals'];
    
    return (
        <div className="py-20 bg-background">
            <div className="container mx-auto px-6">
                 <AnimatedSection>
                    <div className="text-center mb-12">
                        <h1 className="font-sans text-4xl font-bold text-primary tracking-widest uppercase">Tools for Your Journey</h1>
                        <p className="text-text-secondary text-lg mt-2">Curated essentials for mind, body & soul</p>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={100}>
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 mb-12">
                        <div className="flex items-center gap-2 flex-wrap justify-center">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 border ${
                                        activeCategory === category
                                            ? 'bg-accent text-accent-foreground border-accent'
                                            : 'bg-card-background text-primary border-border-color hover:bg-primary-light'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <select className="appearance-none bg-card-background border border-border-color rounded-full py-2 px-5 pr-10 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent">
                                <option>Sort by: Popularity</option>
                                <option>Sort by: Price (Low to High)</option>
                                <option>Sort by: Price (High to Low)</option>
                                <option>Sort by: Newest</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-secondary">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <AnimatedSection key={product.id} delay={200 + index * 100}>
                            <ProductCard product={product} />
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OasisShop;