import s from 'FirstComponent/FirstComponent.scss'
import AskButton from '../AskButton/AskButton';

export default class FirstComponent extends React.Component {
  static propTypes = {
    // dummy: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      question: {
        id: "57c4d01d21cb2133112c0870"
      },
      section: {
        id: "57c76513dc958a811c5c1baf"
      },
      callback: function() {
        console.log('click event in parent');
      }
    }
  }

  componentDidMount() {
  }

  render() {
    var st = this.state;
    var pr = this.props;
    return (
      <div className="firstComponentContainer" >
        <AskButton callback={st.callback}
                   question={st.question}
                   section={st.section}
                   text="Next Question"/>
      </div>
    )
  }
}
