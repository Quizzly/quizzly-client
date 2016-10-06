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
      lectures: [],
      question: {
        "answers": [
          {
            "option": "A",
            "text": "String stuff",
            "correct": false,
            "question": "57c4d01d21cb2133112c0870",
            "createdAt": "2016-08-30T00:15:25.449Z",
            "updatedAt": "2016-08-30T00:15:25.449Z",
            "id": "57c4d01d21cb2133112c0871"
          },
          {
            "option": "B",
            "text": "Needle through the eye",
            "correct": true,
            "question": "57c4d01d21cb2133112c0870",
            "createdAt": "2016-08-30T00:15:25.450Z",
            "updatedAt": "2016-08-30T00:15:25.450Z",
            "id": "57c4d01d21cb2133112c0872"
          },
          {
            "option": "C",
            "text": "Masterfully sad",
            "correct": false,
            "question": "57c4d01d21cb2133112c0870",
            "createdAt": "2016-08-30T00:15:25.450Z",
            "updatedAt": "2016-08-30T00:15:25.450Z",
            "id": "57c4d01d21cb2133112c0873"
          }
        ],
        "quiz": {
          "title": "Threading",
          "course": "57c4cf2821cb2133112c0867",
          "createdAt": "2016-08-30T00:13:23.793Z",
          "updatedAt": "2016-08-30T00:15:01.907Z",
          "id": "57c4cfa321cb2133112c086b"
        },
        "text": "What is threading?",
        "type": "multipleChoice",
        "duration": 30,
        "createdAt": "2016-08-30T00:15:25.443Z",
        "updatedAt": "2016-08-30T00:15:25.445Z",
        "id": "57c4d01d21cb2133112c0870"
      },
      section: {
        title: "32423",
        createdAt: "2016-08-31T23:15:31.057Z",
        updatedAt: "2016-09-14T17:24:25.244Z",
        id: "57c76513dc958a811c5c1baf"
      },
      callback: function() {
        console.log('click event in parent');
      }
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

  selectLecture(lecture) {
    // Api.db.post('lecture/full', {course: this.props.course.id})
    // .then((lecture) => {
    //
    // });
    this.setState({
      lecture: lecture,
      isLecture: true
    });
  }

  renderLectures() {
    return this.state.lectures.map((lecture, i) => {
      return (
        <LecturePanel
          key={i}
          lecture={lecture}
          selectLecture={this.selectLecture.bind(this)}
        />
      );
    })
  }

  render() {
    var st = this.state;
    var pr = this.props;
    // return (
    //     <div className="lecturesContainer">
    //       Section: {st.section.title}
    //       <Question question={st.question} />
    //       <Answers answers={st.question.answers} />
    //
    //       <AskButton callback={st.callback}
    //                  question={st.question}
    //                  section={st.section} />
    //     </div>
    // )
    return (
      <div className="lecturesContainer">
        {this.renderLectures()}
      </div>
    );
  }
}
