import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { supabase } from '../supabaseClient';
import { LogOut, MapPin, Calendar, DollarSign, Star, User, Edit2, Phone, Clock } from 'lucide-react';
import CleanerOnboarding from './CleanerOnboarding'; // Reuse for editing

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
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' or 'profile'

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, [isEditing]); // Refresh when editing closes

    // Mock data for jobs
    const availableJobs = [
        { id: 1, title: 'Deep Cleaning - 3 Bed, 2 Bath', location: 'Downtown', distance: '2.5 km', date: 'Today, 2:00 PM', price: '120' },
        { id: 2, title: 'Standard Cleaning - Studio', location: 'Westside', distance: '5.1 km', date: 'Tomorrow, 10:00 AM', price: '85' },
        { id: 3, title: 'Move-out Cleaning', location: 'North Hills', distance: '8.0 km', date: 'Fri, Oct 24, 9:00 AM', price: '250' },
    ];

    if (isEditing) {
        return <CleanerOnboarding onComplete={() => setIsEditing(false)} />;
    }

    return (
        <div className="fade-in" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', paddingBottom: '80px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '28px' }}>Cleaner Dashboard</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Welcome back, {user?.email?.split('@')[0]}</p>
                </div>
                <Button variant="secondary" onClick={() => supabase.auth.signOut()} style={{ padding: '12px' }}>
                    <LogOut size={20} />
                </Button>
            </header>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--color-border)' }}>
                <button
                    onClick={() => setActiveTab('jobs')}
                    style={{
                        padding: '12px 0',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'jobs' ? '2px solid var(--color-primary)' : 'none',
                        color: activeTab === 'jobs' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        fontWeight: activeTab === 'jobs' ? '600' : '400',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Jobs
                </button>
                <button
                    onClick={() => setActiveTab('profile')}
                    style={{
                        padding: '12px 0',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'profile' ? '2px solid var(--color-primary)' : 'none',
                        color: activeTab === 'profile' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        fontWeight: activeTab === 'profile' ? '600' : '400',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    My Profile
                </button>
            </div>

            {activeTab === 'jobs' ? (
                <>
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
                </>
            ) : (
                <div className="fade-in">
                    <Card style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    backgroundColor: 'var(--color-primary)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}>
                                    <User size={32} />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '20px', fontWeight: '600' }}>{user?.email?.split('@')[0]}</h2>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                                        {user?.user_metadata?.experience} years experience
                                    </p>
                                </div>
                            </div>
                            <Button variant="secondary" onClick={() => setIsEditing(true)} style={{ padding: '8px' }}>
                                <Edit2 size={16} />
                            </Button>
                        </div>

                        <div style={{ display: 'grid', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f5f5f7', borderRadius: '12px' }}>
                                <DollarSign size={20} color="var(--color-text-secondary)" />
                                <div>
                                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Hourly Rate</div>
                                    <div style={{ fontWeight: '600' }}>${user?.user_metadata?.hourly_rate || '0'}/hr</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f5f5f7', borderRadius: '12px' }}>
                                <MapPin size={20} color="var(--color-text-secondary)" />
                                <div>
                                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Service Area</div>
                                    <div style={{ fontWeight: '600' }}>{user?.user_metadata?.location || 'Not set'}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f5f5f7', borderRadius: '12px' }}>
                                <Clock size={20} color="var(--color-text-secondary)" />
                                <div>
                                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Availability</div>
                                    <div style={{ fontWeight: '600' }}>{user?.user_metadata?.availability || 'Not set'}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f5f5f7', borderRadius: '12px' }}>
                                <Phone size={20} color="var(--color-text-secondary)" />
                                <div>
                                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Phone</div>
                                    <div style={{ fontWeight: '600' }}>{user?.user_metadata?.phone || 'Not set'}</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '24px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Bio</h3>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                                {user?.user_metadata?.bio || 'No bio provided.'}
                            </p>
                        </div>

                        <div style={{ marginTop: '24px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Specialties</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {user?.user_metadata?.specialties?.map(specialty => (
                                    <span key={specialty} style={{
                                        padding: '6px 12px',
                                        backgroundColor: '#e3f2fd',
                                        color: 'var(--color-primary)',
                                        borderRadius: '20px',
                                        fontSize: '14px',
                                        fontWeight: '500'
                                    }}>
                                        {specialty}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default CleanerHome;
