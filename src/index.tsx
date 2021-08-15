import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoreProvider } from './store/Store';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';
import { Router, RouteComponentProps } from '@reach/router';
import reportWebVitals from './reportWebVitals';

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) => props.pageComponent;

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Router>
        <App path='/'>
          <RouterPage pageComponent={<Recipes />} path='/' />
          <RouterPage pageComponent={<Recipes favorites={true}/>} path='/favorites' />
          <RouterPage pageComponent={ <Recipe />} path='/details/:recipeId'/>
        </App>
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
