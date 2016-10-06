import s from 'App/App.scss'
// import Sidebar from 'Sidebar/Sidebar.js'
import Header from 'Header/Header.js'
import Api from 'modules/Api'
import Utility from 'modules/Utility'
import Session from 'modules/Session'
import {hashHistory} from 'react-router'

export default class App extends React.Component {
  static propTypes = {
    // dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      course: {},
      terms: [],
      term: {},
      lecture: {},
    }
  }

  componentDidMount() {
    console.log("Session", Session);
    this.storeUser(Session.user);
  }

  getTermsFromCourses(courses) {
    var termIds = [];
    courses.map(function(course) {
      termIds.push(course.term);
    });

    termIds = Utility.removeDuplicates(termIds);
    return Api.db.post('term/multifind', {termIds: termIds})
    .then((terms) => {
      console.log("terms", terms);
      this.setState({
        term: terms[0],
        terms: terms
      });
      return terms;
    });
  }


  storeUser(user) {
    console.log("storeUser", user);
    this.setState({user: user, course: user.courses[0]}, () => {
      this.getTermsFromCourses(user.courses);
    });
  }

  changeCourse(e) {
    console.log("______________________");
    var courseId = -1;
    if(e.target) {
      courseId = e.target.value;
    } else {
      courseId = e;
    }
    this.getCourseById(courseId);
  }

  getCourseById(courseId) {
    var me = this;

    return Api.db.findOne('course', courseId)
    .then(function(course) {
      if(course == undefined) return; // if there are no courses, then there are no sections
      me.setState({course: course});
    });
  }

  changeTerm(e) {
    var me = this;
    var termId = e.target.value;
    this.getTermByTermId(termId)
    .then(function() {
      var courseId = -1;
      me.state.user.courses.map(function(course) {
        if(courseId == -1 && course.term == termId) {
          courseId = course.id;
        }
      });
      if(courseId == -1) return;
      me.changeCourse(courseId);
    });
  }

  getTermByTermId(termId) {
    return Api.db.findOne('term', termId)
    .then((term) => {
      if(term == undefined) return; // if there are no courses, then there are no sections
      this.setState({term: term});
    });
  }

  selectLecture(lecture) {
    // Api.db.post('lecture/full', {course: this.props.course.id})
    // .then((lecture) => {
    //
    // });
    this.setState({
      lecture: lecture,
    }, () => {
      hashHistory.push('/lecture');
    });
  }

  renderHeader(props) {
    const pathname = this.props.location.pathname;
    let showHeader = false;
    if(pathname == "/entrance") {
      return null;
    }
    return <Header {...props} />;
  }

  render() {
    var st = this.state;
    var pr = this.props;
    var props = {};
    props.storeUser = this.storeUser.bind(this);
    props.changeTerm = this.changeTerm.bind(this);
    props.changeCourse = this.changeCourse.bind(this);
    props.selectLecture = this.selectLecture.bind(this);
    props.user = st.user;
    props.terms = st.terms;
    props.term = st.term;
    props.course = st.course;
    props.lecture = st.lecture;

    return (
      <div className="appContainer">
        {/*<Sidebar />*/}
        {this.renderHeader(props)}
        {React.Children.map(pr.children, function(child) {
          return React.cloneElement(child, props);
        })}
      </div>
    )
  }
}
