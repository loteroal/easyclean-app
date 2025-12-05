import React from 'react';
import { Star, X, User, CheckCircle } from 'lucide-react';
import Button from './Button';
import Card from './Card';

const CleanerProfileModal = ({ cleaner, onClose, onSelect }) => {
    if (!cleaner) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '500px',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }} onClick={e => e.stopPropagation()}>
                
                {/* Header */}
                <div style={{ 
                    padding: '24px', 
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                         <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: '#f5f5f7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <User size={40} color="var(--color-text-secondary)" />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '24px', marginBottom: '4px' }}>{cleaner.name}</h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Star size={18} fill="#ff9f0a" color="#ff9f0a" />
                                <span style={{ fontWeight: '600', fontSize: '16px' }}>{cleaner.rating}</span>
                                <span style={{ color: 'var(--color-text-secondary)' }}>({cleaner.reviews} reviews)</span>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <X size={24} color="var(--color-text-primary)" />
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '24px', overflowY: 'auto' }}>
                    
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Specialties</h3>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {cleaner.tags.map(tag => (
                                <span key={tag} style={{
                                    fontSize: '14px',
                                    padding: '6px 12px',
                                    backgroundColor: '#f5f5f7',
                                    borderRadius: '100px',
                                    color: 'var(--color-text-secondary)'
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Recent Reviews</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {cleaner.reviewList && cleaner.reviewList.map((review, index) => (
                                <div key={index} style={{ 
                                    padding: '16px', 
                                    backgroundColor: '#f9f9f9', 
                                    borderRadius: '16px' 
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontWeight: '600' }}>{review.user}</span>
                                        <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>{review.date}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} fill={i < review.rating ? "#ff9f0a" : "#e0e0e0"} color={i < review.rating ? "#ff9f0a" : "#e0e0e0"} />
                                        ))}
                                    </div>
                                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ 
                    padding: '24px', 
                    borderTop: '1px solid #f0f0f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ fontSize: '24px', fontWeight: '700' }}>${cleaner.price}/hr</div>
                    <Button onClick={() => onSelect(cleaner)} style={{ width: 'auto', padding: '12px 32px' }}>
                        Select {cleaner.name.split(' ')[0]}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CleanerProfileModal;
