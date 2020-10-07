import React ,{Component} from 'react';
import { withFirebase } from '../Firebase'
import { compose } from 'recompose'
import { withAuthorization, withEmailVerification  } from '../Session'
import * as ROLES from '../contants/roles'

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      loading: false,
      users: []
    }
  }

  componentDidMount() {
    this.setState({ loading: true })

    this.props.firebase.users().on('value', snapshot => {
      const userObject = snapshot.val()
      const userList = Object.keys(userObject).map(key => ({
        ...userObject[key],
        uid: key
      }))
      this.setState({
        users: userList,
        loading: false
      })
    })
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state
    return (
      <div>
        <h1>Admin</h1>
        <p>The Admin page is accessible by every signed in admin user</p>
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </div>
    )
  }
}

const UserList = ({ users }) => (
  <ul>
    {
      users.map(user => (
        <li key={user.uid}>
          <span>
            <strong>ID: </strong> {user.uid}
          </span>
          <span>
            <strong>Email: </strong> {user.email}
          </span>
          <span>
            <strong>UserName: </strong> {user.username}
          </span>
        </li>
      ))
    }
  </ul>
)

const condition = autUser => 
    autUser && !!autUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
)(AdminPage);