# scjs-jQNgRe-Places
"Places" demo-apps built in: jQuery, Angular 1, React 15.

Code simplified from [todomvc.com versions](https://github.com/tastejs/todomvc). 
Originally used in [talk given July 13, 2016 at Santa Cruz JavaScript](http://www.meetup.com/santacruzjs/events/231957659/). [Slides](http://static.jeffreypriebe.com/talks/16-07-13-SCJS-Talk-jeffreypriebe-jQuery-Angular-React.pdf).

This demo code is meant to:
1. Provide an extremely simple application that can be quickly understood.
2. Compare difference in development between jQuery, Angular 1, and React for various common tasks:
   1. Imperative binding of click handlers vs. declarative approach.
   2. Repetition in creation of multiple items.
   3. Class names

# Usage
* (Optionally) Open `reset.html` to populate the localstorage.
* Open jQuery/Angular app version's `index.html`.<br />(`angular/index.html`, `jquery/index.html`)
* To run react, first follow the React Build steps below.

## React Build

React version uses webpack and references the transpiled result in `dist/__build__`.
To change React code, in the `/react` directory:

1. `npm install`
2. (Optionally) Make any code changes
3. `gulp build`

# Notes

All app versions run entirely client-side, using localstorage.

All app versions use the same localstorage data.

All app versions share the same simple style in `/css/main.css`.

jQuery specifically avoids templates which would be of use.
This is to make the jQuery example more accesible and further underscore its default imperative approach.

Yes, these are real places, images mostly pulled from Wikipedia. If you're going, let me know.
