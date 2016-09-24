import Api from '../../modules/Api';

/**
 *  @title       :: AskButton
 *  @description :: Given a question and section, will push the question to students in the section.
 *
 *  @params      :: Required: question, section
 *               :: Optional: callback, text(default='ask')
 */

export default class AskButton extends React.Component {
    static propTypes = {
        question: React.PropTypes.object.isRequired,
        section: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
    }

    ask(){
        var pr = this.props;

        var data = {
            section: pr.section.id,
            question: pr.question.id
        };

        Api.db.post('question/ask', data).then((data) => {
            // if callback is provided, call it.
            if(typeof pr.callback === 'function') { pr.callback(data); }
        });
    }

    render() {
        var st = this.state;
        var pr = this.props;
        return (
            <div className="askButton">
                <button onClick={this.ask.bind(this)}>{pr.text || 'Ask'}</button>
            </div>
        )
    }
}
