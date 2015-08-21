import React from 'react/addons';
import httpify from 'httpify';
import {
	Container,
	Mixins,
	UI
} from 'touchstonejs';

module.exports = React.createClass({
	mixins: [Mixins.Transitions],
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
			sessionName: ''
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
			console.log('joining...', this.state.sessionName, this.createGuid());

			httpify({
				method: 'POST',
				url: 'http://xebia-innovation-day-rater.appspot.com/session',
				headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
				body: JSON.stringify({ Guid: self.createGuid(), Name: this.state.sessionName }),
				timeout: 20000
			}, (err, res) => {
				if (err) {
					console.error('failed to POST session', err);
					return;
				}
				console.log('response body', res.body);
				self.transitionTo('main:rate', { transition: 'reveal-from-bottom' });
			});
		}
	},

	onChange (event) {
		this.setState({
			sessionName: event.target.value
		})
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
					</UI.GroupBody>
				</UI.Group>
				<UI.Group>
					<UI.GroupHeader>Join session</UI.GroupHeader>
					<UI.GroupBody>
						<UI.Input ref="sessionName" value={this.state.sessionName} onChange={this.onChange} placeholder="Session Name"/>
						<UI.Button type="primary" onTap={this.join}>JOIN SESSION</UI.Button>
					</UI.GroupBody>
				</UI.Group>
			</Container>
		);
	}
});
