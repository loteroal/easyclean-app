import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Matching from './pages/Matching';
import BookingSuccess from './pages/BookingSuccess';
import { supabase } from './supabaseClient';

function App() {
    const [currentView, setCurrentView] = useState('login'); // 'login', 'home', 'onboarding', 'matching', 'booking-success'
    const [requestData, setRequestData] = useState(null);
    const [selectedCleaner, setSelectedCleaner] = useState(null);
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) setCurrentView('home');
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) {
                setCurrentView('home');
            } else {
                setCurrentView('login');
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = () => {
        // Handled by useEffect
    };

    const handleNavigate = (view) => {
        setCurrentView(view);
    };

    const handleOnboardingComplete = (data) => {
        setRequestData(data);
        setCurrentView('matching');
    };

    const handleCleanerSelect = (cleaner) => {
        setSelectedCleaner(cleaner);
        setCurrentView('booking-success');
    };

    return (
        <div className="app-container">
            {currentView === 'login' && <Login onLogin={handleLogin} />}

            {currentView === 'home' && (
                <Home onNavigate={handleNavigate} />
            )}

            {currentView === 'onboarding' && (
                <Onboarding
                    onComplete={handleOnboardingComplete}
                    onCancel={() => setCurrentView('home')}
                />
            )}

            {currentView === 'matching' && (
                <Matching
                    requestData={requestData}
                    onBack={() => setCurrentView('onboarding')}
                    onSelect={handleCleanerSelect}
                />
            )}

            {currentView === 'booking-success' && (
                <BookingSuccess
                    cleaner={selectedCleaner}
                    onHome={() => setCurrentView('home')}
                />
            )}
        </div>
    );
}

export default App;
