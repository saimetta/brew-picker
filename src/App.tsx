import React from 'react';
import ViewSelector from './ViewSelector';


export default function App(): JSX.Element {
  return (
    <div className="ui container">
      <h1 className="ui center aligned icon header">
        <i className="beer icon"></i>
        <div className="content">
          Beer brew recipes
          <div className="sub header">Pick your favorite</div>  
        </div>
      </h1>
      <ViewSelector />
    </div>
  );
};
