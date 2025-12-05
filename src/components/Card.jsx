import React from 'react';

const Card = ({ children, className = '', style = {}, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`glass-panel ${className}`}
            style={{
                padding: '24px',
                ...style
            }}
        >
            {children}
        </div>
    );
};

export default Card;
