import React, { useEffect, useContext } from 'react';
import { Store, actions } from './store/Store';

import Header from './components/Header';

export const BEER_RECIPES_API_URL = 'https://api.punkapi.com/v2/beers';

export default function App(props: any): JSX.Element {
  const { state, dispatch } = useContext(Store);
 
  useEffect(() => {
    const { recipes } = state;
    const fetchItems = () => {
          recipes && recipes.length === 0 && fetchDataAction();
      };
      fetchItems();
  });

  const fetchDataAction = async () => {
      const response = await fetch(BEER_RECIPES_API_URL);
      const dataJson = await response.json();
      return dispatch({
          type: actions.FETCH_DATA,
          payload: dataJson
      });
  }
  
  return (
    <div className="ui container">
      <h1 className="ui center aligned icon header">
        <i className="beer icon"></i>
        <div className="content">
          Beer brew recipes
          <div className="sub header">Pick your favorite</div>  
        </div>
      </h1>
      <Header />
      {props.children}
    </div>
  );
};
