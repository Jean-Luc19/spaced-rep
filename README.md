# Dothraki X

A full stack app that teaches users the formidable language of the Dothraki language using the paradigm of [Spaced Repetition](https://en.wikipedia.org/wiki/Spaced_repetition) to facilitate quicker learning and stronger retention.
Visit the live app here: [Dothraki-X](http://dothraki-x.herokuapp.com/#/).

## Collaborators:

James Guthrie & Aaron Gottlieb

## Introduction

Learning a new language is difficult, spaced repetition seeks to make it easier by keeping ahead of the 'forgetting-curve'.

### Wire Frames
Wireframes constructed at [Moqups.com](https://app.moqups.com/)
![wireframe](https://raw.githubusercontent.com/Jean-Luc19/spaced-rep/readme/client/src/images/wireframes.png)

## Working Prototype

[Dothraki-X](dothraki-x.herokuapp.com/)

## Functionality
Dothraki-X functionality includes:

* Easy login access with google Authentication
* A spaced repetition algorithm to help you better learn the words that you are struggling with.
* Easy access to lifetime score results for all Correct and Incorrect answers.
* The ability to reset your lifetime scores and start over from scratch to help reinforce the content.
* The ability to reverse the words so that you can test your self the opposite way.

### Clone the repo

```sh
$ git clone https://github.com/YOUR_USERNAME_HERE/spaced-rep
```

```sh
$ cd spaced-rep
```

```sh
$ npm install
```

You can run it locally now with `npm run dev`, but the Google OAuth stuff won't work without your own credentials.

## Technologies

### Front End

1. HTML
2. React
3. React Redux
4. Css

### Backend

1. Node
2. Express
3. MongoDB
4. Mongoose
5. Passport
6. Google OATH

### Development Roadmap

This is v1.0 of Dothraki-X, but future enhancements are in the works.

### Future Developments:

* Create an easy to access profile page through the settings tab.
* Create d3 data visualization for score history for each word the user has encountered.
* Add difficulty levels and mastery goals, so when a user answers every question correctly from a given question set, they can level up and have access to another question set.
* Add the ability for a user to select between Dothraki and Valyrian languages.
* Add a finished screen with a user's final score once they have answered every question correctly it least twice.
