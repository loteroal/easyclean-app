import React from 'react';
import Card from './Card';
import { ChevronRight } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, onClick, color = '#0071e3' }) => {
    return (
        <Card
            onClick={onClick}
            style={{
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                ':hover': {
                    transform: 'scale(1.02)'
                }
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: `${color}15`, // 15 is roughly 8% opacity hex
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: color
                }}>
                    <Icon size={24} />
                </div>
                <span style={{ fontSize: '16px', fontWeight: '600' }}>{title}</span>
            </div>
            <ChevronRight size={20} color="var(--color-text-secondary)" />
        </Card>
    );
};

export default ServiceCard;
