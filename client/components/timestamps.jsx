/* jshint esnext:true */
/* global Meteor, Dependencies, Components, Collections, React, ReactMeteorData, Roles */
"use strict";
(function(NS) {
var { _, moment, bootbox, ReactBootstrap } = Dependencies;
var { Button, ButtonToolbar } = ReactBootstrap;

// An example of an application-specific component.

var Timestamps = React.createClass({
    displayName: 'Timestamps',
    mixins: [ReactMeteorData],

    getMeteorData: function() {
        // Start a subscription and then fetch data. Return value will be
        // available under `this.data`, and when a reactive change happens
        // in Meteor, the function will be re-run and the component re-rendered.

        var user = Meteor.user();
        var subscriptionHandle = Meteor.subscribe("timestamps");

        return {
            loading: !subscriptionHandle.ready(),
            timestamps: Collections.Timestamps.find().fetch(),
            canWrite: user? Roles.userIsInRole(user, ['write', 'admin']) : false,
        };
    },

    render: function() {
        var { Loading } = Components;

        // Show loading indicator if subscriptions are still downloading

        if(this.data.loading) {
            return <Loading />;
        }

        return (
            <div>
                <h1 className="page-header">Timestamps</h1>
                <p className="help-block">
                    Watch the clock tick!
                </p>

                <div className="row">
                    <div className="col-md-4">
                        <Clock />
                    </div>
                    <div className="col-md-8">
                        <TimestampList timestamps={this.data.timestamps} />
                        {this.data.canWrite? (
                                <ButtonToolbar>
                                    <RecordNewButton />
                                    <ClearButton timestamps={this.data.timestamps} />
                                </ButtonToolbar>
                        ) : ""}
                    </div>
                </div>
            </div>
        );
    },

});

var Clock = React.createClass({
    displayName: "Clock",

    getInitialState: function() {
        return {
            now: moment()
        };
    },

    componentDidMount: function() {
        this.timer = setInterval(() => {
            this.setState({
                now: moment()
            });
        }, 500);
    },

    componetWillUnmount: function() {
        clearInterval(this.timer);
    },

    render: function() {
        return (
            <div className="clock">{this.state.now.format("hh:mm:ss")}</div>
        );
    }

});

var TimestampList = React.createClass({
    displayName: "TimestampList",
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        timestamps: React.PropTypes.arrayOf(Date).isRequired
    },

    render: function() {
        return (
            <ul className="timestamp-list">
                {this.props.timestamps.map(t => {
                    return (
                        <li key={t.time.getTime()}>{moment(t.time).format("hh:mm:ss")}: {t.name}</li>
                    );
                })}
            </ul>
        );
    }

});

var RecordNewButton = React.createClass({
    displayName: "RecordNewButton",
    mixins: [React.addons.PureRenderMixin],

    render: function() {
        return (
            <Button bsStyle='success' onClick={this.recordTimestamp}>Record new timestamp</Button>
        );
    },

    recordTimestamp: function() {
        var now = new Date();
        bootbox.prompt("Enter a name for this timestamp", result => {
            if (result !== null) {
                // Updating the collection causes the reactive `getMeteorData()`
                // function at the top of the component hierarchy to re-run and
                // the components to re-render as required.

                Collections.Timestamps.insert({
                    time: now,
                    name: result
                });
            }
        });
    }

});

var ClearButton = React.createClass({
    displayName: "ClearButton",
    mixins: [React.addons.PureRenderMixin],

    propTypes: {
        timestamps: React.PropTypes.arrayOf(Date).isRequired
    },

    render: function() {
        return (
            <Button bsStyle='danger' onClick={this.clearAll}>Clear all</Button>
        );
    },

    clearAll: function() {
        bootbox.confirm("Are you sure?", result => {
            if (result) {
                this.props.timestamps.forEach(t => {
                    Collections.Timestamps.remove(t._id);
                });
            }
        });
    }

});

// Expose to other components as `Components.Timestamps`

_.extend(NS, { Timestamps });

})(Components);
