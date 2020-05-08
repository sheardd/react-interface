# Project Overview

This project was built purely as a technical exercise, with the purpose of consolidating my knowledge of React after working through Robin Wieruch's The Road To Learn React (https://www.roadtoreact.com/). Given that I originally created this interface using jQuery, I decided it would be a good exercise to take a codebase I was already familiar with and try to translate a stripped down version of it to a different framework.

What I thought would be a relatively minimal experiment in a different framework rapidly evolved into a thorough recreation of most of my original work. While it was never intended for production, the project could arguably be used for such with relatively little further work. There are a number of tasks that would need to be completed before doing this however:

  * Implement the KitchenInterface's print functionality.
  * Re-factor the various API requests to use a few generic request/response functions in the App component that can be passed down to KitchenInterface and DriverInterface as props, using jQuery.ajax() in place of axios, as this is always available within the WordPress context that this app operates within and axios is therefore an unnecessary additional dependency.
  * Consider managing state with Redux, although doing this would require learning Redux.
  * Various minor refactors that only become apparent with the benefit of hindsight, some of which were due to approaching the project from a jQuery-oriented perspective in the earlier stages of development. These have been identified in component comments where applicable for reference.
  * Further refining and polishing (because things can always be shinier).

It bears mentioning, however, that this project will not function as a standalone application outside of the context in which it was intended to function. That is to say, within the context of a WordPress site using my own custom WordPress plugin and theme. The page through which customers place orders to be viewed by this interface is part of the custom child theme created for my original client. This is also true of the custom plugin which manages kitchen and driver user accounts and their privileges, as well as the creation and management of shopify store entries as restaurant locations within the WordPress database, all of which are necessary for accessing the interface for a specific restaurant. The code provided here is purely for reference when viewing the react demo accessible via https://demo:everythingisalright@react-demo.itruns.co.uk

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run upload`

Custom command that uploads the build directory to a remote server for deployment.<br />
Make sure you run `npm run build` first!

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
