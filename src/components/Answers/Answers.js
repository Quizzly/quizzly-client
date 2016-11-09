import Api from '../../modules/Api';

/**
 *  Anwers
 *
 *  @description :: Given a question and section, will push the question to students in the section.
 *  @params      :: Required: question(id=required), section(id=required)
 *               :: Optional: callback, text(default='Ask')
 */

export default class Answers extends React.Component {
    static propTypes = {
        answers: React.PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        var st = this.state;
        var pr = this.props;
        return (
            <div className="answers">
                {pr.answers.map(function(answer, i){
                    return <div className="answer" key={answer.id}>
                        {answer.option}.) <span>{answer.text}</span>
                    </div>
                })}
            </div>
        )
    }
}
