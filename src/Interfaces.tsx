export interface IRecipe {
  id: number,
  name: string,
  tagline: string,
  description: string,
  image_url: string,
  abv: number,
  ibu: number,
  volume: {
    value: number,
    unit: string
  },
  ingredients: {
    malt: [
      {
        name: string,
        amount: {
          value: number,
          unit: string
        }
      }
    ],
    hops: [
      {
        name: string,
        amount: {
          value: number,
          unit: string
        },
        add: string,
        attribute: string,
        yeast: string
      }
    ]
  },
  food_pairing: [string],
  brewers_tips: string,
  contributed_by: string
};

export interface IState {
  recipes: Array<any>,
  favorites: Array<any>,
  selected: number
};

export interface IAction {
  type: string,
  payload: any
};