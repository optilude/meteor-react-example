/* global require, Dependencies:true */

// Import client-side npm modules and put them into the Dependencies object.
// We can then access `Dependences` elsewhere in client-side code to use
// these modules.

// In client.browserify.options.json, we use the `exposify` plugin to
// browserify to shim `require(react)` with the `React` global exposed by
// the `react` meteor package. We also do the same for jQuery, which ships
// with Meteor.

Dependencies = {
    _: require('lodash'),
    moment: require('moment'),
    classNames: require('classnames'),

    bootbox: require('bootbox'),

    Router: require('react-router'),
    ReactBootstrap: require('react-bootstrap'),
    ReactRouterBootstrap: require('react-router-bootstrap'),
};
