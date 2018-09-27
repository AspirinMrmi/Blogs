import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Parent from './demo3/demo3_4/index'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Parent />, document.getElementById('root'));
registerServiceWorker();
