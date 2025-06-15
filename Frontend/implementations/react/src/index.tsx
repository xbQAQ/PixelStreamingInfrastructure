// Copyright Epic Games, Inc. All Rights Reserved.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CustomPlayerPage } from './pages/CustomPlayerPage';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <CustomPlayerPage />
    </React.StrictMode>
);
