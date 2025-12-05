import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { supabase } from '../supabaseClient';
import { LogOut, MapPin, Calendar, DollarSign, Star, CheckCircle } from 'lucide-react';

const JobCard = ({ title, location, date, price, distance }) => (
    <Card style={{ marginBottom: '16px', cursor: 'pointer', transition: 'transform 0.2s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>{title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                    <MapPin size={14} style={{ marginRight: '4px' }} />
                    {location} • {distance}
                </div>
            </div>
            <div style={{
                backgroundColor: '#e8f5e9',
                color: '#2e7d32',
                padding: '4px 8px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px'
            }}>
                ${price}
            </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
            <Calendar size={14} style={{ marginRight: '4px' }} />
            {date}
        </div>
        <Button style={{ width: '100%', fontSize: '14px', padding: '10px' }}>
            Accept Job
        </Button>
    </Card>
);

const CleanerHome = () => {
    // Mock data for jobs
    const availableJobs = [
        { id: 1, title: 'Deep Cleaning - 3 Bed, 2 Bath', location: 'Downtown', distance: '2.5 km', date: 'Today, 2:00 PM', price: '120' },
        { id: 2, title: 'Standard Cleaning - Studio', location: 'Westside', distance: '5.1 km', date: 'Tomorrow, 10:00 AM', price: '85' },
        { id: 3, title: 'Move-out Cleaning', location: 'North Hills', distance: '8.0 km', date: 'Fri, Oct 24, 9:00 AM', price: '250' },
    ];

    return (
        <div className="fade-in" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '80px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '28px' }}>Cleaner Dashboard</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Find your next job.</p>
                </div>
                <Button variant="secondary" onClick={() => supabase.auth.signOut()} style={{ padding: '12px' }}>
                    <LogOut size={20} />
                </Button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                <Card style={{ textAlign: 'center', padding: '20px' }}>
                    <div style={{ color: '#ff9f0a', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                        <Star size={24} fill="#ff9f0a" />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: '700' }}>4.9</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Rating</div>
                </Card>
                <Card style={{ textAlign: 'center', padding: '20px' }}>
                    <div style={{ color: '#34c759', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                        <DollarSign size={24} />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: '700' }}>$850</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>This Month</div>
                </Card>
            </div>

            <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Available Jobs</h2>

            {availableJobs.map(job => (
                <JobCard key={job.id} {...job} />
            ))}

            <div style={{ marginTop: '32px', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                <p>You're all caught up!</p>
            </div>
        </div>
    );
};

export default CleanerHome;
