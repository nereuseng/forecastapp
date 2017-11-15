import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'component/App.js';

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
       module.hot.accept('component/App', () => { render(App) })
     }