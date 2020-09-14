import React from 'react';
import Link from 'next/link';
import '../styles/error.css'

const errorPage = () => (
    <div className="errorPageContainer">
        <h1>לא נמצא נתיב</h1>
        <p><Link href="/"><a>תחזור לאתר</a></Link></p>
    </div>
);

export default errorPage;