import ReactDOM from 'react-dom';

import 'normalize.css';
import './index.css';

import App from './App';

import { AppRouter } from './routers/AppRouter';

ReactDOM.render(<AppRouter />, document.getElementById('root'));
