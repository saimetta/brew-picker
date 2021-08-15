import React, { useReducer } from 'react';
import { IState, IAction } from '../Interfaces';

const initialState: IState = {
    recipes: [],
    favorites: [],
    selected: 0
};

export const Store = React.createContext<IState | any>(initialState);

export const actions = {
    FETCH_DATA: 'FETCH_DATA',
    ADD_FAVORITE: 'ADD_FAVORITE',
    REMOVE_FAVORITE: 'REMOVE_FAVORITE',
    SET_SELECTED: 'SET_SELECTED'
};

function reducer(state: IState, action: IAction): IState {
    switch (action.type) {
        case actions.FETCH_DATA:
            return { ...state, recipes: action.payload };
        case actions.ADD_FAVORITE:
            return { ...state, favorites: [...state.favorites, action.payload] };
        case actions.REMOVE_FAVORITE:
            const filteredFavorites = state.favorites.filter(item => item.id !== action.payload.id);
            return { ...state, favorites: [...filteredFavorites] };
        case actions.SET_SELECTED:
            return { ...state, selected: action.payload };
        default:
            return state;
    }
};

export function StoreProvider(props: any): JSX.Element {
    const [ state, dispatch ] = useReducer(reducer, initialState);
    return <Store.Provider value={{state, dispatch}}>{ props.children }</Store.Provider>
};