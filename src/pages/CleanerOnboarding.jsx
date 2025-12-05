import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { supabase } from '../supabaseClient';
import { Check, User, MapPin, DollarSign, Clock, Phone } from 'lucide-react';

const CleanerOnboarding = ({ onComplete }) => {
    const [loading, setLoading] = useState(false);
    const [experience, setExperience] = useState('');
    const [bio, setBio] = useState('');
    const [specialties, setSpecialties] = useState([]);
    const [hourlyRate, setHourlyRate] = useState('');
    const [location, setLocation] = useState('');
    const [availability, setAvailability] = useState('');
    const [phone, setPhone] = useState('');

    const availableSpecialties = [
        'Standard Cleaning',
        'Deep Cleaning',
        'Move-in/Move-out',
        'Windows',
        'Carpet Cleaning',
        'Office Cleaning'
    ];

    const toggleSpecialty = (specialty) => {
        if (specialties.includes(specialty)) {
            setSpecialties(specialties.filter(s => s !== specialty));
        } else {
            setSpecialties([...specialties, specialty]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                data: {
                    experience,
                    bio,
                    specialties,
                    hourly_rate: hourlyRate,
                    location,
                    availability,
                    phone,
                    onboarding_complete: true
                }
            });

            if (error) throw error;
            onComplete();
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error saving profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fade-in" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px',
            backgroundColor: '#f5f5f7'
        }}>
            <Card style={{ width: '100%', maxWidth: '500px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: 'var(--color-primary)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px auto',
                        color: 'white'
                    }}>
                        <User size={32} />
                    </div>
                    <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Cleaner Profile</h2>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Complete your profile to get hired.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Input
                            label="Years of Experience"
                            type="number"
                            placeholder="e.g. 3"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            required
                        />
                        <Input
                            label="Hourly Rate ($)"
                            type="number"
                            placeholder="e.g. 25"
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(e.target.value)}
                            required
                        />
                    </div>

                    <Input
                        label="Service Area / Location"
                        type="text"
                        placeholder="e.g. Downtown, Brooklyn..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        icon={MapPin}
                        required
                    />

                    <Input
                        label="Availability"
                        type="text"
                        placeholder="e.g. Mon-Fri, 9am - 5pm"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        icon={Clock}
                        required
                    />

                    <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="e.g. +1 234 567 890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        icon={Phone}
                        required
                    />

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
                            Specialties
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {availableSpecialties.map(specialty => (
                                <button
                                    key={specialty}
                                    type="button"
                                    onClick={() => toggleSpecialty(specialty)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        border: specialties.includes(specialty) ? 'none' : '1px solid var(--color-border)',
                                        backgroundColor: specialties.includes(specialty) ? 'var(--color-primary)' : 'white',
                                        color: specialties.includes(specialty) ? 'white' : 'var(--color-text-primary)',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    {specialties.includes(specialty) && <Check size={14} />}
                                    {specialty}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
                            Short Bio
                        </label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Describe yourself and your work ethic..."
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '12px',
                                border: '1px solid var(--color-border)',
                                fontSize: '16px',
                                fontFamily: 'inherit',
                                minHeight: '100px',
                                resize: 'vertical'
                            }}
                            required
                        />
                    </div>

                    <Button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Complete Profile'}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default CleanerOnboarding;
