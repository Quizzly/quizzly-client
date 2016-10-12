import s from 'Lecture/Lecture.scss'
import {hashHistory} from 'react-router'
import Quiz from 'Quiz/Quiz'
import Question from 'Question/Question'

export default class Lecture extends React.Component {
  static propTypes = {
    // dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      showAnswers: false,
    }
  }

  componentDidMount() {
  }

  backToLectures() {
    hashHistory.push('/lectures');
  }

  showAnswers() {
    this.setState({showAnswers: !this.state.showAnswers});
  }

  beginLecture() {
    hashHistory.push("/lecture/mode");
  }

  renderLectureItem(lectureItem) {
    switch (lectureItem.type) {
      case 'QUIZ':
        return (
          <Quiz
            quiz={lectureItem.quiz}
            showAnswers={this.state.showAnswers}
          />
        );
      case 'QUESTION':
        return (
          <Question
            question={lectureItem.question}
            showAnswers={this.state.showAnswers}
          />
        );
    }
  }

  renderLectureTitle() {
    const pr = this.props;
    return (
      <div className="flexCenter">
        <div
          className="backArrow"
          onClick={this.backToLectures.bind(this)}
        >
          &larr; Back
        </div>
        <div className="lectureTitle">{pr.lecture.title}</div>
        <div
          className="startButton"
          onClick={this.beginLecture.bind(this)}
        >
          BEGIN
        </div>
      </div>
    );
  }

  renderLectureItems() {
    const lectureItems = this.props.lecture.lectureItems;
    if(!lectureItems) {
      return null;
    }
    return lectureItems.map((lectureItem, i) => {
      return (
        <div
          key={i}
          className="pb15"
        >
          {this.renderLectureItem(lectureItem)}
        </div>
      );
    })
  }

  render() {
    const st = this.state;
    const pr = this.props;
    return (
      <div className="lectureContainer">
        {this.renderLectureTitle()}
        <div className="subTitle">
          <div
            className="subTitleButton"
            onClick={this.showAnswers.bind(this)}
          >
            {st.showAnswers ? "Hide Answers" : "Show Answers"}
          </div>
        </div>
        <div className="lectureItems">
          {this.renderLectureItems()}
        </div>
      </div>
    )
  }
}
