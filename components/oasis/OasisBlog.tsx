
import React from 'react';
import type { BlogPost } from '../../types';
import AnimatedSection from '../AnimatedSection';
import { useLanguage } from '../../context/LanguageContext';

// Static data that is not translated
const postIds = [1, 2, 3, 4, 5, 6];
const mockPostMeta: { [key: number]: { author: string, date: string, imageUrl: string } } = {
    1: { author: 'Alice', date: 'October 21, 2024', imageUrl: 'https://picsum.photos/seed/blog-morning/600/400' },
    2: { author: 'Alice', date: 'October 18, 2024', imageUrl: 'https://picsum.photos/seed/blog-stillness/600/400' },
    3: { author: 'Alice', date: 'October 15, 2024', imageUrl: 'https://picsum.photos/seed/blog-chakra/600/400' },
    4: { author: 'Alice', date: 'October 12, 2024', imageUrl: 'https://picsum.photos/seed/blog-journal/600/400' },
    5: { author: 'Alice', date: 'October 09, 2024', imageUrl: 'https://picsum.photos/seed/blog-space/600/400' },
    6: { author: 'Alice', date: 'October 06, 2024', imageUrl: 'https://picsum.photos/seed/blog-breath/600/400' },
};

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-card-background border border-border-color shadow-sm transition-all duration-300 hover:shadow-elegant-lg group overflow-hidden rounded-sm flex flex-col">
            <a href="#!" className="block overflow-hidden h-56">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </a>
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-text-secondary mb-1">{post.date} / by {post.author}</p>
                <h3 className="font-display text-2xl text-primary font-semibold mb-3 group-hover:text-accent transition-colors">
                    <a href="#!">{post.title}</a>
                </h3>
                <p className="text-text-secondary text-base mb-4 flex-grow">{post.excerpt}</p>
                <a href="#!" className="mt-auto font-semibold text-primary hover:text-accent transition-colors">{t('oasis.blog.readMore')}</a>
            </div>
        </div>
    );
};


const OasisBlog: React.FC = () => {
    const { t } = useLanguage();
    
    const posts: BlogPost[] = postIds.map(id => ({
        id,
        title: t(`oasis.blog.posts.${id}.title`),
        excerpt: t(`oasis.blog.posts.${id}.excerpt`),
        author: mockPostMeta[id].author,
        date: mockPostMeta[id].date,
        imageUrl: mockPostMeta[id].imageUrl,
    }));

    return (
        <div className="pt-16 pb-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <a href="/#" className="inline-flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        <span>{t('oasis.navigation.backToHome')}</span>
                    </a>
                </div>
                <AnimatedSection>
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <p className="text-accent font-semibold tracking-wider">{t('oasis.blog.insights')}</p>
                        <h1 className="font-display text-5xl font-bold text-primary mt-2 mb-4">{t('oasis.blog.title')}</h1>
                        <p className="text-text-secondary text-lg">{t('oasis.blog.subtitle')}</p>
                    </div>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                         <AnimatedSection key={post.id} delay={index * 100}>
                            <BlogPostCard post={post} />
                         </AnimatedSection>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OasisBlog;
