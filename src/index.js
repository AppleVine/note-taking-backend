const {app, PORT} = require('./server');

app.listen(PORT, () => {
	console.log("Express server is running on port " + PORT);
});
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './theme_1684548322906.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import NotesProvider from './contexts/NotesContext';




// Index.js = config & startup stuff about the ReactJS project 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	<BrowserRouter>
	{/* App as parent to Notes = App has no access to Notes data */}
	{/* <App>
		<NotesProvider /> 
	</App> */}
		<NotesProvider>
			<App />
		</NotesProvider>	
	</BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
