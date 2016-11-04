import s from 'LectureMode/LectureMode.scss'
import {hashHistory} from 'react-router'
import Api from 'modules/Api'
import Utility from 'modules/Utility.js'

let counter = {};
export default class LectureMode extends React.Component {
  static propTypes = {
    // dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      lecturePage: 'CHOOSE_SECTION',
      sections: [],
      timeRemaining: ''
    }
  }

  componentDidMount() {
    this.setState({lecturePage: "CHOOSE_SECTION"});
    Api.db.find('section', {course: this.props.course.id})
    .then((sections) => {
      this.setState({sections: sections});
    })
  }

  componentWillUnmount() {
    this.clearCounter();
  }

  updateLecturePage(lecturePage) {
    console.log("updateLecturePage", lecturePage);
    this.setState({lecturePage: lecturePage});
  }

  clearCounter() {
      clearInterval(counter);
      counter = {};
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

  callback(){
    const {
      lecture,
      lectureItemIndex,
      section,
        selectLectureItemIndex
    } = this.props;
    const lectureItem = lecture.lectureItems[lectureItemIndex];
    const nextIndex = lectureItemIndex+1;
    if(nextIndex < lecture.lectureItems.length ) {
      this.clearCounter();
      selectLectureItemIndex(nextIndex)
    } else {
      selectLectureItemIndex(0);
      hashHistory.push('/');
    }
  }

  startTimer(timeRemaining) {
    var st = this.state;

    this.clearCounter();

    var me = this;
    counter = setInterval(timer, 1000); //1000 will run it every 1 second

    function timer() {
      timeRemaining--;
      if(timeRemaining <= 0) {
        me.callback();
      }
      me.setState({timeRemaining: timeRemaining});
    }
  }

  askQuestion(askQuestionData){
    var me = this;
    Api.db.post('question/ask', askQuestionData)
    .then(function(question){
      Api.db.post('question/getOpenQuestion', {
        questionKey: question.questionKey
      }).then(function(question){
        me.startTimer(Math.floor(question.timeRemaining));
      });
    });
  }

  askQuiz(askQuizData){
    var me = this;
    Api.db.post('quiz/ask', askQuizData)
    .then(function(quiz){
      Api.db.post('quiz/getOpenQuiz', {
        quizKey: quiz.quizKey
      }).then(function(quiz){
        var count = 0;
        for(var i = 0; i < quiz.quiz.questions.length; i++){
          count += quiz.quiz.questions[i].duration;
        }
        me.startTimer(Math.floor(count));
      });
    });
  }
  askLectureItem() {
    const {
      lecture,
      lectureItemIndex,
      section,
        selectLectureItemIndex
    } = this.props;
    const lectureItem = lecture.lectureItems[lectureItemIndex];
    const nextIndex = lectureItemIndex+1;

    switch (lectureItem.type) {
      case "QUIZ":
        let askQuizData = {
          quiz: lectureItem.quiz.id,
          section: section.id
        };
        this.askQuiz(askQuizData);
      break;

      case "QUESTION":
        let askQuestionData = {
          question: lectureItem.question.id,
          section: section.id
        };
        this.askQuestion(askQuestionData);
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
    var st = this.state;
    return (
      <div className="flexCenter">
        <div className="upNextContainer">
          <div className="sectionRow alignC">
            Up Next
          </div>
          {this.renderUpNext()}
        </div>
        {st.timeRemaining ? <span id="timer">{st.timeRemaining}</span> :
        <div className="lectureModeButton" onClick={this.askLectureItem.bind(this)}>
            ASK
        </div>}
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
        <div className="closeButton" onClick={this.close.bind(this)}>&larr; Back </div>
        {this.renderLecturePage()}
      </div>
    )
  }
}
