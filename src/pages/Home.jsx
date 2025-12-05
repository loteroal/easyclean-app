import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Calendar from '../components/Calendar';
import ServiceCard from '../components/ServiceCard';
import { Calendar as CalendarIcon, Clock, Star, Plus, Lock, Dog, Grid, ShieldCheck, X, Heart } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color, onClick }) => (
    <Card
        onClick={onClick}
        style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            cursor: onClick ? 'pointer' : 'default',
            transition: onClick ? 'transform 0.2s ease' : 'none',
            ':hover': onClick ? { transform: 'scale(1.02)' } : {}
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: color }}>
            <Icon size={20} />
            <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text-secondary)' }}>{label}</span>
        </div>
        <span style={{ fontSize: '24px', fontWeight: '700' }}>{value}</span>
    </Card>
);

const Home = ({ onNavigate }) => {
    const [showLockSubscription, setShowLockSubscription] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showRatingsModal, setShowRatingsModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);

    // Mock ratings data
    const myRatings = [
        { service: 'Deep Cleaning', date: '2023-10-15', rating: 5, comment: 'Amazing job! The house looks brand new.', cleaner: 'Maria Garcia' },
        { service: 'Standard Cleaning', date: '2023-10-01', rating: 4, comment: 'Good service but arrived a bit late.', cleaner: 'Carlos Rodriguez' },
        { service: 'Window Cleaning', date: '2023-09-20', rating: 5, comment: 'Perfectly clean windows.', cleaner: 'Ana Smith' }
    ];

    // Mock past cleanings data
    const pastCleanings = [
        { date: '2023-10-15', duration: 4, service: 'Deep Cleaning' },
        { date: '2023-10-01', duration: 3, service: 'Standard Cleaning' },
        { date: '2023-09-20', duration: 2, service: 'Window Cleaning' },
        { date: '2023-09-05', duration: 3, service: 'Standard Cleaning' }
    ];

    const totalHours = pastCleanings.reduce((acc, curr) => acc + curr.duration, 0);

    // Mock events for the calendar
    const scheduledCleanings = [
        {
            date: new Date(new Date().setDate(new Date().getDate() + 1)),
            title: 'Standard Cleaning',
            cleaner: { name: 'Maria Garcia', rating: 4.9 }
        },
        {
            date: new Date(new Date().setDate(new Date().getDate() + 5)),
            title: 'Deep Cleaning',
            cleaner: { name: 'Carlos Rodriguez', rating: 4.8 }
        },
        {
            date: new Date(new Date().setDate(new Date().getDate() + 12)),
            title: 'Standard Cleaning',
            cleaner: { name: 'Maria Garcia', rating: 4.9 }
        }
    ];

    return (
        <div className="container" style={{ paddingBottom: '40px' }}>
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '24px 0',
                marginBottom: '24px'
            }}>
                <div>
                    <img src="/logo-blue.png" alt="EasyClean Logo" style={{ height: '60px', marginBottom: '12px', display: 'block' }} />
                    <h1 style={{ fontSize: '32px' }}>Good Morning</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Here's your cleaning summary.</p>
                </div>
                <Button onClick={() => onNavigate('onboarding')}>
                    <Plus size={18} style={{ marginRight: '8px' }} />
                    New Request
                </Button>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
            }}>
                <StatCard icon={CalendarIcon} label="Next Cleaning" value="Tomorrow, 10 AM" color="#0071e3" />
                <StatCard
                    icon={Clock}
                    label="Total Hours"
                    value={`${totalHours}h`}
                    color="#34c759"
                    onClick={() => setShowHistoryModal(true)}
                />
                <StatCard
                    icon={Heart}
                    label="Hours Saved"
                    value={`${totalHours}h`}
                    color="#ff2d55"
                />
                <StatCard
                    icon={Star}
                    label="Avg Rating"
                    value="4.9"
                    color="#ff9f0a"
                    onClick={() => setShowRatingsModal(true)}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                <section>
                    <h2 style={{ marginBottom: '20px' }}>Upcoming Schedule</h2>
                    <Calendar
                        events={scheduledCleanings}
                        onDayClick={(date, events) => {
                            if (events && events.length > 0) {
                                setSelectedEvent({ date, events });
                            }
                        }}
                    />
                </section>

                <section>
                    <h2 style={{ marginBottom: '20px' }}>Recent Activity</h2>
                    <Card>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[1, 2, 3].map((item) => (
                                <div key={item} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '12px 0',
                                    borderBottom: item < 3 ? '1px solid var(--color-border)' : 'none'
                                }}>
                                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            backgroundColor: '#f5f5f7',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <CalendarIcon size={20} color="var(--color-text-secondary)" />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '500' }}>Standard Cleaning</div>
                                            <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>2 days ago • 3 hours</div>
                                        </div>
                                    </div>
                                    <div style={{ fontWeight: '600' }}>$45.00</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </section>
            </div>

            <section style={{ marginTop: '40px' }}>
                <h2 style={{ marginBottom: '20px' }}>Explore More Services</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '20px'
                }}>
                    <ServiceCard
                        icon={Lock}
                        title="Digital Lock Installation"
                        color="#ff2d55"
                        onClick={() => setShowLockSubscription(true)}
                    />
                    <ServiceCard
                        icon={Dog}
                        title="Dog Walking"
                        color="#5856d6"
                        onClick={() => console.log('Dog walking clicked')}
                    />
                    <ServiceCard
                        icon={Grid}
                        title="Other Services"
                        color="#af52de"
                        onClick={() => console.log('Other services clicked')}
                    />
                </div>
            </section>

            <section style={{ marginTop: '40px', textAlign: 'center' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 24px',
                    backgroundColor: 'rgba(52, 199, 89, 0.1)',
                    borderRadius: '30px',
                    color: '#34c759'
                }}>
                    <ShieldCheck size={24} />
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>100% Satisfaction Guaranteed • Verified Professionals</span>
                </div>
            </section>

            {showLockSubscription && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div className="fade-in" style={{
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        padding: '32px',
                        width: '100%',
                        maxWidth: '400px',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setShowLockSubscription(false)}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--color-text-secondary)'
                            }}
                        >
                            <X size={24} />
                        </button>

                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '16px',
                            backgroundColor: 'rgba(255, 45, 85, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ff2d55',
                            marginBottom: '24px',
                            margin: '0 auto'
                        }}>
                            <Lock size={32} />
                        </div>

                        <h2 style={{ textAlign: 'center', marginBottom: '12px', fontSize: '24px' }}>Smart Lock Subscription</h2>
                        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '32px', lineHeight: '1.5' }}>
                            Upgrade your home security with our premium digital lock service. Installation and maintenance included.
                        </p>

                        <div style={{
                            textAlign: 'center',
                            marginBottom: '32px'
                        }}>
                            <span style={{ fontSize: '48px', fontWeight: '700', color: 'var(--color-text-primary)' }}>€15</span>
                            <span style={{ color: 'var(--color-text-secondary)', fontSize: '18px' }}>/month</span>
                        </div>

                        <Button style={{ width: '100%', marginBottom: '12px' }} onClick={() => setShowLockSubscription(false)}>
                            Subscribe Now
                        </Button>
                        <Button variant="secondary" style={{ width: '100%' }} onClick={() => setShowLockSubscription(false)}>
                            Maybe Later
                        </Button>
                    </div>
                </div>
            )}

            {selectedEvent && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div className="fade-in" style={{
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        padding: '32px',
                        width: '100%',
                        maxWidth: '400px',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setSelectedEvent(null)}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--color-text-secondary)'
                            }}
                        >
                            <X size={24} />
                        </button>

                        <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>
                            {selectedEvent.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {selectedEvent.events.map((event, index) => (
                                <div key={index} style={{
                                    padding: '16px',
                                    backgroundColor: '#f5f5f7',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#0071e3'
                                    }}>
                                        <CalendarIcon size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>{event.title}</div>
                                        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>10:00 AM - 1:00 PM</div>
                                        {event.cleaner && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px' }}>
                                                <span style={{ color: 'var(--color-text-primary)' }}>{event.cleaner.name}</span>
                                                <span style={{ color: '#ff9f0a' }}>★</span>
                                                <span style={{ color: 'var(--color-text-secondary)' }}>{event.cleaner.rating}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button style={{ width: '100%', marginTop: '24px' }} onClick={() => setSelectedEvent(null)}>
                            Close
                        </Button>
                    </div>
                </div>
            )}

            {showRatingsModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div className="fade-in" style={{
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        padding: '32px',
                        width: '100%',
                        maxWidth: '500px',
                        position: 'relative',
                        maxHeight: '80vh',
                        overflowY: 'auto'
                    }}>
                        <button
                            onClick={() => setShowRatingsModal(false)}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--color-text-secondary)'
                            }}
                        >
                            <X size={24} />
                        </button>

                        <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>My Ratings</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {myRatings.map((rating, index) => (
                                <div key={index} style={{
                                    padding: '20px',
                                    backgroundColor: '#f5f5f7',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: '600', fontSize: '16px' }}>{rating.service}</span>
                                        <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>{rating.date}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                fill={i < rating.rating ? "#ff9f0a" : "none"}
                                                color={i < rating.rating ? "#ff9f0a" : "#d1d1d6"}
                                            />
                                        ))}
                                    </div>
                                    <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '4px 0' }}>"{rating.comment}"</p>
                                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>
                                        Cleaner: {rating.cleaner}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button style={{ width: '100%', marginTop: '24px' }} onClick={() => setShowRatingsModal(false)}>
                            Close
                        </Button>
                    </div>
                </div>
            )}

            {showHistoryModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div className="fade-in" style={{
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        padding: '32px',
                        width: '100%',
                        maxWidth: '500px',
                        position: 'relative',
                        maxHeight: '80vh',
                        overflowY: 'auto'
                    }}>
                        <button
                            onClick={() => setShowHistoryModal(false)}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--color-text-secondary)'
                            }}
                        >
                            <X size={24} />
                        </button>

                        <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>Service History</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {pastCleanings.map((cleaning, index) => (
                                <div key={index} style={{
                                    padding: '20px',
                                    backgroundColor: '#f5f5f7',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '16px' }}>{cleaning.service}</div>
                                        <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>{cleaning.date}</div>
                                    </div>
                                    <div style={{
                                        backgroundColor: '#34c759',
                                        color: 'white',
                                        padding: '4px 12px',
                                        borderRadius: '12px',
                                        fontWeight: '600',
                                        fontSize: '14px'
                                    }}>
                                        {cleaning.duration}h
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button style={{ width: '100%', marginTop: '24px' }} onClick={() => setShowHistoryModal(false)}>
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
