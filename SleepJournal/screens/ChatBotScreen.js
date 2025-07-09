import React from 'react';
import { WebView } from 'react-native-webview';

export default function ChatBotScreen() {
  const injectedJS = `
    if (document.querySelector('meta[name=viewport]')) {
      document.querySelector('meta[name=viewport]').setAttribute('content', 'width=device-width, initial-scale=0.7, maximum-scale=1.0, user-scalable=yes');
    } else {
      var meta = document.createElement('meta');
      meta.setAttribute('name', 'viewport');
      meta.setAttribute('content', 'width=device-width, initial-scale=0.7, maximum-scale=1.0, user-scalable=yes');
      document.head.appendChild(meta);
    }
    true;
  `;

  return (
    <WebView
      source={{ uri: 'https://cdn.botpress.cloud/webchat/v3.1/shareable.html?configUrl=https://files.bpcontent.cloud/2025/07/09/17/20250709175143-V8N5IO0X.json' }}
      style={{ flex: 1 }}
      injectedJavaScript={injectedJS}
      scalesPageToFit={false}
    />
  );
}