
import React from 'react';
import type { BlogPost } from '../../types';
import AnimatedSection from '../AnimatedSection';

const mockPosts: BlogPost[] = [
    {
        id: 1,
        title: 'The Art of Mindful Mornings',
        author: 'Alice',
        date: 'October 21, 2024',
        excerpt: 'Discover how a few simple practices upon waking can transform your entire day, fostering peace and productivity from sunrise.',
        imageUrl: 'https://picsum.photos/seed/blog-morning/600/400',
    },
    {
        id: 2,
        title: 'Finding Stillness in a Noisy World',
        author: 'Alice',
        date: 'October 18, 2024',
        excerpt: 'Navigating the constant demands of modern life can be overwhelming. Learn techniques to find your inner sanctuary amidst the chaos.',
        imageUrl: 'https://picsum.photos/seed/blog-stillness/600/400',
    },
    {
        id: 3,
        title: 'An Introduction to Chakra Balancing',
        author: 'Alice',
        date: 'October 15, 2024',
        excerpt: 'Understand the seven energy centers of your body and how aligning them can lead to profound emotional and physical well-being.',
        imageUrl: 'https://picsum.photos/seed/blog-chakra/600/400',
    },
    {
        id: 4,
        title: 'The Power of Gratitude Journaling',
        author: 'Alice',
        date: 'October 12, 2024',
        excerpt: 'Explore the simple yet powerful practice of gratitude journaling and its scientifically-backed benefits for mental health.',
        imageUrl: 'https://picsum.photos/seed/blog-journal/600/400',
    },
    {
        id: 5,
        title: 'Creating a Sacred Space at Home',
        author: 'Alice',
        date: 'October 09, 2024',
        excerpt: 'Turn any corner of your home into a personal retreat for meditation, reflection, and rejuvenation with these simple tips.',
        imageUrl: 'https://picsum.photos/seed/blog-space/600/400',
    },
    {
        id: 6,
        title: 'Breathing Techniques for Instant Calm',
        author: 'Alice',
        date: 'October 06, 2024',
        excerpt: 'Master three fundamental breathing exercises that can help you reduce anxiety and restore a sense of calm in moments of stress.',
        imageUrl: 'https://picsum.photos/seed/blog-breath/600/400',
    },
];

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
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
            <a href="#!" className="mt-auto font-semibold text-primary hover:text-accent transition-colors">Read More &rarr;</a>
        </div>
    </div>
);


const OasisBlog: React.FC = () => {
    return (
        <div className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <p className="text-accent font-semibold tracking-wider">AURALIS INSIGHTS</p>
                        <h1 className="font-display text-5xl font-bold text-primary mt-2 mb-4">Wisdom for the Path</h1>
                        <p className="text-text-secondary text-lg">A collection of articles and reflections to support and inspire your journey of spiritual wellness and self-discovery.</p>
                    </div>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockPosts.map((post, index) => (
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
