import s from 'LectureMode/LectureMode.scss'
import {hashHistory} from 'react-router'
import Api from 'modules/Api'

export default class LectureMode extends React.Component {
  static propTypes = {
    // dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      lecturePage: 'CHOOSE_SECTION',
      sections: []
    }
  }

  componentDidMount() {
    this.setState({lecturePage: "CHOOSE_SECTION"});

    Api.db.find('section', {course: this.props.course.id})
    .then((sections) => {
      this.setState({sections: sections});
    })
  }

  updateLecturePage(lecturePage) {
    console.log("updateLecturePage", lecturePage);
    this.setState({lecturePage: lecturePage});
  }

  renderUpNext() {
    const {lecture, lectureItemIndex} = this.props;
    const lectureItem = lecture.lectureItems[lectureItemIndex];
    console.log("lectureItemIndex", lectureItemIndex);
    switch (lectureItem.type) {
      case "QUIZ":
        return <div className="upNextRow">
          <span className="upNextTitle">QUIZ: </span>
          {lectureItem.quiz.title}
        </div>
      case "QUESTION":
        return <div className="upNextRow">
          <span className="upNextTitle">Question: </span>
          {lectureItem.question.text}
        </div>
    }
  }

  close() {
    if(this.state.lecturePage == "ASK_NEXT_ITEM") {
      this.setState({lecturePage: "CHOOSE_SECTION"});
      return;
    }

    hashHistory.goBack();
  }

  askLectureItem() {
    const {
      lecture,
      lectureItemIndex,
      section
    } = this.props;
    const lectureItem = lecture.lectureItems[lectureItemIndex];

    var lectureItemPromise = null;
    switch (lectureItem.type) {
      case "QUIZ":
        let askQuizData = {
          quiz: lectureItem.quiz.id,
          section: section.id
        };
        Api.db.post('quiz/ask', askQuizData)
        .then(() => {

        })
      break;
      case "QUESTION":
        let askQuestionData = {
          question: lectureItem.question.id,
          section: section.id
        };
        Api.db.post('question/ask', askQuestionData)
        .then(() => {

        })
      break;
    }
  }

  selectSection(section) {
    this.props.selectSection(section);
    this.updateLecturePage('ASK_NEXT_ITEM');
  }

  renderChooseSection() {
    console.log("this.propscourse", this.props.course);
    console.log("this.sections", this.state.sections);
    const sections = this.state.sections;
    return (
      <div className="sectionContainer">
        <div className="sectionRow">Choose a section</div>
        {sections.map((section, i) => {
          return (
            <div
              key={i}
              className="sectionRow"
              onClick={this.selectSection.bind(this, section)}
            >
              {section.title}
            </div>
          );
        })}
      </div>
    );
  }

  renderAskNextItem() {
    return (
      <div className="flexCenter">
        <div className="upNextContainer">
          <div className="sectionRow alignC">
            Up Next
          </div>
          {this.renderUpNext()}
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
    console.log("this.state.lecturePage", this.state.lecturePage);
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
        <div className="closeButton" onClick={this.close.bind(this)}>&larr; Back</div>
        {this.renderLecturePage()}
      </div>
    )
  }
}
