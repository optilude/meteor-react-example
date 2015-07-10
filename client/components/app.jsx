/* jshint esnext: true */
/* global Meteor, Dependencies, Components, React */
"use strict";
var { _, Router } = Dependencies;
var { RouteHandler } = Router;

// The top-level App React component. It uses `<RouteHandler />` from
// ReactRouter to render whichever page corresponds to the current URL.

var App = React.createClass({
    displayName: 'App',

    statics: {
        willTransitionTo: function(transition, params) {
            // Redirect to /login if we land here without a valid user
            var user = Meteor.user();
            if(user === null) {
                transition.redirect('/login');
            }
        }
    },

    render: function () {
        var { TopNav } = Components;

        return (
            <div>
                <TopNav />
                <div className="container">
                    <RouteHandler />
                </div>
            </div>
        );
    }
});

// Expose to other components as `Components.App`

_.extend(Components, { App });
