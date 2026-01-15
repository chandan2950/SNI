import React from 'react';

const StatusBadge = ({ status }) => {
    const getStatusStyle = () => {
        switch (status) {
            case 'New':
                return {
                    backgroundColor: '#3b82f6',
                    color: 'white',
                };
            case 'Contacted':
                return {
                    backgroundColor: '#eab308',
                    color: 'white',
                };
            case 'Interested':
                return {
                    backgroundColor: '#f97316',
                    color: 'white',
                };
            case 'Converted':
                return {
                    backgroundColor: '#22c55e',
                    color: 'white',
                };
            case 'Lost':
                return {
                    backgroundColor: '#ef4444',
                    color: 'white',
                };
            default:
                return {
                    backgroundColor: '#6b7280',
                    color: 'white',
                };
        }
    };

    const style = getStatusStyle();

    return (
        <span
            style={{
                ...style,
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600',
                display: 'inline-block',
                textAlign: 'center',
            }}
        >
            {status}
        </span>
    );
};

export default StatusBadge;
