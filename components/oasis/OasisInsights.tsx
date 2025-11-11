
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const PostCard: React.FC<{image: string, date: string, title: string, author: string}> = ({ image, date, title, author }) => (
    <div className="group">
        <div className="overflow-hidden mb-4">
            <img src={image} alt={title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
        </div>
        <p className="text-sm text-text-secondary">{date} / by {author}</p>
        <h4 className="font-display text-xl font-bold text-primary mt-1 group-hover:text-accent transition-colors">{title}</h4>
    </div>
);


const OasisInsights: React.FC = () => {
    const { t } = useLanguage();
    const handlePageLinkClick = () => window.scrollTo(0, 0);

    const posts = [
        {
            image: 'https://picsum.photos/seed/serenity-post/600/400',
            date: 'October 14, 2024',
            title: t('oasis.blog.posts.1.title'),
            author: 'Alice'
        },
        {
            image: 'https://picsum.photos/seed/peace-post/600/400',
            date: 'October 12, 2024',
            title: t('oasis.blog.posts.2.title'),
            author: 'Alice'
        },
        {
            image: 'https://picsum.photos/seed/moments-post/600/400',
            date: 'October 10, 2024',
            title: t('oasis.blog.posts.3.title'),
            author: 'Alice'
        }
    ];
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <p className="text-accent font-semibold tracking-wider">{t('oasis.insights.reads')}</p>
                    <h2 className="font-display text-4xl font-bold text-primary mt-2">{t('oasis.insights.title')}</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => <PostCard key={post.title} {...post} />)}
                </div>
                <div className="text-center mt-16">
                    <a href="#/blog" onClick={handlePageLinkClick} className="px-8 py-3 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                        {t('oasis.insights.viewAll')}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default OasisInsights;