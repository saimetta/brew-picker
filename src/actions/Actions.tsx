import React from 'react';
import { actions } from '../store/Store';
import { IAction, IRecipe } from '../Interfaces';
import { NavigateFn } from '@reach/router';

export const BEER_RECIPES_API_URL = 'https://api.punkapi.com/v2/beers';


export const fetchDataAction = async (dispatch: React.Dispatch<IAction>) => {
    const response = await fetch(BEER_RECIPES_API_URL);
    const dataJson = await response.json();
    return dispatch({
        type: actions.FETCH_DATA,
        payload: dataJson
    });
};

export const addToFavorites = (dispatch: React.Dispatch<IAction>, recipe: IRecipe): void => {
    dispatch({
        type: actions.ADD_FAVORITE,
        payload: recipe
    });
};

export const removeFromFavorites = (dispatch: React.Dispatch<IAction>, recipe: IRecipe): void => {
    dispatch({
        type: actions.REMOVE_FAVORITE,
        payload: recipe
    });
};

export const selectRecipe = (dispatch: React.Dispatch<IAction>, recipe: IRecipe, navigate: NavigateFn): void => {
    dispatch({
        type: actions.SET_SELECTED,
        payload: recipe.id
    });
    navigate(`/details/${recipe.id}`);
};