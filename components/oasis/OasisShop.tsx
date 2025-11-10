
import React from 'react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import AnimatedSection from '../AnimatedSection';

const mockProducts: Product[] = [
    { id: 101, name: 'Himalayan Salt Lamp', description: 'Natural crystal salt lamp to purify air and create a serene ambiance.', price: 34.99, imageUrl: 'https://picsum.photos/seed/saltlamp/400/400' },
    { id: 102, name: 'Meditation Cushion', description: 'Ergonomic zafu cushion for comfortable and supportive meditation sessions.', price: 49.99, imageUrl: 'https://picsum.photos/seed/cushion/400/400' },
    { id: 103, name: 'Tibetan Singing Bowl', description: 'Hand-hammered brass bowl that produces rich, resonant tones for healing.', price: 59.99, imageUrl: 'https://picsum.photos/seed/singingbowl/400/400' },
    { id: 104, name: 'Essential Oil Diffuser', description: 'Ultrasonic diffuser to disperse calming essential oils into your space.', price: 39.99, imageUrl: 'https://picsum.photos/seed/diffuser/400/400' },
    { id: 105, name: 'Chakra Stone Set', description: 'A set of seven polished gemstones to align and balance your body\'s energy centers.', price: 24.99, imageUrl: 'https://picsum.photos/seed/chakraset/400/400' },
    { id: 106, name: 'Organic Sage Smudge Stick', description: 'For cleansing your space of negative energy and promoting a sense of peace.', price: 12.99, imageUrl: 'https://picsum.photos/seed/sage/400/400' },
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart } = useCart();
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
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

const OasisShop: React.FC = () => {
    return (
        <div className="py-24 bg-background">
            <div className="container mx-auto px-6">
                 <AnimatedSection>
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <p className="text-accent font-semibold tracking-wider">AURALIS SHOP</p>
                        <h1 className="font-display text-5xl font-bold text-primary mt-2 mb-4">Tools for Your Journey</h1>
                        <p className="text-text-secondary text-lg">Enhance your practice and bring harmony to your space with our curated collection of wellness products.</p>
                    </div>
                </AnimatedSection>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockProducts.map((product, index) => (
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
