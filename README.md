# Adventure Capitalist
Example of Idle Game, using Typescript and Pixi.js

# Live version
- Live version: https://tiagoschmitt.github.io/

# How to use:
## Pre-requisites:
- npm install -g typescript
- npm install -g http-server

## How to compile and watch
- Command line: tsc --watch

## How to run:
- Go to the ./dist directory, using the terminal and type: "http-server". It will create a http server that you can use to run the game.

Go to the ./dist directory using the terminal and type: "http-server". It will create a http server that you can use to run the project.
# Description and Solution
For this project the idea was to create a idle game, based on Adventure Capitalist. 
I chose to use PixiJS for image rendering, but no other engine, because the idea here was to create the entire game logic.

This game runs in the browser desktop and use the local storage to save the game progress. The idea for the future is to create
a web application to save all user information and dynamically configure new companies or improve the game balance,
without change any local file.

# Architecture

## Introduction

Firstly, the idea was to create a code base (under com.gameclosure namespace) and the specific game logic under the com.adventurecapitalist namespace. The entire project is made by small pieces/components that can plugged or unplugged without refacoring too much code. Any object that need to use, manipulate an external data (model) or display some interaticve content, can be considered a component. 

## Code Base (com.gameclosure)
In general this namespace has everything that is needed to create a game, like:

- Rendering Framework: Define how the application will be displayed, here we are using PixiJS.

- Routers: Easily manipulate how to show the pages/screen. Defining a default screen, easily change the opening order and keeping updating just the current screen for performance purposes.

- Store: Create a generic store object, to save the application state in the memory, this class should receive specific components to parse automatically the data to object and also defining how to save the data by a external component. This external component just need to have a specific signature to be used as a router component.

- Display components: Created some display components that can agregate as a component in another object or be expended to use the display features. These classes normally are a proxy between the codebase and the external render frameworks like PixiJS, used in this example. If necessary change the rendering framework, It's just need to change this modules and the application will works fine, without be necessary to change the entire application. Also, the display components are updated following the application data.

- Factories: The factories are used to create components/images easier and make them reusable, if necessary. For exameple, if you need to create a lot of screen components every tick, we are going to use a lot of processing, but instead you can use the factory, using the pool of objects in the memory. For this game was not necessary, but for sure we need to check some performances issues.

## Game implementation (com.adventurecapitalist)
Now after defined the code base, we start to reuse and extend the base architecture. The game is initalized by a main class, that start all the components necessary for this game, like routers, stores, rendering framework. If you don't need to use, just don't start the unnecessary one.

- Spefic display components: Reusing the base components, It was created the specific components that need be updated, each time that are any data change. So, we break the components into parts, following the good development practices, like single responsibility principle.

- Company Manager Class: Since we have the store class in the code base, now was necessary to create a class to update the entire company data to be reflected into of each display component. Also, after the idle time, this class calculate the total, based in the last timestamp saved locally, comparing with the current timestamp. One improvement that I would like to do was to update just the display object that are listening a specific property, like a dual bind, the I couldn't do it in time.

## Trade-offs
- It was necessary to adapt the manager buttons in the main screen, but the idea was to create a specific screen for the manager, like the original game.

# Improvements
- Create a web application to save the user data and retrive this information, even tough the user changes the browser or computer.
- Improve the UI, I am not good to create it, but with more time, I could have created a better version.
- Dual bind to have updates in each display components just when necessary, improve and check the performance in general.
- Avoid to create too much objects, using a pool of objects. The idea was to refactor at the end of the development, but I didn't have time for it
- Create base button and a factory of text objects, instead to create for each component, replicating unnecessary code.

# Final Considerations
The idea was to show some good code practices, using some pattern like: Composition, Singleton, Observer, Factory and etc. Using the OOP principles too.


