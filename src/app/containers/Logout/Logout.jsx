import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
export default class Logout extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.actions.logoutUser();
  }

  render() {
    return null;
  }

}
