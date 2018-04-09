import React from 'react'
import { render } from 'react-dom'
import App from './containers/App';
import Panel from './containers/Panel';
import registerServiceWorker from './registerServiceWorker';
render(
    <App />
    ,document.getElementById("root")
)
registerServiceWorker();
// React 中的 registerServiceWorker是干什么的？
// 看下注释你就知道了，主要是用于在生产环境中为用户在本地创建一个service worker 来缓存资源到本地，提升应用的访问速度，具体看下面这段注释。
// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.
