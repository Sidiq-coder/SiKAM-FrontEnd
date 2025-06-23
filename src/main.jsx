import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from '@/context/auth-context/provider';
import App from './App.jsx';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AuthContextProvider>
			<App />
			<ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
		</AuthContextProvider>
	</StrictMode>
);
