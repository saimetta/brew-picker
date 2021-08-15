import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '@reach/router';


const views = {
    RECIPES: '/',
    FAVORITES: '/favorites',
    DETAILS: '/details'
};

const Header = (): JSX.Element => {
    const [currentView, setCurrentView] = useState(views.RECIPES);
    const location = useLocation();

    useEffect(() => {
        const setView = (): void => {
            try {
                const viewFromPath = "/" + location.pathname.split("/")[1];
                setCurrentView(viewFromPath);
            } catch (err) {
                console.error("Invalid URL ", location.pathname);
                setCurrentView(views.RECIPES);
            }
        };
        setView();
    });
    
    return (
        <React.Fragment>
            <div className="ui secondary pointing menu">
                <Link
                    to="/"
                    onClick={(e) => {
                        setCurrentView(views.RECIPES);
                    }}
                    className={`item ${currentView === views.RECIPES ? 'active' : ''}`}
                >
                    Recipes
                </Link>
                <Link
                    to="/favorites"
                    onClick={(e) => {
                        setCurrentView(views.FAVORITES);
                    }}
                    className={`item ${currentView === views.FAVORITES ? 'active' : ''}`}
                >
                    Favorites
                </Link>
                <Link
                    to="/details/1"
                    onClick={(e) => {
                        setCurrentView(views.DETAILS);
                    }}
                    className={`item ${currentView === views.DETAILS ? 'active' : ''}`}
                >
                    Details
                </Link>
            </div>
        </React.Fragment>

    );
};

export default Header;


