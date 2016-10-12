import s from 'LectureMode/LectureMode.scss'
import {hashHistory} from 'react-router'

export default class LectureMode extends React.Component {
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

  renderUpNext() {
    const {lecture} = this.props;
    if(lecture.lectureItems[0].type == "QUIZ") {
      return <span>Quiz: {lecture.lectureItems[0].quiz.title}</span>

    }

    if(lecture.lectureItems[0].type == "QUESTION") {
      return <span>Question: {lecture.lectureItems[0].question.text}</span>

    }
  }

  close() {
    hashHistory.goBack();
  }

  render() {
    var st = this.state;
    const {
      lecture
    } = this.props;
    return (
      <div className="lectureModeContainer">
        <div className="closeButton" onClick={this.close.bind(this)}>X</div>
        <div className="innerContainer">
          Up next: {this.renderUpNext()}
        </div>
        <div className="lectureModeButton">
          ASK
        </div>
      </div>
    )
  }
}
