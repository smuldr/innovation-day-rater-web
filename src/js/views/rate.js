import React from 'react/addons';
import {
	Container,
	UI
} from 'touchstonejs';

module.exports = React.createClass({
	statics: {
		navigationBar: 'main',
		getNavigation () {
			return {
				title: 'Ratings'
			}
		}
	},

	render () {
		return (
			<Container>
				<UI.Group>
					<UI.GroupHeader>Rate all the things!</UI.GroupHeader>
					<UI.GroupBody>
						<UI.GroupInner>
							<p>Starry night</p>
						</UI.GroupInner>
					</UI.GroupBody>
				</UI.Group>
			</Container>
		);
	}
});
