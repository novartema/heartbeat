import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Containers.
import HeaderContainer from '_containers/HeaderContainer/HeaderContainer.jsx';

// Actions.
import * as UserActions from '_actions/UserActions';

@connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    actions: bindActionCreators(UserActions, dispatch),
  })
)
export default class Application extends Component {

  static propTypes = {
    children: PropTypes.element,
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        {user.isAuthenticated && <HeaderContainer />}
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }

}
