/* jshint esnext:true */
/* global Meteor, Dependencies, Components, React */
"use strict";
(function(NS) {
var { _, ReactBootstrap } = Dependencies;
var { Modal, ProgressBar } = ReactBootstrap;

// React component that renders a loading page. This can be used to render
// a holding view whilst subscriptions complete.

var Loading = React.createClass({
    displayName: 'Loading',

    render: function() {
        return (
            <div className="please-wait modal-open">
                <Modal
                    title='Please wait...'
                    backdrop={false}
                    animation={false}
                    closeButton={false}
                    onRequestHide={() => {}}>
                    <div className='modal-body'>
                        <ProgressBar active now={100} />
                    </div>
                </Modal>
            </div>
        );
    }

});

// Expose to other components as `Components.Loading`

_.extend(NS, { Loading });

})(Components);
