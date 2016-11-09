import s from 'Lectures/Lectures.scss'

import AskButton from 'AskButton/AskButton';
import Question from 'Question/Question';
import Answers from 'Answers/Answers';
import LecturePanel from 'LecturePanel/LecturePanel';
import Api from 'modules/Api';
import Session from 'modules/Session';
import {hashHistory} from 'react-router';
// const {app, BrowserWindow} = require('../../../electron');


export default class Lectures extends React.Component {
  static propTypes = {
    // dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      lectures: []
    };
  }

  componentDidMount() {
    // console.log("BrowserWindow", BrowserWindow);
    // let win = new BrowserWindow({width: 800, height: 600})
    // win.setAlwaysOnTop(flag[, level])

    this.getLectures(this.props.course.id);
  }

  componentWillReceiveProps(newProps) {
    this.getLectures(newProps.course.id)
  }

  getLectures(courseId) {
    Api.db.post('full/lectures', {course: courseId})
    .then((lectures) => {
      console.log("lectures", lectures);
      this.setState({lectures: lectures});
    });
  }

  renderLectures() {
    return this.state.lectures.map((lecture, i) => {
      return (
        <LecturePanel
          key={i}
          lecture={lecture}
          selectLecture={this.props.selectLecture.bind(this)}
        />
      );
    })
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="lecturesContainer">
        {this.renderLectures()}
      </div>
    );
  }
}
