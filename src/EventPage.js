import React, { Component } from 'react';
import './App.css';
import { PaymentRequestDemo } from './_PaymentRequestForm';
import logo from './TCKT.png';
import { Switch, Route, withRouter } from 'react-router-dom'
import DownloadPage from './DownloadPage'

class EventPage extends Component {
    state = {
        eventName: ""
        }
        
        componentDidMount() {
            fetch('https://27nw6pkrj3.execute-api.us-east-1.amazonaws.com/default/getEvent/2') 
            .then(res => res.json())
            .then(data => this.setState({eventName: data[0].eventName}))
        }


    render() { 

        return ( 

            <div className="example">
            <div id="eventHeader">
                <h1 id='eventName'>{this.state.eventName}</h1>
                <div id="line"></div>
                
                <div id='venueAndInfoContainer'>
                <h1 id='venueName'>THE CO-OP</h1>
                <h1 id="neighborhood">Bed-Stuy, BK</h1>
                <div id='address'>
                    {/* <h3 style={{color: "white"}}>168 Ralph Ave Brooklyn,</h3>
                    <h3 style={{color: "white"}}>NY 11233</h3> */}
                </div>
                </div>
                
                <div id='logoContainer'>
                <img src={logo} id='logo' />
                </div>

                <div id='icons'>
                    <div id="categoryIcon">
                        <h1 id="categoryAbb">C</h1>
                    </div>
                    

                    <div id="pricediv">
                        <h2 id="priceLabel">$10</h2>
                    </div>

                    <div id='timediv'>
                        <h2 id='time'>9PM</h2>
                    </div>
                </div>

            </div>           

            

            <div id="payButton">
                <PaymentRequestDemo stripePublicKey={"pk_test_E1clmPG3gbZZ4QatxXyn2Dbr00kNJFsGqn"} />
            </div>
            </div>


            );
    }
}

export default EventPage;