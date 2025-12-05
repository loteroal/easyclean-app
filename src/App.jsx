import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Matching from './pages/Matching';
import BookingSuccess from './pages/BookingSuccess';
import CleanerOnboarding from './pages/CleanerOnboarding';
import CleanerHome from './pages/CleanerHome';
import { supabase } from './supabaseClient';

function App() {
    const [currentView, setCurrentView] = useState('login'); // 'login', 'home', 'onboarding', 'matching', 'booking-success', 'cleaner-onboarding', 'cleaner-home'
    const [requestData, setRequestData] = useState(null);
    const [selectedCleaner, setSelectedCleaner] = useState(null);
    const [session, setSession] = useState(null);

    const handleSessionRouting = (session) => {
        if (!session) {
            setCurrentView('login');
            return;
        }

        const role = session.user.user_metadata.role;
        const onboardingComplete = session.user.user_metadata.onboarding_complete;

        if (role === 'cleaner') {
            if (onboardingComplete) {
                setCurrentView('cleaner-home');
            } else {
                setCurrentView('cleaner-onboarding');
            }
        } else {
            // Default to client home
            setCurrentView('home');
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            handleSessionRouting(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            handleSessionRouting(session);
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

    const handleCleanerOnboardingComplete = () => {
        setCurrentView('cleaner-home');
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

            {currentView === 'cleaner-onboarding' && (
                <CleanerOnboarding onComplete={handleCleanerOnboardingComplete} />
            )}

            {currentView === 'cleaner-home' && (
                <CleanerHome />
            )}
        </div>
    );
}

export default App;
