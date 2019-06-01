import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../actions';
import {Helmet} from 'react-helmet';

class UsersListPage extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsersList() {
    return this.props.users.map(user => <li key={user.id}>{user.name}</li>)
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Users App</title>
          <meta property="og:title" content="Users App"/>
        </Helmet>
        Here`s a big list users:
        <ul>
          {this.renderUsersList()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

function loadData(store) {
  return store.dispatch(fetchUsers())
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersListPage)
}
