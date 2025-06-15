import React from 'react';
import { Application } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.5';
import { CustomPlayer } from '../components/CustomPlayer';

export const CustomPlayerPage: React.FC = () => {
    // 创建 Pixel Streaming 应用实例
    const application = new Application({
        stream: {
            videoElement: document.createElement('video'),
            autoPlay: true,
            controls: false
        }
    });

    return (
        <div className="custom-player-page">
            <CustomPlayer application={application} />
        </div>
    );
}; 