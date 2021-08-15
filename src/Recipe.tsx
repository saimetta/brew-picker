import React from 'react';
import { IRecipe } from './Interfaces';

interface IRecipeProps {
    recipe: IRecipe
};

export default function Recipe(props: IRecipeProps): JSX.Element {
    const recipe: IRecipe = props.recipe;
    if (!recipe) return <></>;
    return (
        <div className="card recipe" key={ recipe.id }>
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
                    Abv: {recipe.abv} Ibu: { recipe.ibu}
                </span>
            </div>
        </div>
    );
    
};
