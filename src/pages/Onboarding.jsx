import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { Home, Bath, Calendar, Shield, Sparkles } from 'lucide-react';

const OptionCard = ({ selected, onClick, icon: Icon, label, subLabel }) => (
    <div
        onClick={onClick}
        style={{
            padding: '20px',
            borderRadius: '16px',
            border: `2px solid ${selected ? 'var(--color-accent)' : 'transparent'}`,
            backgroundColor: selected ? 'rgba(0, 113, 227, 0.05)' : 'white',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            boxShadow: selected ? 'none' : 'var(--shadow-sm)'
        }}
    >
        <Icon size={32} color={selected ? 'var(--color-accent)' : 'var(--color-text-secondary)'} />
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: '600', color: selected ? 'var(--color-accent)' : 'var(--color-text-primary)' }}>{label}</div>
            {subLabel && <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{subLabel}</div>}
        </div>
    </div>
);

const Onboarding = ({ onComplete, onCancel }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        rooms: 2,
        bathrooms: 1,
        frequency: 'weekly',
        size: 80,
        manualHours: 3,
        preferredTime: 'Morning (8am - 12pm)',
        includeInsurance: false,
        cleanerProvidesProducts: true,
        subscriptionDuration: 'monthly'
    });

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
        else onComplete(formData);
    };

    return (
        <div className="container" style={{ maxWidth: '600px', paddingTop: '40px' }}>
            <div style={{ marginBottom: '32px' }}>
                <Button variant="secondary" onClick={onCancel} style={{ marginBottom: '20px' }}>← Back</Button>
                <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Define your home</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Step {step} of 4</p>
                <div style={{
                    height: '4px',
                    backgroundColor: '#e5e5e5',
                    borderRadius: '2px',
                    marginTop: '16px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        height: '100%',
                        width: `${(step / 4) * 100}%`,
                        backgroundColor: 'var(--color-accent)',
                        transition: 'width 0.3s ease'
                    }} />
                </div>
            </div>

            <Card>
                {step === 1 && (
                    <div className="fade-in">
                        <h2 style={{ marginBottom: '24px' }}>How big is your place?</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <Input
                                    label="Approximate Size (m²)"
                                    type="number"
                                    value={formData.size}
                                    onChange={(e) => setFormData({ ...formData, size: parseInt(e.target.value) })}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontWeight: '500' }}>Bedrooms</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Button variant="secondary" onClick={() => setFormData(p => ({ ...p, rooms: Math.max(0, p.rooms - 1) }))}>-</Button>
                                    <span style={{ fontSize: '20px', fontWeight: '600', width: '24px', textAlign: 'center' }}>{formData.rooms}</span>
                                    <Button variant="secondary" onClick={() => setFormData(p => ({ ...p, rooms: p.rooms + 1 }))}>+</Button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontWeight: '500' }}>Bathrooms</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Button variant="secondary" onClick={() => setFormData(p => ({ ...p, bathrooms: Math.max(0, p.bathrooms - 1) }))}>-</Button>
                                    <span style={{ fontSize: '20px', fontWeight: '600', width: '24px', textAlign: 'center' }}>{formData.bathrooms}</span>
                                    <Button variant="secondary" onClick={() => setFormData(p => ({ ...p, bathrooms: p.bathrooms + 1 }))}>+</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="fade-in">
                        <h2 style={{ marginBottom: '24px' }}>How often do you need us?</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                            <OptionCard
                                icon={Calendar}
                                label="Weekly"
                                subLabel="Save 20%"
                                selected={formData.frequency === 'weekly'}
                                onClick={() => setFormData({ ...formData, frequency: 'weekly' })}
                            />
                            <OptionCard
                                icon={Calendar}
                                label="Bi-weekly"
                                subLabel="Save 15%"
                                selected={formData.frequency === 'biweekly'}
                                onClick={() => setFormData({ ...formData, frequency: 'biweekly' })}
                            />
                            <OptionCard
                                icon={Calendar}
                                label="One-time"
                                subLabel="Standard pricing"
                                selected={formData.frequency === 'onetime'}
                                onClick={() => setFormData({ ...formData, frequency: 'onetime' })}
                            />
                        </div>

                        {formData.frequency !== 'onetime' && (
                            <div className="fade-in" style={{ marginTop: '32px' }}>
                                <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Commitment Duration</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                                    <div
                                        onClick={() => setFormData({ ...formData, subscriptionDuration: 'monthly' })}
                                        style={{
                                            padding: '16px',
                                            borderRadius: '12px',
                                            border: `2px solid ${formData.subscriptionDuration === 'monthly' ? 'var(--color-accent)' : 'var(--color-border)'}`,
                                            backgroundColor: formData.subscriptionDuration === 'monthly' ? 'rgba(0, 113, 227, 0.05)' : 'white',
                                            cursor: 'pointer',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>Monthly</div>
                                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Standard</div>
                                    </div>
                                    <div
                                        onClick={() => setFormData({ ...formData, subscriptionDuration: 'quarterly' })}
                                        style={{
                                            padding: '16px',
                                            borderRadius: '12px',
                                            border: `2px solid ${formData.subscriptionDuration === 'quarterly' ? 'var(--color-accent)' : 'var(--color-border)'}`,
                                            backgroundColor: formData.subscriptionDuration === 'quarterly' ? 'rgba(0, 113, 227, 0.05)' : 'white',
                                            cursor: 'pointer',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>Quarterly</div>
                                        <div style={{ fontSize: '12px', color: '#34c759', fontWeight: '500' }}>Save 5%</div>
                                    </div>
                                    <div
                                        onClick={() => setFormData({ ...formData, subscriptionDuration: 'annual' })}
                                        style={{
                                            padding: '16px',
                                            borderRadius: '12px',
                                            border: `2px solid ${formData.subscriptionDuration === 'annual' ? 'var(--color-accent)' : 'var(--color-border)'}`,
                                            backgroundColor: formData.subscriptionDuration === 'annual' ? 'rgba(0, 113, 227, 0.05)' : 'white',
                                            cursor: 'pointer',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>Annual</div>
                                        <div style={{ fontSize: '12px', color: '#34c759', fontWeight: '500' }}>Save 10%</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {step === 3 && (
                    <div className="fade-in">
                        <h2 style={{ marginBottom: '24px' }}>Custom Details</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontWeight: '500' }}>How many hours do you need?</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Button variant="secondary" onClick={() => setFormData(p => ({ ...p, manualHours: Math.max(1, p.manualHours - 0.5) }))}>-</Button>
                                    <span style={{ fontSize: '20px', fontWeight: '600', width: '60px', textAlign: 'center' }}>{formData.manualHours}h</span>
                                    <Button variant="secondary" onClick={() => setFormData(p => ({ ...p, manualHours: p.manualHours + 0.5 }))}>+</Button>
                                </div>
                                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>We recommend 3 hours for your size.</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontWeight: '500' }}>Preferred Time</label>
                                <select
                                    value={formData.preferredTime}
                                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                                    style={{
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--color-border)',
                                        fontSize: '16px',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="Morning (8am - 12pm)">Morning (8am - 12pm)</option>
                                    <option value="Afternoon (12pm - 4pm)">Afternoon (12pm - 4pm)</option>
                                    <option value="Evening (4pm - 8pm)">Evening (4pm - 8pm)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="fade-in">
                        <h2 style={{ marginBottom: '24px' }}>Summary</h2>
                        <div style={{
                            backgroundColor: 'var(--color-surface)',
                            padding: '20px',
                            borderRadius: '12px',
                            marginBottom: '24px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Property</span>
                                <span style={{ fontWeight: '600' }}>{formData.rooms} Bed, {formData.bathrooms} Bath</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Size</span>
                                <span style={{ fontWeight: '600' }}>{formData.size} m²</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Frequency</span>
                                <span style={{ fontWeight: '600', textTransform: 'capitalize' }}>
                                    {formData.frequency}
                                    {formData.frequency !== 'onetime' && ` (${formData.subscriptionDuration})`}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Duration</span>
                                <span style={{ fontWeight: '600' }}>{formData.manualHours} hours</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Time</span>
                                <span style={{ fontWeight: '600' }}>{formData.preferredTime}</span>
                            </div>
                        </div>

                        <div
                            onClick={() => setFormData(p => ({ ...p, includeInsurance: !p.includeInsurance }))}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '16px',
                                borderRadius: '12px',
                                border: `2px solid ${formData.includeInsurance ? 'var(--color-accent)' : 'var(--color-border)'}`,
                                backgroundColor: formData.includeInsurance ? 'rgba(0, 113, 227, 0.05)' : 'white',
                                cursor: 'pointer',
                                marginBottom: '24px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: formData.includeInsurance ? 'var(--color-accent)' : '#f5f5f7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: formData.includeInsurance ? 'white' : 'var(--color-text-secondary)'
                            }}>
                                <Shield size={20} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', marginBottom: '4px' }}>Protect your home</div>
                                <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                                    Insurance for cleaning and contents
                                </div>
                            </div>
                            <div style={{ fontWeight: '600', color: 'var(--color-accent)' }}>+€1.00</div>
                        </div>

                        <div
                            onClick={() => setFormData(p => ({ ...p, cleanerProvidesProducts: !p.cleanerProvidesProducts }))}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '16px',
                                borderRadius: '12px',
                                border: `2px solid ${formData.cleanerProvidesProducts ? 'var(--color-accent)' : 'var(--color-border)'}`,
                                backgroundColor: formData.cleanerProvidesProducts ? 'rgba(0, 113, 227, 0.05)' : 'white',
                                cursor: 'pointer',
                                marginBottom: '24px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: formData.cleanerProvidesProducts ? 'var(--color-accent)' : '#f5f5f7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: formData.cleanerProvidesProducts ? 'white' : 'var(--color-text-secondary)'
                            }}>
                                <Sparkles size={20} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', marginBottom: '4px' }}>Cleaning Products</div>
                                <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                                    {formData.cleanerProvidesProducts ? 'Cleaner brings products (+€2.00)' : 'I will provide products'}
                                </div>
                            </div>
                            {formData.cleanerProvidesProducts && <div style={{ fontWeight: '600', color: 'var(--color-accent)' }}>+€2.00</div>}
                        </div>

                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', textAlign: 'center' }}>
                            We'll match you with the best cleaners based on these details.
                        </p>
                    </div>
                )}

                <div style={{ marginTop: '32px' }}>
                    <Button onClick={handleNext} style={{ width: '100%' }}>
                        {step === 4 ? 'Find Cleaners' : 'Continue'}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Onboarding;
