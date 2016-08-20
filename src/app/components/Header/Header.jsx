import React, { Component, PropTypes } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class Header extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    const { user } = this.props;
    const username = user.profile ? user.profile.username : '';
    return (
      <div>
        <Navbar>
          <Navbar.Collapse>
            <Nav>
              <NavItem href="/heartbeat">Heartbeat</NavItem>
            </Nav>
            <Nav pullRight>
              <Navbar.Text>Username:</Navbar.Text>
              <NavDropdown title={username} id="basic-nav-dropdown">
                <MenuItem href="/user/logout">Logout</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }

}
