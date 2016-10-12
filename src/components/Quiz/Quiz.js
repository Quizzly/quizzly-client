import s from 'Quiz/Quiz.scss'
import Question from 'Question/Question'

export default class Quiz extends React.Component {
  static propTypes = {
    quiz: React.PropTypes.object.isRequired,
    showAnswers: React.PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
  }

  renderQuestions() {
    const quiz = this.props.quiz;
    return quiz.questions.map((question, i) => {
      return (
        <div className="mb10 mt10" style={{marginLeft: 100}} key={i}>
          <Question
            question={question}
            showAnswers={this.props.showAnswers}
          />
        </div>
      );
    })
  }

  render() {
    const st = this.state;
    const pr = this.props;
    const quiz = pr.quiz;
    return (
      <div className="quizContainer">
        <div className="quizPanel">
          <div className="quizWord">Quiz</div>
          <div className="quizContent">{quiz.title}</div>
        </div>
        <div>
          {this.renderQuestions()}
        </div>
      </div>
    )
  }
}
