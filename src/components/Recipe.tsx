/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { Store } from '../store/Store';
import { IRecipe } from '../Interfaces';
import { useParams } from "@reach/router"


export default function Recipe(): JSX.Element {
    
    const { state } = useContext(Store);
    const params = useParams();
    let recipe: IRecipe = state.recipes[0];
    const recipeId: number = parseInt(params.recipeId, 10);

    if (recipeId) {
        recipe = state.recipes.find((item: IRecipe) => {
            return item.id === recipeId 
        });
    }    
    if (!recipe) return <></>;
    return (
        <div className="ui items">
            <div className="item">
                <a href="#" className="ui small image">
                    <img src={recipe.image_url} alt={ recipe.name }/>
                </a>
                <div className="content">
                    <a href="#" className="header">{ recipe.name }</a>
                    <div className="description">
                        <p><strong>Description:</strong> {recipe.description}</p>
                        <p><strong>Tagline:</strong> {recipe.tagline}</p>
                        <p><strong>Food pairing:</strong> {recipe.food_pairing}</p>
                        <p><strong>Ibu:</strong> { recipe.ibu } <strong>Abv:</strong> { recipe.abv }</p>
                        <p><strong>Ingridients:</strong></p>
                        <div className="ui list">
                            <div className="item">Apples</div>
                            <div className="item">Pears</div>
                            <div className="item">Oranges</div>
                        </div>
                        <p><strong>Tips:</strong> {recipe.brewers_tips}</p>
                        <p><strong>Creator:</strong> {recipe.contributed_by}</p>
                    </div>
                </div>
            </div>
        </div>
    );
    
};
