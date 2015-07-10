/* jshint esnext:true */
/* global Meteor, React, Dependencies, Components */
"use strict";
var { _, Router } = Dependencies;
var { Route, DefaultRoute } = Router;

// On startup, let the router take over the `main` div in the markup.

Meteor.startup(() => {

    // Define client-side routes using ReactRouter, which is imported as an NPM
    // module in the `app-deps` package.

    var routes = [
        // Account management
        <Route name="login" path="/login" handler={Components.Login}/>,
        <Route name="resetPassword" path="/reset-password/:token" handler={Components.ResetPassword}/>,
        <Route name="enrollAccount" path="/enroll-account/:token" handler={Components.EnrollAccount}/>,
        <Route name="changePassword" path="/change-password" handler={Components.ChangePassword}/>,

        // App
        <Route name="home" path="/" handler={Components.App}>

            // User facing functionality
            <DefaultRoute handler={Components.Home} />
            <Route name="timestamps" path="timestamps" handler={Components.Timestamps}/>

            // Administration
            <Route name="adminUsers" path="admin/users" handler={Components.AdminUsers}/>
            <Route name="adminCreateUser" path="admin/create-user" handler={Components.CreateUser}/>

        </Route>
    ];

    var router = Router.create({
        routes: routes,
        location: Router.HistoryLocation
    });

    router.run((Root, state) => {
        React.render(<Root />, document.getElementById('main'));
    });
});
