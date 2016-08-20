import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components.
import Header from '_components/Header/Header.jsx';

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
export default class HeaderContainer extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.loadUserProfile();
  }

  render() {
    return <Header user={this.props.user} />;
  }

}
