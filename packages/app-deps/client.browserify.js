/* global require, Dependencies:true, global, React */

// Import client-side npm modules and put them into the Dependencies object.
// We can then access `Dependences` elsewhere in client-side code to use
// these modules.

// In client.browserify.options.json, we use the `exposify` plugin to
// browserify to shim `require(react)` with the `React` global exposed by
// the `react` meteor package. We also do the same for jQuery, which ships
// with Meteor.

// This hack makes the `exposify` shim work for react. May be obsolete at
// some point. See https://github.com/meteor/react-packages/issues/83.
global.React = React;

Dependencies = {
    _: require('lodash'),
    moment: require('moment'),
    classNames: require('classnames'),

    bootbox: require('bootbox'),

    Router: require('react-router'),
    ReactBootstrap: require('react-bootstrap'),
    ReactRouterBootstrap: require('react-router-bootstrap'),
};
