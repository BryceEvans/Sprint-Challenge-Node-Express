# Review Questions

## What is Node.js?

Node.js is a runtime enviroment. It allows JS to be used outside the browswer and opens up a world of possibilities to developers now that they can run JS outside the internet browser. One of the things it does is allows a server to communicate with clients using JSON (JavaScript Object Notation)

## What is Express?

Express is a web application framework taht layers on Node.js. One example is that it's like React, but for the backend rather than the frontend. Express allows for more functionality like middleware and routing.

## Mention two parts of Express that you learned about this week.

Middleware and routing

## What is Middleware?

Middleware, simply put, is code that adds features to express. You can have 1) built-in middleware, 2) 3rd party middelware, and 3) custom middleware.

## What is a Resource?

A resource is something that a backend developer needs to provide access to in order for a frontend developer to access. It depends on what is being built, but a resoucre could be a user, post, comment, etc.

## What can the API return to help clients know if a request was successful?

You can return status codes and messages if the backend is set up and working properly.

## How can we partition our application into sub-applications?

By using Router(s) so that not all the resources are in one massive file.

## What is express.json() and why do we need it?

It's a built-in middleware function in Express that parses incoming requests into JSON and makes them readable... I think.
