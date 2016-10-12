import s from 'LectureMode/LectureMode.scss'
import {hashHistory} from 'react-router'

export default class LectureMode extends React.Component {
  static propTypes = {
    // dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      lecturePage: 'CHOOSE_SECTION'
    }
  }

  componentDidMount() {
  }

  renderUpNext() {
    const {lecture, lectureItemIndex} = this.props;
    const lectureItem = lecture.lectureItems[lectureItemIndex];
    console.log("lectureItemIndex", lectureItemIndex);
    switch (lectureItem.type) {
      case "QUIZ":
        return <span>Quiz: {lectureItem.quiz.title}</span>
      case "QUESTION":
        return <span>Question: {lectureItem.question.text}</span>
    }
  }

  close() {
    hashHistory.goBack();
  }

  askLectureItem() {
    const {lecture, lectureItemIndex} = this.props;
    const lectureItem = lecture.lectureItems[lectureItemIndex];

    var lectureItemPromise = null;
    switch (lectureItem.type) {
      case "QUIZ":
        let askQuizData = {
          quizId: lectureItem.quiz.id,
          sectionId: "s"
        };
        Api.server.post('quiz/ask', )
        .then(() => {

        })
      break;
      case "QUESTION":
        let askQuestionData = {
          questionId: lectureItem.question.id,
          sectionId:"s"
        };
        Api.server.post('question/ask', )
        .then(() => {

        })
      break;
    }
  }

  renderChooseSection() {
    return (
      <div className="flexCenter">
        <div className="innerContainer">
          Up next: {this.renderUpNext()}
        </div>
        <div
          className="lectureModeButton"
          onClick={this.askLectureItem.bind(this)}
        >
          ASK
        </div>
      </div>
    );
  }

  renderAskNextItem() {
    return (
      <div className="flexCenter">
        <div className="innerContainer">
          Up next: {this.renderUpNext()}
        </div>
        <div
          className="lectureModeButton"
          onClick={this.askLectureItem.bind(this)}
        >
          ASK
        </div>
      </div>
    );
  }

  renderLecturePage() {
    switch (this.state.lecturePage) {
      case 'CHOOSE_SECTION':
        return this.renderChooseSection();
      case 'ASK_NEXT_ITEM':
        return this.renderAskNextItem();
    }
  }

  render() {
    var st = this.state;
    const {
      lecture
    } = this.props;
    return (
      <div className="lectureModeContainer">
        <div className="closeButton" onClick={this.close.bind(this)}>X</div>
        {this.renderLecturePage()}
      </div>
    )
  }
}
