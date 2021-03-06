# Cornershop Frontend Test v1.5.0

#### ⚠️ Before you begin

> Create a new git repository on the root of this folder, upload it to Github on a **private** repository and invite your contact from HR.

If you are from **Chile** please invite [@inge-yang](https://github.com/inge-yang)

If you are from **México** plese invite [@dankols](https://github.com/dankols)

If you are from **Colombia** plese invite [@javitormoparker](https://github.com/javitormoparker)

If you are from **Brazil** plese invite [@alecornershop](https://github.com/alecornershop)

In **every case** please add [@cornershop-hr](https://github.com/cornershop-hr) as collaborators.

## Overview

You have been commissioned to implement a counter application following the design specs provided [here](https://www.figma.com/file/6CnuM0Gj9oiwi2AV9vXLRH/Counters-for-the-web?node-id=0%3A1).

The application consists of several screens where each screen has one or multiple states that you will have to implement following the design specs the best you can.

We have provided starter boilerplate so you can write your application without any hassle and also a NodeJS dummy backend with all the neccessary endpoints to persist the data.

We've also provided a few UI components and basic styling rules so you can focus solely on implementing the screens the best you can. Here's a list of all the things included:
- Alert
- Button
- Icons
- Loading
- Modal
- Text Input

> These components are just a starting spot, so if you need to change them in any form or fashion (or add more), feel free to do it.

For bootstrapping the frontend application we're using `react-scripts`, so as you might have guessed you **must** use React (it's our primary view layer for frontend applications here at Cornershop).

> Note: This is NOT a backend test. Don't make it require any databases. Don't touch the server folder. Just leave it as it is.

## Requirements

Your submission will be evaluated considering the following criterias:

- Feature completion.
  - All features must be implemented for a perfect score.
- Faithful implementation of the challenge.
  - Follow the design spec as close as you can.
- Good architecture and software design.
  - _Hint:_ Usage of design patterns, good code organization, separation of concerns, etc. 
- Use of best practices when writing code.
  - _Hint:_ Idiomatic & readable code, good use of composition, DRY, etc.
- The application must persist data back to the server.
- Good management of state using built-in React features or third party dependencies (context, `redux`, `mobx`, `xstate` or whatever you might like).
- You must include tests.
  - Behavior tests are perfect.
- Your project must be self-contained (make sure you're not using global dependencies).
- **Last but not least**, we would love to understand your thought process, so writing a little summary of your choices, what you did and how you solved the test is required (write it here on this README file).

Other things to consider:
- For styling you can use whatever CSS flavor you want: plane old CSS, SASS, LESS, CSS-in-JS, CSS modules, everything is allowed.
- Please consider that we expect your solution to be production-ready. In other words, that millions of users would be thrilled to use your product.
- You can use whatever dependencies/libraries you want, the only requirement dependency-wise is to use React

## Getting started

First and foremost, make sure you have `node` and `npm` (or `yarn`) installed on your machine, then run:

```bash
$ npm install
$ npm start
```

For `yarn` users:

```bash
$ yarn
$ yarn start
```

## API endpoints / examples

Since the backend API runs locally on a different port (`3001`) than the `react-scripts` dev server (`3000`), we have setup a proxy so you don't have to do anything special to consume the API (fetching data from `/api/v1/counter` will do).

> The following endpoints are expecting a `Content-Type: application/json` header.

#### **GET** `/api/v1/counter`.

_Fetch a list of counters._
```javascript
/* Response */
[]
```

#### **POST** `/api/v1/counter`.

_Adds a counter._

```javascript
/* Body */
{ title: "bob" }

/* Response */
{ id: "asdf", title: "bob", count: 0 }
```

#### **POST** `/api/v1/counter/inc`
_Increments the value of a counter._
```javascript
/* Body */
{ id: "asdf" }

/* Response */
{ id: "asdf", title: "bob", count: 1 }
```

#### **POST** `/api/v1/counter/dec`
_Decrements the value of a counter._

```javascript
/* Body */
{ id: "asdf" }

/* Response */
{ id: "asdf", title: "bob", count: 0 }
```

#### **DELETE** `/api/v1/counter`
_Deletes a counter._

```javascript
/* Body */
{ id: "qwer" }

/* Response */
"qwer" // The id of the deleted counter
```
---

Good luck! 🎉

We hope your submission is… to die for.

![Coffin dance](coffin.gif)

# Resume proyect counters app by Carlos Aravena

> This is my resume how I programed the counters app based in my experience on React JS

## Sctructure from the proyect

```
│   App.js
│   index.css
│   index.js
│   logo.svg
│   setupTests.js
│
├───api
│       deleteCountersById.js
│       getAllCounters.js
│       postNewCounters.js
│       updateCountersById.js
│
├───components
│   ├───errors
│   │   ├───error-load-counters
│   │   │       ErrorLoadCountersScreen.css
│   │   │       ErrorLoadCountersScreen.js
│   │   │
│   │   ├───no-counters
│   │   │       NoCountersScreen.css
│   │   │       NoCountersScreen.js
│   │   │
│   │   └───no-results
│   │           NoResultsScreen.css
│   │           NoResultsScreen.js
│   │
│   ├───examples
│   │       ExampleScreen.css
│   │       ExampleScreen.js
│   │
│   ├───footer
│   │       FooterScreen.css
│   │       FooterScreen.js
│   │
│   ├───list-counters
│   │       ListCountersScreen.css
│   │       ListCountersScreen.js
│   │
│   ├───loading
│   │       LoadingScreen.css
│   │       LoadingScreen.js
│   │
│   ├───main
│   │       MainScreen.css
│   │       MainScreen.js
│   │
│   └───welcome
│           WelcomeScreen.css
│           WelcomeScreen.js
│
├───data
│       products.js
│
├───helpers
│       urlAPI.js
│
├───routers
│       AppRouter.js
│
├───tests
│   ├───api
│   │       getAllCounters.test.js
│   │
│   ├───components
│   │   ├───main
│   │   │   │   MainScreen.test.js
│   │   │   │
│   │   │   └───__snapshots__
│   │   │           MainScreen.test.js.snap
│   │   │
│   │   └───welcome
│   │       │   WelcomeScreen.test.js
│   │       │
│   │       └───__snapshots__
│   │               WelcomeScreen.test.js.snap
│   │
│   └───routers
│       │   AppRouter.test.js
│       │
│       └───__snapshots__
│               AppRouter.test.js.snap
│
└───ui
    │   index.js
    │
    ├───Alert
    │       Alert.css
    │       Alert.js
    │       index.js
    │
    ├───Button
    │       Button.css
    │       Button.js
    │       index.js
    │
    ├───Icons
    │       CloseIcon.js
    │       DecrementIcon.js
    │       IncrementIcon.js
    │       index.js
    │       NewIcon.js
    │       OpenIcon.js
    │       RefreshIcon.js
    │       SearchIcon.js
    │       TrashBinIcon.js
    │
    ├───Img
    │       PaperNote.svg
    │
    ├───Input
    │       index.js
    │       Input.css
    │       Input.js
    │
    ├───Loading
    │       index.js
    │       Loading.css
    │       Loading.js
    │
    └───Modal
            index.js
            Modal.css
            Modal.js
```

> To continuation I will explain the structure and the reason why I use this composition.

## api folder

Inside this folder exists four files that have the logic to call to the apis and release the CRUD correspond, I used this way to can utilize this functions on any part of the project.

## components

In component folder I created exists subfolders that contain the next.

- #### errorsScreens components

In the errors components I have the views that can i show when it happens some error with de apis, every component have her CSS file.

- #### ExamplesScreen component

In the examples component I created the logic for when the user clicks on "see examples" to be able to consume a resource that I have within the data folder, with this I display the information in clickable buttons and display it in the corresponding field by passing them through the properties of the component.

- #### FooterScreen component

This component contain the mayor logic inside the functionalities for the actions delete items, add items, share items. Using the React Hooks, useState and useEffect mayorly. This served me to construct the logic in FooterScreen component.

- #### ListCountersScreen component

Here I display the data when I create counters items, I consume the GET Counters API to obtain the information and generate a list of counters. Additionally I use de UPDATE Counters API to change de quantity of counters I have and I created the logic to can select items and send to FooterScreen component to make actions like delete items and more.

- #### MainScreen component

The first API that I consume is GET Counters, to save this data and display in the ListCountersScreen Component. I used the UI components in this case the Loading UI to make dynamic the request of data. Too I created the logic to filter de data and show this filtered data in ListCountersScreen Component.

- #### WelcomeScreen component

Is the default component that I show using the react-router-dom library, with this library I configure the router of the application.

## data and helpers folder

Inside this folder I have a files that help me in the development to the application, of this way I avoid the duplicity of variables to use.

## routers folder

I created the AppRouter Component to configure the routers of the application and too the redirect configuration when the path not exists.

## tests folder

Here I have the tests realized using the enzyme and enzyme-to-json library. This allowed me make tests like take snapshots to the component, validate the consume of the apis and more.

## External libraries

To can develop the application I use different external libraries like:

- react-bootstrap to complement the design to complement the design of the views and style
- react-router-dom to configure the routers of the application
- enzyme and enzyme-to-json to tests the components
- react-copy-to-clipboard to make the function share items

If your run this application first write this command line

```
npm install
```