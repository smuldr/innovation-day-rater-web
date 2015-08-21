import React from 'react/addons';
import Timers from 'react-timers';
import httpify from 'httpify';
import {
	Container,
	UI
} from 'touchstonejs';

const categoryMapper = {
	originality: 1,
	creativity: 2,
	realistic: 3,
	technology: 4
};

const apiUrl = (window.location.protocol === 'https:') ? 'https://xebia-innovation-day-rater.appspot.com' : 'http://xebia-innovation-day-rater.appspot.com';

function createGuid () {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
}

const userId = createGuid();

module.exports = React.createClass({
	mixins: [Timers()],

	contextTypes: {
		app: React.PropTypes.object,
		dataStore: React.PropTypes.object.isRequired
	},

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
			session: this.context.dataStore.getSession()
		}
	},

	handleModeChange (key, value) {
		var newState = {};
		newState[key] = value;
		this.setState(newState);

		this.vote(categoryMapper[key], parseInt(value, 10));
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

	vote (category, value) {

		httpify({
			method: 'POST',
			url: apiUrl + '/session/' + this.state.session.SessionID + '/talk/' + this.state.session.Talks[0].TalkID + '/vote',
			body: JSON.stringify({
				VoteID: createGuid(),
				UserID: userId,
				Value: value,
				VoteCategory: category
			}),
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
			timeout: 20000
		}, (err, res) => {
			if (err) {
				console.error('failed to POST vote', err);
				this.showAlert('Vote failed');
				this.setTimeout(function () {
					this.hideAlert();
				}, 1000);
			} else {
				console.log('voted!');
			}
		});
	},

	render () {
		return (
			<Container>
				<UI.Alertbar type={'warning'} visible={this.state.alertbar.visible} animated>{this.state.alertbar.text || ''}</UI.Alertbar>
				<UI.Group hasTopGutter>
					<UI.GroupHeader>{this.state.session.Name}</UI.GroupHeader>
					<UI.GroupBody>
						<UI.GroupInner>
							<p>You are now rating session '{this.state.session.Name}'.</p>
						</UI.GroupInner>
					</UI.GroupBody>
				</UI.Group>
				<UI.Group>
					<UI.Item>
						<UI.FieldLabel>ORIGINALITY</UI.FieldLabel>
					</UI.Item>
					<UI.SegmentedControl value={this.state.originality}
										 onChange={this.handleModeChange.bind(this, 'originality')} hasGutter options={[
						{ label: 'One', value: '1' },
						{ label: 'Two', value: '2' },
						{ label: 'Three', value: '3' },
						{ label: 'Four', value: '4' },
						{ label: 'FIve', value: '5'}
					]}/>
					<UI.Item>
						<UI.FieldLabel>CREATIVITY</UI.FieldLabel>
					</UI.Item>
					<UI.SegmentedControl value={this.state.creativity}
										 onChange={this.handleModeChange.bind(this, 'creativity')} hasGutter options={[
						{ label: 'One', value: '1' },
						{ label: 'Two', value: '2' },
						{ label: 'Three', value: '3' },
						{ label: 'Four', value: '4' },
						{ label: 'FIve', value: '5'}
					]}/>
					<UI.Item>
						<UI.FieldLabel>REALISTIC</UI.FieldLabel>
					</UI.Item>
					<UI.SegmentedControl value={this.state.realistic}
										 onChange={this.handleModeChange.bind(this, 'realistic')} hasGutter options={[
						{ label: 'One', value: '1' },
						{ label: 'Two', value: '2' },
						{ label: 'Three', value: '3' },
						{ label: 'Four', value: '4' },
						{ label: 'FIve', value: '5'}
					]}/>
					<UI.Item>
						<UI.FieldLabel>TECHNOLOGY</UI.FieldLabel>
					</UI.Item>
					<UI.SegmentedControl value={this.state.technology}
										 onChange={this.handleModeChange.bind(this, 'technology')} hasGutter options={[
						{ label: 'One', value: '1' },
						{ label: 'Two', value: '2' },
						{ label: 'Three', value: '3' },
						{ label: 'Four', value: '4' },
						{ label: 'FIve', value: '5'}
					]}/>
				</UI.Group>
			</Container>
		);
	}
});
