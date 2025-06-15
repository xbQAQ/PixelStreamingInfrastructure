// Copyright Epic Games, Inc. All Rights Reserved.

import './player';
import { PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.5';

declare global {
    interface Window {
        pixelStreaming: PixelStreaming;
    }
}

let pixelStreamingPlayer: PixelStreaming | null = null;

console.log('[调试] index.ts 脚本已加载');

document.addEventListener('DOMContentLoaded', () => {
    console.log('[调试] DOMContentLoaded 事件触发');
    // 期望 player.js 会在某个时机设置 window.pixelStreaming
    const checkPlayerReady = setInterval(() => {
        if (window.pixelStreaming) {
            console.log('[调试] Pixel Streaming player 已初始化:', window.pixelStreaming);
            pixelStreamingPlayer = window.pixelStreaming;
            setupSliderAndPlayerListeners();
            clearInterval(checkPlayerReady);
        } else {
            console.log('[调试] window.pixelStreaming 尚未初始化');
        }
    }, 100);
});

function setupSliderAndPlayerListeners() {
    const slider = document.getElementById('customSlider') as HTMLInputElement | null;
    if (slider) {
        console.log('[调试] 找到滑条元素 customSlider');
        slider.addEventListener('input', function(e: Event) {
            const target = e.target as HTMLInputElement;
            const value = parseFloat(target.value);
            console.log('[调试] 滑条 input 事件触发，当前值：', value);
            
            if (!pixelStreamingPlayer) {
                console.error('[调试] PixelStreaming player 未初始化，无法发送消息');
                return;
            }

            try {
                const data = {
                    focalLength: value
                };
                console.log('[调试] 即将发送数据到 UE：', data);
                pixelStreamingPlayer.emitUIInteraction(data);
                console.log('[调试] 已发送 focalLength 数据到 UE:', value);
            } catch (error) {
                console.error('[调试] 发送数据到 UE 失败:', error);
            }
        });
    } else {
        console.error('[调试] 未找到滑条元素 customSlider!');
    }
    
    if (pixelStreamingPlayer) {
        pixelStreamingPlayer.addEventListener('webRtcConnected', () => {
            console.log('[调试] Pixel Streaming 已连接');
        });

        pixelStreamingPlayer.addEventListener('webRtcDisconnected', () => {
            console.log('[调试] Pixel Streaming 已断开');
        });

        pixelStreamingPlayer.addEventListener('webRtcFailed', (error: any) => {
            console.error('[调试] Pixel Streaming 连接失败:', error);
        });
    } else {
        console.error('[调试] pixelStreamingPlayer 为空，无法绑定事件');
    }
} 