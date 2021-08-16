import { useEffect, useContext } from 'react';
import { Store } from './store/Store';
import { fetchDataAction } from './actions/Actions';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';

export const BEER_RECIPES_API_URL = 'https://api.punkapi.com/v2/beers';

export default function App(props: any): JSX.Element {
  const { state, dispatch } = useContext(Store);
 
  useEffect(() => {
    const { recipes } = state;
    const fetchItems = () => {
          recipes && recipes.length === 0 && fetchDataAction(dispatch);
      };
      fetchItems();
  });

  return (
    <div className="ui container">
      <h1 className="ui center aligned icon header">
        <i className="beer icon"></i>
        <div className="content">
          Beer brew recipes
          <div className="sub header">Pick your favorite</div>  
        </div>
      </h1>
      <ScrollToTop />
      <Header />
      {props.children}
    </div>
  );
};
