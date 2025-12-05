import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import CleanerProfileModal from '../components/CleanerProfileModal';
import { Star, CheckCircle, User } from 'lucide-react';

const CleanerCard = ({ name, rating, reviews, price, tags, onViewProfile, onSelect }) => (
    <Card style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', cursor: 'pointer' }} onClick={onViewProfile}>
            <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#f5f5f7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <User size={32} color="var(--color-text-secondary)" />
            </div>
            <div>
                <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>{name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                    <Star size={16} fill="#ff9f0a" color="#ff9f0a" />
                    <span style={{ fontWeight: '600' }}>{rating}</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>({reviews} reviews)</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {tags.map(tag => (
                        <span key={tag} style={{
                            fontSize: '12px',
                            padding: '4px 8px',
                            backgroundColor: '#f5f5f7',
                            borderRadius: '100px',
                            color: 'var(--color-text-secondary)'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
        <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>${price}/hr</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Button onClick={onSelect}>Select</Button>
                <button
                    onClick={onViewProfile}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-primary)',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                    }}
                >
                    View Profile
                </button>
            </div>
        </div>
    </Card>
);

const Matching = ({ requestData, onBack, onSelect }) => {
    const [selectedCleanerForView, setSelectedCleanerForView] = useState(null);

    const cleaners = [
        {
            id: 1,
            name: 'Sarah Jenkins',
            rating: 4.9,
            reviews: 124,
            price: 35,
            tags: ['Pet Friendly', 'Deep Clean'],
            reviewList: [
                { user: 'John D.', rating: 5, date: '2 days ago', comment: 'Sarah was amazing! My house has never been cleaner. Highly recommended.' },
                { user: 'Emily R.', rating: 5, date: '1 week ago', comment: 'Very professional and thorough. She even cleaned behind the fridge!' },
                { user: 'Michael S.', rating: 4, date: '2 weeks ago', comment: 'Great job, but arrived a bit late due to traffic. Communication was good though.' }
            ]
        },
        {
            id: 2,
            name: 'Michael Chen',
            rating: 4.8,
            reviews: 89,
            price: 32,
            tags: ['Eco Products', 'Fast'],
            reviewList: [
                { user: 'Jessica L.', rating: 5, date: '3 days ago', comment: 'Michael is incredibly fast and efficient. Used all eco-friendly products as requested.' },
                { user: 'David W.', rating: 4, date: '1 week ago', comment: 'Good cleaning, missed a spot in the bathroom but came back to fix it immediately.' }
            ]
        },
        {
            id: 3,
            name: 'Emma Wilson',
            rating: 5.0,
            reviews: 56,
            price: 40,
            tags: ['Premium', 'Detail Oriented'],
            reviewList: [
                { user: 'Sarah M.', rating: 5, date: '1 day ago', comment: 'Worth every penny. The attention to detail is unmatched.' },
                { user: 'Robert K.', rating: 5, date: '5 days ago', comment: 'Emma is a perfectionist. My apartment looks like a hotel suite now.' }
            ]
        },
    ];

    return (
        <div className="container" style={{ paddingTop: '40px' }}>
            <Button variant="secondary" onClick={onBack} style={{ marginBottom: '24px' }}>← Back</Button>

            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>We found great matches</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Based on your {requestData?.rooms || 2} bedroom home.
                </p>
            </header>

            <div className="fade-in">
                {cleaners.map(cleaner => (
                    <CleanerCard
                        key={cleaner.id}
                        {...cleaner}
                        onViewProfile={() => setSelectedCleanerForView(cleaner)}
                        onSelect={() => onSelect(cleaner)}
                    />
                ))}
            </div>

            <CleanerProfileModal
                cleaner={selectedCleanerForView}
                onClose={() => setSelectedCleanerForView(null)}
                onSelect={(cleaner) => {
                    setSelectedCleanerForView(null);
                    onSelect(cleaner);
                }}
            />
        </div>
    );
};

export default Matching;
