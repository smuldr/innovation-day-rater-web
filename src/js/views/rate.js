import React from 'react/addons';
import {
	Container,
	UI
} from 'touchstonejs';

module.exports = React.createClass({
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
			session: this.context.dataStore.getSession()
		}
	},

	render () {
		return (
			<Container>
				<UI.Group>
					<UI.GroupHeader>{this.state.session}</UI.GroupHeader>
					<UI.GroupBody>
						<UI.GroupInner>
							<p>You are now rating session '{this.state.session}'.</p>
						</UI.GroupInner>
					</UI.GroupBody>
				</UI.Group>
			</Container>
		);
	}
});
