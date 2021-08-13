# Food Web App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
The app is a simple personal recipe book web application where you can search through huge amount of recipes.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Use in order to launch the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## API

For fetching different information about the recipes the app is using [Spoonacular API](https://spoonacular.com/food-api). Every request includes a token which was generated upon registration on API official page. API calls are executed using `axios` library.

## Pages

Website consists of three main pages, they are located in _src/pages_ directory. Each of the pages has its own directory and is located on its own URL:

- **/** → home page where autocomplete recipe search is located - search through the recipes by typing in search input.
- **/recipe/`${RECIPE_ID}`** → recipe information page where recipe details are displayed (name, image, instructions, preparation time, number of servings). It also includes list of similar recipes.
- **/favorites** → page where user’s favorite recipes are displayed in a list. Data is stored in local storage.

For navigating between the pages package `react-router-dom` is used.

## Components

There are several components defined and used on different places across the website. They are located in _src/Components_ directory, where each of them has its own directory:

- `FavoriteItem`: displaying different properties of favorite recipe which are received through props
- `FavoritesList`: displays the list where every item is `FavoriteItem` component or message if data array is empty
- `Loading`: overlay shown when data from the API call is being loaded
- `RecipeItem`: displaying different properties of a recipe which are received through props
- `RecipeList`: displays the list where every item is `RecipeItem` component or message if data array is empty
- `Search`: contains input whose value and onChange function are sent through props
- `SimilarRecipes`: displays similar recipes sent through props or message if there is no similar recipe

## Styling

Stylesheet language Sass is used for implementing the styles (included `node-sass` library).\
Styles are implemented based on three main breakpoints:

- desktop - bigger than 1024px
- tablet - between 768px and 1024px
- mobile - smaller than 768px

## Testing

Tests are written using `jest` and `react-testing-library`.

All of the pages and components have a sub-directory named _\_\_test\_\__ where main test file for page/component is located. There is also an additional test file `(App.test.tsx)` in _src_ directory which belongs to main app file (`App.tsx`).
