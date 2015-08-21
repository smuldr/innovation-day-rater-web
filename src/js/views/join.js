import React from 'react/addons';
import Timers from 'react-timers';
import httpify from 'httpify';
import {
	Container,
	Mixins,
	UI
} from 'touchstonejs';

const apiUrl = (window.location.protocol === 'https:') ? 'https://xebia-innovation-day-rater.appspot.com' : 'http://xebia-innovation-day-rater.appspot.com';

module.exports = React.createClass({
	contextTypes: {
		app: React.PropTypes.object,
		dataStore: React.PropTypes.object.isRequired
	},
	mixins: [Mixins.Transitions, Timers()],
	statics: {
		navigationBar: 'main',
		getNavigation () {
			return {
				title: 'Ratings'
			}
		}
	},

	getInitialState () {
		return {
			alertbar: {
				visible: false,
				text: ''
			},
			sessionName: '',
			loading: false
		}
	},

	createGuid () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},

	join () {
		var self = this;

		if (this.state.sessionName) {
			console.log('join session', this.state.sessionName);

			httpify({
				method: 'GET',
				url: apiUrl + '/session?name=' + this.state.sessionName,
				headers: {'Accept': 'application/json'},
				timeout: 20000
			}, (err, res) => {
				if (err) {
					console.error('failed to GET session', err);
					this.showAlert('Could not find session');
					this.setTimeout(function () {
						this.hideAlert();
					}, 1000);
				} else {
					console.log('found session', res.body);
					this.context.dataStore.joinSession(res.body);
					self.transitionTo('main:rate', {transition: 'reveal-from-bottom'});
				}
			});
		}
	},

	onChange (event) {
		this.setState({
			sessionName: event.target.value
		})
	},

	showAlert(message) {
		this.setState({
			alertbar: {
				visible: true,
				text: message
			}
		});
	},

	hideAlert() {
		this.setState({
			alertbar: {
				visible: false,
				text: ''
			}
		});
	},

	render () {
		return (
			<Container>
				<UI.Alertbar type={'warning'} visible={this.state.alertbar.visible} animated>{this.state.alertbar.text || ''}</UI.Alertbar>
				<UI.Group hasTopGutter>
					<UI.GroupHeader>Greetings, stranger</UI.GroupHeader>
					<UI.GroupBody>
						<UI.GroupInner>
							<p>Welcome to the Ratings app. Join a session to start rating the talks.</p>
						</UI.GroupInner>
					</UI.GroupBody>
				</UI.Group>
				<UI.Group>
					<UI.GroupHeader>Join session</UI.GroupHeader>
					<UI.GroupBody>
						<UI.Input ref="sessionName" value={this.state.sessionName} onChange={this.onChange} disabled={this.state.loading} placeholder="Session Name"/>
						<UI.Button type="primary" disabled={this.state.loading} onTap={this.join}>JOIN SESSION</UI.Button>
					</UI.GroupBody>
				</UI.Group>
			</Container>
		);
	}
});
