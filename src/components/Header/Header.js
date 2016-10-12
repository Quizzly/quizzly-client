import s from 'Header/Header.scss'
import {hashHistory} from 'react-router'
import Api from 'modules/Api'

export default class Header extends React.Component {
  static propTypes = {
    // dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
  }

  logout() {
    Api.db.post('logout')
    .then(() => {
      console.log("logged out");
      hashHistory.push("entrance");
    });
  }

  render() {
    // this.logout();
    var st = this.state;
    var pr = this.props;
    if(!pr.terms.length) {
      return null;
    }
    return (
      <div className="headerContainer">
        <select value={pr.term.id} className="dropdown ml10" onChange={pr.changeTerm.bind(this)}>
          {pr.terms.map(function(term, termIndex) {
            return <option key={termIndex} value={term.id}>{term.season.season + " " + term.year.year}</option>
          })}
        </select>
        <select value={pr.course.id} className="dropdown ml10" onChange={pr.changeCourse.bind(this)}>
          {pr.user.courses.map(function(course, courseIndex) {
            if(course.term == pr.term.id) {
              return <option key={courseIndex} value={course.id}>{course.title}</option>
            }
          }, this)}
        </select>
        <div
          className="logoutButton"
          onClick={this.logout.bind(this)}
        >
          Logout
        </div>
      </div>
    )
  }
}
