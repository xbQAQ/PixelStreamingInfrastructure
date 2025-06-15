import React, { useState, useEffect } from 'react';
import { PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.5';
import { Application, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.5';

interface CustomPlayerProps {
    application: Application;
}

export const CustomPlayer: React.FC<CustomPlayerProps> = ({ application }) => {
    const [sliderValue, setSliderValue] = useState(0);
    const [showConsole, setShowConsole] = useState(false);
    const [streamingSettings, setStreamingSettings] = useState({
        maxBitrate: 1000000,
        minBitrate: 100000,
        maxFPS: 60,
        resolution: '1920x1080'
    });

    useEffect(() => {
        // 初始化 Pixel Streaming
        const pixelStreaming = new PixelStreaming(application);
        
        // 监听滑条值变化
        const handleSliderChange = (value: number) => {
            // 向 UE 发送数据
            pixelStreaming.emitUIInteraction({
                type: 'slider',
                value: value
            });
        };

        return () => {
            // 清理工作
        };
    }, [application]);

    return (
        <div className="custom-player">
            <div className="video-container">
                {/* 视频流将在这里显示 */}
            </div>
            
            <div className="controls">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={(e) => {
                        const newValue = parseInt(e.target.value);
                        setSliderValue(newValue);
                        handleSliderChange(newValue);
                    }}
                    className="slider"
                />
                
                <button onClick={() => setShowConsole(!showConsole)}>
                    {showConsole ? '隐藏控制台' : '显示控制台'}
                </button>
            </div>

            {showConsole && (
                <div className="console-panel">
                    <h3>Pixel Streaming 设置</h3>
                    <div className="setting">
                        <label>最大比特率 (bps)</label>
                        <input
                            type="number"
                            value={streamingSettings.maxBitrate}
                            onChange={(e) => setStreamingSettings({
                                ...streamingSettings,
                                maxBitrate: parseInt(e.target.value)
                            })}
                        />
                    </div>
                    <div className="setting">
                        <label>最小比特率 (bps)</label>
                        <input
                            type="number"
                            value={streamingSettings.minBitrate}
                            onChange={(e) => setStreamingSettings({
                                ...streamingSettings,
                                minBitrate: parseInt(e.target.value)
                            })}
                        />
                    </div>
                    <div className="setting">
                        <label>最大帧率</label>
                        <input
                            type="number"
                            value={streamingSettings.maxFPS}
                            onChange={(e) => setStreamingSettings({
                                ...streamingSettings,
                                maxFPS: parseInt(e.target.value)
                            })}
                        />
                    </div>
                    <div className="setting">
                        <label>分辨率</label>
                        <select
                            value={streamingSettings.resolution}
                            onChange={(e) => setStreamingSettings({
                                ...streamingSettings,
                                resolution: e.target.value
                            })}
                        >
                            <option value="1920x1080">1920x1080</option>
                            <option value="1280x720">1280x720</option>
                            <option value="854x480">854x480</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

// 添加样式
const styles = `
.custom-player {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #000;
}

.video-container {
    width: 100%;
    height: calc(100% - 100px);
}

.controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    gap: 20px;
}

.slider {
    flex: 1;
    height: 20px;
}

.console-panel {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 300px;
    background: rgba(0, 0, 0, 0.9);
    padding: 20px;
    border-radius: 8px;
    color: white;
}

.setting {
    margin-bottom: 15px;
}

.setting label {
    display: block;
    margin-bottom: 5px;
}

.setting input,
.setting select {
    width: 100%;
    padding: 5px;
    background: #333;
    border: 1px solid #555;
    color: white;
    border-radius: 4px;
}
`;

// 添加样式到文档
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet); 