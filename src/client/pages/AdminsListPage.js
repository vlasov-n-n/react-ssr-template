import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAdmins} from '../actions';
import requireAuth from '../components/hocs/requireAuth';

class AdminsListPage extends Component {
    componentDidMount() {
      this.props.fetchAdmins();
    }

    renderAdmin() {
      return this.props.admins.map(admin => <li key={admin.id}>{admin.name}</li>)
    }

    render() {
      return (
        <div>
          <h3>Protected page</h3>
          <ul>
            {this.renderAdmin()}
          </ul>
        </div>
      )
    }
}

function mapStateToProps({admins}) {
  return {admins}
}

export default {
  component: connect(mapStateToProps, {fetchAdmins})(
    requireAuth(AdminsListPage)
  ),
  loadData: ({dispatch}) => dispatch(fetchAdmins())
};
