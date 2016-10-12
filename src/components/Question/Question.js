import s from 'Question/Question.scss'

export default class Question extends React.Component {
  static propTypes = {
    question: React.PropTypes.object.isRequired,
    showAnswers: React.PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {

  }

  renderAnswers() {
    const {
      question,
      showAnswers,
    } = this.props;

    if(question.answers.length == 0) {
      return <div style={{marginBottom: -15}}></div>;
    }

    if(!showAnswers) {
      return null;
    }

    console.log("renderAnswers", showAnswers);


    return (
      <div className="answersContainer">
        {question.answers.map((answer, i) => {
          return (
            <div className="answersPanel" key={i}>
              <div className={`answerWord`}>
                {answer.option}.)
              </div>
              <div className={`answerContent ${answer.correct ? "lightGreenBackground" : ""}`}>
                {answer.text}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    var st = this.state;
    var pr = this.props;
    const question = pr.question;
    return (
      <div className="questionContainer">
        <div className="questionPanel">
          <div className="questionWord">Question</div>
          <div className="questionContent">{question.text}</div>
        </div>
        <div>
          {this.renderAnswers()}
        </div>
      </div>
    )
  }
}
