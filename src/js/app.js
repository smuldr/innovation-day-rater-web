import React from 'react/addons';
import {
	Container,
	createApp,
	UI,
	View,
	ViewManager
} from 'touchstonejs';

// App Config
// ------------------------------

const DataStore = require('./stores/datastore')
const dataStore = new DataStore()

var App = React.createClass({
	mixins: [createApp()],

	childContextTypes: {
		dataStore: React.PropTypes.object
	},

	getChildContext () {
		return {
			dataStore: dataStore
		};
	},

	render () {
		let appWrapperClassName = 'app-wrapper device--' + (window.device || {}).platform

		return (
			<div className={appWrapperClassName}>
				<div className="device-silhouette">
					<ViewManager name="app" defaultView="main">
						<View name="main" component={MainViewController} />
						<View name="transitions-target-over" component={require('./views/transitions-target-over')} />
					</ViewManager>
				</div>
			</div>
		);
	}
});

// Main Controller
// ------------------------------

var MainViewController = React.createClass({
	render () {
		return (
			<Container>
				<UI.NavigationBar name="main" />
				<ViewManager name="main" defaultView="join">
					<View name="join" component={require('./views/join')} />
					<View name="rate" component={require('./views/rate')} />
				</ViewManager>
			</Container>
		);
	}
});

function startApp () {
	if (window.StatusBar) {
		window.StatusBar.styleDefault();
	}

	React.render(<App />, document.getElementById('app'));
}

if (!window.cordova) {
	startApp();
} else {
	document.addEventListener('deviceready', startApp, false);
}
