/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { Store } from '../store/Store';
import { IRecipe } from '../Interfaces';
import { useParams } from "@reach/router"

interface IIngridient {
    name: string,
    amount: {
        value: number,
        unit: string
    },
    add?: string,
    attribute?: string
};
export default function Recipe(): JSX.Element {
    
    const { state } = useContext(Store);
    const params = useParams();
    let recipe: IRecipe = state.recipes[0];
    
    if (params.recipeId) {
        const recipeId: number = parseInt(params.recipeId, 10);
        recipe = state.recipes.find((item: IRecipe) => {
            return item.id === recipeId 
        });
    }
    
    const renderIngridients = (ingredients: IIngridient[], type: string): JSX.Element => {
        return (
            <table className="ui celled table stackable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Unit</th>
                        {type === 'hop' ?
                            <>
                                <th>Timing</th>
                                <th>Attribute</th>
                            </>
                            : null
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        ingredients.map((item: IIngridient, index: number) => {
                            return (
                                <tr key={item.name + index}>
                                    <td data-label="Name">{item.name}</td>
                                    <td data-label="Amount">{item.amount.value}</td>
                                    <td data-label="Unit">{item.amount.unit}</td>
                                    { type === 'hop' ?
                                        <>
                                            <td data-label="Timing">{item.add}</td>
                                            <td data-label="Attribute">{item.attribute}</td>
                                        </>
                                        : null
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    };


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
                        <p><strong>Food pairing:</strong> {recipe.food_pairing.join(". ")}</p>
                        <p><strong>Ibu:</strong> { recipe.ibu } <strong>Abv:</strong> { recipe.abv }</p>
                        <p><strong>Malts:</strong></p>
                        {renderIngridients(recipe.ingredients.malt, 'malt')}
                        <p><strong>Hops:</strong></p>
                        {renderIngridients(recipe.ingredients.hops, 'hop')}
                        <p><strong>Tips:</strong> {recipe.brewers_tips}</p>
                        <p><strong>Creator:</strong> {recipe.contributed_by}</p>
                    </div>
                </div>
            </div>
        </div>
    );
    
};


