import React from 'react';
import Button from '../components/Button';
import { CheckCircle } from 'lucide-react';

const BookingSuccess = ({ cleaner, onHome }) => {
    return (
        <div className="container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            padding: '20px'
        }}>
            <div style={{ marginBottom: '24px' }}>
                <CheckCircle size={80} color="#34c759" />
            </div>

            <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Booking Confirmed!</h1>

            <p style={{
                fontSize: '18px',
                color: 'var(--color-text-secondary)',
                marginBottom: '40px',
                maxWidth: '400px'
            }}>
                You have successfully booked <strong>{cleaner?.name || 'your cleaner'}</strong>.
                We have sent a confirmation email with all the details.
            </p>

            <Button onClick={onHome} style={{ width: '100%', maxWidth: '300px' }}>
                Return to Home
            </Button>
        </div>
    );
};

export default BookingSuccess;
