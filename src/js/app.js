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

const PeopleStore = require('./stores/people')
const peopleStore = new PeopleStore()

var App = React.createClass({
	mixins: [createApp()],

	childContextTypes: {
		peopleStore: React.PropTypes.object
	},

	getChildContext () {
		return {
			peopleStore: peopleStore
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
					<View name="join" component={JoinViewController} />
				</ViewManager>
			</Container>
		);
	}
});

// Join View Controller
// ------------------------------

var JoinViewController = React.createClass({
	statics: {
		navigationBar: 'main',
		getNavigation () {
			return {
				title: 'Ratings'
			}
		}
	},

	createGuid () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},
	join () {
		console.log('joining...', this.createGuid());
	},
	render () {
		return (
			<Container>
				<UI.Group>
					<UI.GroupHeader>Greetings, stranger</UI.GroupHeader>
					<UI.GroupBody>
						<UI.GroupInner>
							<p>Welcome to the Ratings app. Join a session to start rating the talks.</p>
						</UI.GroupInner>
						<UI.Button type="primary" onTap={this.join}>JOIN SESSION</UI.Button>
					</UI.GroupBody>
				</UI.Group>
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
