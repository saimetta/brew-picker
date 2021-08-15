/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext, lazy, Suspense } from 'react';
import { Store } from '../store/Store';
import { IRecipe } from '../Interfaces';
import { Link } from '@reach/router';

const views = {
    RECIPES: 'RECIPES',
    FAVORITES: 'FAVORITES',
    DETAILS: 'DETAILS'
};

//Lazy loading components, see the usage of suspense for the fallback
const Recipes = lazy<any>(() => import('./Recipes'));
const Recipe = lazy<any>(() => import('./Recipe'));

const ViewSelector = (): JSX.Element => {
    const [currentView, setCurrentView] = useState(views.RECIPES);
    const { state } = useContext(Store);
    const { selected } = state;
    const recipe: IRecipe = state.recipes[selected];

    useEffect(() => {
        setCurrentView(views.DETAILS);
    }, [state.selected]);

    const renderView = (currentView: string): JSX.Element => {
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
    };

    const renderLoading = (): JSX.Element => {
        return (
            <h4 className="ui header center aligned">
                Loading ...
            </h4>
        );
    }

    return (
        <React.Fragment>
            <div className="ui secondary pointing menu">
                <Link
                    to="/"
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentView(views.RECIPES);
                    }}
                    className={`item ${currentView === views.RECIPES ? 'active' : ''}`}
                >
                    Recipes
                </Link>
                <Link
                    to="/favorites"
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentView(views.FAVORITES);
                    }}
                    className={`item ${currentView === views.FAVORITES ? 'active' : ''}`}
                >
                    Favorites
                </Link>
                <Link
                    to="/details"
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentView(views.DETAILS);
                    }}
                    className={`item ${currentView === views.DETAILS ? 'active' : ''}`}
                >
                    Details
                </Link>
            </div>
            <Suspense fallback={renderLoading}>
                {renderView(currentView)}
            </Suspense>
        </React.Fragment>

    );
};

export default ViewSelector;


