import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, Panel, FormGroup, ControlLabel, FormControl, InputGroup, Button } from 'react-bootstrap';
import { autobind } from 'core-decorators';

// Actions.
import * as UserActions from '_actions/UserActions';

// Styles.
import styles from './login.scss';

@connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    actions: bindActionCreators(UserActions, dispatch),
  })
)
@autobind
export default class Login extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  onChangeEmail(e) {
    const email = e.target.value;
    this.setState({ email });
  }

  onChangePassword(e) {
    const password = e.target.value;
    this.setState({ password });
  }

  onSubmitLogin(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (email.length === 0) {
      this.setState({ email });
      return;
    }
    if (password.length === 0) {
      this.setState({ password });
      return;
    }
    const creds = { email, password };
    this.props.actions.loginUser(creds);
  }

  validationEmail() {
    const { email } = this.state;
    let status = 'success';
    if (email.indexOf('@') === -1) {
      status = 'error';
    }
    return status;
  }

  validationPassword() {
    const { password } = this.state;
    let status = 'success';
    if (password.length === 0) {
      status = 'error';
    }
    return status;
  }

  render() {
    return (
      <div className={styles.formLogin}>
        <Panel header="Login">
          <form onSubmit={this.onSubmitLogin}>
            {this.props.user.errorMessage && <Alert bsStyle="danger">{this.props.user.errorMessage}</Alert>}
            <FormGroup controlId="formBasicText" validationState={this.validationEmail()}>
              <ControlLabel>Email</ControlLabel>
              <InputGroup>
                <InputGroup.Addon>@</InputGroup.Addon>
                <FormControl type="text" value={this.state.email} onChange={this.onChangeEmail} />
              </InputGroup>
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="formBasicText" validationState={this.validationPassword()}>
              <ControlLabel>Password</ControlLabel>
              <InputGroup>
                <InputGroup.Addon>*</InputGroup.Addon>
                <FormControl type="password" value={this.state.password} onChange={this.onChangePassword} />
              </InputGroup>
              <FormControl.Feedback />
            </FormGroup>
            <Button type="submit" bsStyle="primary">Login</Button>
          </form>
        </Panel>
      </div>
    );
  }

}
