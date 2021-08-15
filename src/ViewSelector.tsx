/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from 'react';
import { Store } from './Store';
import Recipes from './Recipes';
import Recipe from './Recipe';
import { IRecipe } from './Interfaces';

const views = {
    RECIPES: 'RECIPES',
    FAVORITES: 'FAVORITES',
    DETAILS: 'DETAILS'
};

const ViewSelector = (): JSX.Element => {
    const [currentView, setCurrentView] = useState(views.RECIPES);
    const { state } = useContext(Store);
    const { selected } = state;
    const recipe: IRecipe = state.recipes[selected];

    useEffect(() => {
        setCurrentView(views.DETAILS);
    }, [state.selected]);

    function renderView(currentView: string): JSX.Element {
        switch (currentView) {
            case views.RECIPES:
                return <Recipes />;
            case views.FAVORITES:
                return <Recipes favorites={true} />;
            case views.DETAILS:
                return <Recipe recipe={recipe} />
            default:
                return <Recipes />;
        }
    }

    console.log('current view: ', currentView);
    
    return (
        <React.Fragment>
            <div className="ui secondary pointing menu">
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentView(views.RECIPES);
                    }}
                    className={`item ${currentView === views.RECIPES ? 'active' : ''}`}
                >
                    Recipes
                </a>
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentView(views.FAVORITES);
                    }}
                    className={`item ${currentView === views.FAVORITES ? 'active' : ''}`}
                >
                    Favorites
                </a>
                <a
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentView(views.DETAILS);
                    }}
                    className={`item ${currentView === views.DETAILS ? 'active' : ''}`}
                >
                    Details
                </a>
            </div>
            <div className="ui segment">
                { renderView(currentView) }
            </div>
        </React.Fragment>

    );
};

export default ViewSelector;


