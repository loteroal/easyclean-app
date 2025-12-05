import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card from './Card';

const Calendar = ({ events = [], onDayClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(currentDate);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
    };

    const getEventsForDay = (day) => {
        return events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === day &&
                eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getFullYear() === currentDate.getFullYear();
        });
    };

    const renderDays = () => {
        const daysArray = [];
        for (let i = 0; i < firstDay; i++) {
            daysArray.push(<div key={`empty-${i}`} style={{ height: '40px' }}></div>);
        }
        for (let i = 1; i <= days; i++) {
            const dayEvents = getEventsForDay(i);
            const isEventDay = dayEvents.length > 0;
            const isCurrentDay = isToday(i);

            daysArray.push(
                <div
                    key={i}
                    onClick={() => onDayClick && onDayClick(new Date(currentDate.getFullYear(), currentDate.getMonth(), i), dayEvents)}
                    style={{
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        backgroundColor: isCurrentDay ? '#0071e3' : (isEventDay ? '#e8f2ff' : 'transparent'),
                        color: isCurrentDay ? 'white' : (isEventDay ? '#0071e3' : 'inherit'),
                        fontWeight: (isCurrentDay || isEventDay) ? '600' : 'normal',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    {i}
                </div>
            );
        }
        return daysArray;
    };

    return (
        <Card style={{ padding: '20px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <h3 style={{ margin: 0, fontSize: '18px' }}>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={prevMonth}
                        style={{
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={nextMonth}
                        style={{
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '5px',
                textAlign: 'center',
                marginBottom: '10px'
            }}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                    <div key={day} style={{
                        fontSize: '12px',
                        color: 'var(--color-text-secondary)',
                        fontWeight: '500'
                    }}>
                        {day}
                    </div>
                ))}
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '5px'
            }}>
                {renderDays()}
            </div>
        </Card>
    );
};

export default Calendar;
