/* jshint esnext:true */
/* global Meteor, Mongo, SimpleSchema, Roles */
"use strict";

import { _ } from 'app-deps';

// This file contains definitions of models and collections. They will be
// placed into the `Collections` namespace so they can be accessed in code on
// either the client or the server.

// We use SimpleSchema and Collection2 from the `aldeed:collection2` package to
// define schemata and collection validation.

var Timestamp = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    time: {
        type: Date,
        label: "Time"
    }
});

export var Timestamps = new Mongo.Collection("Timestamps");
Timestamps.attachSchema(Timestamp);
Timestamps.allow({
    insert: function(userId, doc) {
        return (userId && Roles.userIsInRole(userId, ['write', 'admin']));
    },
    update: function(userId, doc, fields, modifier) {
        return (userId && Roles.userIsInRole(userId, ['write', 'admin']));
    },
    remove: function(userId, doc) {
        return (userId && Roles.userIsInRole(userId, ['write', 'admin']));
    }
});

// This allows users to update their own preferences, but noone else's

Meteor.users.allow({
    update: function(userId, user, fields, modifier) {
        return userId && userId === user._id;
    }
});

// We publish two publications: `timestamps`, which we will subscribe to on a
// per-component basis, and `userData`, which we globally subscribe to on the
// client.

if(Meteor.isServer) {

    Meteor.publish("timestamps", function() {
        if(!this.userId) {
            return;
        }

        return Timestamps.find();
    });

    Meteor.publish("userData", function () {
        if (this.userId) {
            return Meteor.users.find({_id: this.userId}, {
                fields: {'profile': 1}
            });
        } else {
            this.ready();
        }
    });

} else if(Meteor.isClient) {
    Meteor.subscribe("userData");
}
