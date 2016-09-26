import Api from '../../modules/Api';

/**
 *  Question
 *
 *  @description :: Displays a given question
 *  @params      :: Required: question
 */

export default class Question extends React.Component {
    static propTypes = {
        question: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
    }



    render() {
        var st = this.state;
        var pr = this.props;
        return (
            <div className="questionContainer">
                <p>
                    {pr.question.text}
                </p>
            </div>
        )
    }
}
