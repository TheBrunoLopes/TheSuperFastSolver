## Folder Structure

```
solver_gui/
  Dockerfile            - Dockerfile used to create an image used in the docker-compose.yaml located in the root folder
  README.md             - You are here!
  package.json          - Specification of the dependencies and more
  public/
    index.html
    favicon.ico
  src/
    include/            - Contains imports for libraries like boostrap and popper
    js/                 - This project is built using React and Redux
        actions/        - Contains all the Redux actions
        components/     - All React Components 
        entities/       - Class objects used in the project
        imgs/           - Folder for images (empty at the moment)
        reducer         - Contains our FunctionsReducer
    App.css
    App.js
    App.test.js
    index.css
    index.js            - is the JavaScript entry point.
    logo.svg
```

## Available Scripts

In the project directory, you can run:

### `npm install`
To install dependencies located in `package.json`

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
The app is ready to be deployed!

## Supported Browsers
By default, the generated project supports all modern browsers.<br>