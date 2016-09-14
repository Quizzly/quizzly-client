import s from 'FirstComponent/FirstComponent.scss'

export default class FirstComponent extends React.Component {
  static propTypes = {
    dummy: React.PropTypes.object.isRequired,
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
      <div className="firstComponentContainer">
        SUCCESSING!
      </div>
    )
  }
}
