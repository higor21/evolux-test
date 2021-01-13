import React from 'react';
import ReactDOM from 'react-dom';
import './global_styles.scss';
import App from './App';
import server from './server';

server();

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
