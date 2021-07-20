# DailyJourney 🚗
- [Links](#Links)
- [Introduction](#Introduction)
- [Setup](#Setup-and-installation)
- [Main features](#Main-features)

## Links

Demo of the application: <https://dailyjourney.netlify.app> (bear in mind that most of the fake trips to try the app are around Valencia, ES!)

Repository of the API backend: <https://github.com/EGimenoS/dailyjourneyapi>

## Introduction

This is my Master's Dissertation app for the "Master in web applications development" of the UOC (Universitat Oberta de Catalunya).  
The project goal is to put people in contact in order to share their cars for their daily travels, such as commuting to go to their workplaces.  
This repository contains the frontend part of the application, an Angular SPA. There is also a full-fledged backend made with Ruby on Rails as api-only mode that can be found here: [DailyJourney API](https://github.com/EGimenoS/dailyjourneyapi)

A demo of the application is hosted here: <https://dailyjourney.netlify.app>

## Setup and Installation

Install the angular CLI:

`npm install -g @angular/cli`

Clone the repo:

`git clone https://github.com/EGimenoS/dailyjourney-angular.git`

Install the dependencies:

`npm install`

And then run the development server with `ng serve` or build to deploy with `ng build --prod`

## Main features

- A user can register and login in the app
- A user can create a new travel
- A user can search for travels near of their desired destination and see them as a list and as markers in a map.
- A user can register to any travel.
- A travel owner can approve or reject a user registered to the travel.
- A travel owner can edit and delete their travels.
- A user can cancel their registration to a travel.
- A user can see their registered and owned travels from their profile.
- A user can change their name and password
- A user can write messages in a travel chat if registered or owner.

## Some screenshots

![img](https://i.imgur.com/NuC9dnJ.jpg)

![img](https://i.imgur.com/kJq5mXYh.jpg)

![img](https://i.imgur.com/q5S7urSh.jpg)

![img](https://i.imgur.com/k0Ugq8qh.jpg)
