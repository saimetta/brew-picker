import { useContext, useEffect, useState } from 'react';
import { Store, actions } from '../store/Store';
import { IRecipe, IAction } from '../Interfaces';
import { useNavigate } from "@reach/router"


export const BEER_RECIPES_API_URL = 'https://api.punkapi.com/v2/beers';

interface IRecipesProps {
    favorites?: boolean
};

export default function Recipes(props: IRecipesProps): JSX.Element {
    const { state, dispatch } = useContext(Store);
    const [items, setItems] = useState([]);
    const { favorites, recipes } = state;
    const navigate = useNavigate()

    useEffect(() => {
        const fetchItems = () => {
            if (props.favorites) {
                setItems(favorites);
            } else {
                setItems(recipes);
            }
        };
        fetchItems();
    });

    const renderItems = (): JSX.Element => {
        const recipes = items.map((recipe: IRecipe) => {
            return renderRecipe(recipe);
        });
        if (props.favorites && items.length === 0) {
            return <h3 className="ui header center aligned">There isn't any favorites yet</h3>
        }
        return (
            <div className="ui link cards">
            { recipes }
            </div>
        );
    };

    const isFavorite = (recipe: IRecipe): boolean => {
        return state.favorites.includes(recipe);
    };

    const toggleFavorite = (recipe: IRecipe): IAction => {
        const isFav = isFavorite(recipe);
        return dispatch({
            type: !isFav ? actions.ADD_FAVORITE : actions.REMOVE_FAVORITE,
            payload: recipe
        });
    };

    const onSelect = (recipe: IRecipe): void => {
        dispatch({
            type: actions.SET_SELECTED,
            payload: recipe.id
        });
        navigate(`/details/${recipe.id}`);
    };

    const renderRecipe = (recipe: IRecipe): JSX.Element => {
        const isFav: boolean = isFavorite(recipe);
        return (
            <div
                className="card recipe"
                key={recipe.id}
            >
                <div className="image">
                    <img src={recipe.image_url} alt={ recipe.name }/>
                </div>
                <div className="content">
                    <div className="header">{ recipe.name }</div>
                    <div className="description">
                    { recipe.description }
                    </div>
                </div>
                <div className="extra content">
                    <span className="right floated">
                        <button
                            className="ui button small"
                            onClick={ () => onSelect(recipe)}
                        >View recipe</button>
                    </span>
                </div>
                <div className="extra content">
                    <span className="right floated">
                        Abv: {recipe.abv} Ibu: { recipe.ibu}
                    </span>
                    <span className="left floated star">
                    <i
                        onClick={() => { toggleFavorite(recipe) }}
                        className={`star icon ${isFav ? 'yellow': ''}`}
                    ></i>
                    {isFav ? 'In Favorites': 'Favorite'}
                    </span>
                </div>
            </div>
        );
    };

    if (!recipes) {
        return <div>Loading...</div>
    }
    return renderItems();
};
