/* jshint esnext: true */
/* global Meteor, React */
"use strict";

import { _, Router } from 'app-deps';
import TopNav from 'client/components/navigation';

var { RouteHandler } = Router;

// The top-level App React component. It uses `<RouteHandler />` from
// ReactRouter to render whichever page corresponds to the current URL.

export default React.createClass({
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
