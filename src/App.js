import React, { Component } from 'react';
import './App.css';
import { PaymentRequestDemo } from './_PaymentRequestForm';
import {Elements, StripeProvider} from 'react-stripe-elements';
import logo from './TCKT.png';
import { Switch, Route, withRouter } from 'react-router-dom'
import DownloadPage from './DownloadPage'
import EventPage from './EventPage'

class App extends Component {
    componentDidMount() {
      this.props.history.push('/event')
    }

  render() {
  return (
    <Switch>
      <Route path={'/download'} component={DownloadPage} />
      <Route path={'/event'} component={EventPage} />
    </Switch>  
  );
}
}
export default App;
