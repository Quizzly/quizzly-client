import s from 'Entrance/Entrance.scss'
import {hashHistory} from 'react-router'
import Input from 'elements/Input/Input.js'
import Api from 'modules/Api.js'
import Utility from 'modules/Utility.js'

export default class Entrance extends React.Component {
  static propTypes = {
    // dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
  }

  handleInputChange(input, value) {
    var state = this.state;
    state[input] = value;
    this.setState(state);
  }

  handleEmailChange(value) {
    this.handleInputChange('email', value);
  }

  handlePasswordChange(value) {
    this.handleInputChange('password', value);
  }

  handleEntranceSubmit(e) {
    var st = this.state;
    e.preventDefault();
    var password = st.password;
    var email = st.email;
    if (!password || !email) {
      return;
    }

    Api.db.post('login', {email: email, password: password})
    .then((user) => {
      return Api.db.post('auth/user');
    })
    .then((user) => {
      console.log(user);
      this.props.storeUser(user);
      hashHistory.push('/lectures');
    })
    .fail((err) => {
      alert("Sign in failed!");
      console.log(err);
    });
  }

  renderSignInInputs() {
    var inputArray = [];
    inputArray.push(
      <Input
        key={0}
        inputClass="entranceInput"
        className="mb30"
        type="text"
        placeholder="School email"
        value={this.state.email}
        onEnter={function(){}}
        onChange={this.handleEmailChange.bind(this)}
      />
    );

    inputArray.push(
      <Input
        key={1}
        inputClass="entranceInput"
        className="entranceInput mb30"
        type="password"
        placeholder="Password"
        value={this.state.password}
        onEnter={function(){}}
        onChange={this.handlePasswordChange.bind(this)}
      />
    );

    return inputArray;
  }


  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="entranceContainer">
        <div className="centerBlock alignC" style={{"paddingTop": "5%"}}>
          <div className="title mb10">QUIZZLY</div>
          <div className="subtitle mb20">The scholastic environment where clickers don't exist</div>
          <img className="logo mb20" src={Utility.LOGO_IMAGE_PATH} />
          <form className="loginForm" onSubmit={this.handleEntranceSubmit.bind(this)}>
            {this.renderSignInInputs()}
            <input type="submit" value="SIGN IN" className="signButton" />
          </form>
        </div>
        <a className="footer">About</a>
      </div>
    )
  }
}
