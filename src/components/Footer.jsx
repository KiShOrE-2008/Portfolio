import React from 'react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p>&copy; {new Date().getFullYear()} Kishore K V. All rights reserved.</p>
                <p>Designed with ❤️ and secure code principles.</p>
            </div>
        </footer>
    );
}
