import s from 'App/App.scss'
// import Sidebar from 'Sidebar/Sidebar.js'
// import Header from 'Header/Header.js'
import Api from 'modules/Api.js'

export default class App extends React.Component {
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

  render() {
    var st = this.state;
    var pr = this.props;

    var props = {};

    return (
      <div className="appContainer">
        {/*<Sidebar />*/}
        {/*<Header />*/}
        {React.Children.map(pr.children, function(child) {
          return React.cloneElement(child, props);
        })}
      </div>
    )
  }
}
