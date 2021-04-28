import ReactDOM from 'react-dom';

import 'normalize.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import { AppRouter } from './routers/AppRouter';

ReactDOM.render(<AppRouter />, document.getElementById('root'));
