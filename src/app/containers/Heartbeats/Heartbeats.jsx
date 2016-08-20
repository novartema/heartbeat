import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { autobind } from 'core-decorators';
import classnames from 'classnames';

// Actions.
import * as HeartbeatActions from '_actions/HeartbeatActions';

// Constants.
import * as HeartbeatConstants from '_constants/HeartbeatConstants';

@connect(
  state => ({
    heartbeat: state.heartbeat,
  }),
  dispatch => ({
    actions: bindActionCreators(HeartbeatActions, dispatch),
  })
)
@autobind
export default class Heartbeats extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    heartbeat: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.actions.loadHeartbeat();
  }

  onClickSort(e) {
    e.preventDefault();
    this.props.actions.sortHeartbeat();
  }

  getHeartbeatRows() {
    return this.props.heartbeat.heartbeat.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.timeStart}</th>
          <td>{item.timeEnd}</td>
          <td>{item.sourceType}</td>
          <td>{item.sourceName}</td>
          <td>{item.statistics.stress}</td>
          <td>{item.statistics.vegetative}</td>
        </tr>
      );
    });
  }

  render() {
    const { heartbeat } = this.props;
    if (heartbeat.heartbeat === null) {
      return null;
    }
    const sortColumnClass = classnames('fa', {
      'fa-caret-down': heartbeat.sort === HeartbeatConstants.DESC,
      'fa-caret-up': heartbeat.sort === HeartbeatConstants.ASC,
    });
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>
                <a onClick={this.onClickSort}>Time start <i className={sortColumnClass} /></a>
              </th>
              <th>Time end</th>
              <th>Source type</th>
              <th>Source name</th>
              <th>Stress</th>
              <th>Vegetative</th>
            </tr>
          </thead>
          <tbody>
          {this.getHeartbeatRows()}
          </tbody>
        </table>
      </div>
    );
  }

}
