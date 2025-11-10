import React from 'react';

const PostCard: React.FC<{image: string, date: string, title: string, author: string}> = ({ image, date, title, author }) => (
    <div className="group">
        <div className="overflow-hidden mb-4">
            <img src={image} alt={title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
        </div>
        <p className="text-sm text-text-secondary">{date} / by {author}</p>
        <h4 className="font-display text-xl font-bold text-primary mt-1 group-hover:text-accent transition-colors">{title}</h4>
    </div>
);


const ManhhiWisdom: React.FC = () => {
    const posts = [
        {
            image: 'https://images.unsplash.com/photo-1542438459-54817346b362?q=80&w=2940&auto=format&fit=crop',
            date: 'October 14, 2024',
            title: 'Discover Serenity',
            author: 'Admin'
        },
        {
            image: 'https://images.unsplash.com/photo-1596193433357-49a38c8c7c34?q=80&w=2835&auto=format&fit=crop',
            date: 'October 12, 2024',
            title: 'The Path of Peace',
            author: 'Admin'
        },
        {
            image: 'https://images.unsplash.com/photo-1597509492328-97fb62b4a530?q=80&w=2835&auto=format&fit=crop',
            date: 'October 10, 2024',
            title: 'Mindful Moments',
            author: 'Admin'
        }
    ];
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <p className="text-accent font-semibold tracking-wider">INSPIRING READS</p>
                    <h2 className="font-display text-4xl font-bold text-primary mt-2">Wisdom News Insights</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => <PostCard key={post.title} {...post} />)}
                </div>
            </div>
        </section>
    );
};

export default ManhhiWisdom;
