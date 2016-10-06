import s from 'Lecture/Lecture.scss'
import {hashHistory} from 'react-router'

export default class Lecture extends React.Component {
  static propTypes = {
    // dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
  }

  backToLectures() {
    hashHistory.push('/lectures');
  }

  render() {
    var st = this.state;
    var pr = this.props;
    console.log("pr", pr);
    return (
      <div className="lectureContainer">
        <div
          className="backArrow"
          onClick={this.backToLectures.bind(this)}
        >
          &larr; Back
        </div>
        {pr.lecture.title}
      </div>
    )
  }
}
