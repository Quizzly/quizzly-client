import s from 'LecturePanel/LecturePanel.scss'
import Panel from 'elements/Panel/Panel.js'
import {hashHistory} from 'react-router'

export default class LecturePanel extends React.Component {
  static propTypes = {
    lecture: React.PropTypes.object.isRequired,
    selectLecture: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
  }

  startLecture() {
    this.props.selectLecture(this.props.lecture);
    hashHistory.push("/lecture/mode");
  }

  selectLecture() {
    this.props.selectLecture(this.props.lecture);
    hashHistory.push('/lecture');
  }

  renderHeader() {
    var pr = this.props;
    return (
      <div
        className="pointer"
        onClick={this.selectLecture.bind(this)}
      >
        {pr.lecture.title}
      </div>
    );
  }

  renderQuizItem(lectureItem) {
    return (
      <div>
        <div className="lectureQuizItem">
          Quiz: {lectureItem.quiz.title}
        </div>
        {lectureItem.quiz.questions.map((question, i) => {
          return (
            <div
              key={i}
              className="innerQuestionItem"
            >
              {question.text}
            </div>
          );
        })}
      </div>
    );
  }

  renderQuestionItem(lectureItem) {
    return (
      <div>
        {lectureItem.question.text}
      </div>
    );
  }

  renderLectureItem(lectureItem) {
    switch (lectureItem.type) {
      case 'QUIZ':
        return this.renderQuizItem(lectureItem);
      case 'QUESTION':
        return this.renderQuestionItem(lectureItem);
    }
  }

  renderBodyRow() {
    return this.props.lecture.lectureItems.map((lectureItem, i) => {
      return (
        <div
          key={i}
          className="panelItem lecturePanelItem"
        >
          {this.renderLectureItem(lectureItem)}
        </div>
      );
    })
  }

  renderBody() {
    var pr = this.props;
    return (
      <div
      >
        {this.renderBodyRow()}
      </div>
    );
  }

  renderFooter() {
    return (
      <div
        className="lecturePanelFooter"
        onClick={this.startLecture.bind(this)}
      >
        Start Lecture
      </div>
    );
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <Panel
        header={this.renderHeader()}
        body={this.renderBody()}
        footer={this.renderFooter()}
      />
    )
  }
}
