import React, {Component} from 'react';
import {
    injectStripe,
    PaymentRequestButtonElement,
    StripeProvider,
    Elements,
    } from 'react-stripe-elements';

    // import QRCode from './QRCodeDownload'
    import QRCode from 'qrcode.react'

    class _PaymentRequestForm extends Component {
    constructor(props) {
        super(props);

        // For full documentation of the available paymentRequest options, see:
        // https://stripe.com/docs/stripe.js#the-payment-request-object
        const paymentRequest = props.stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
            label: 'Demo total',
            amount: 1000,
        },
        // Requesting the payer’s name, email, or phone is optional, but recommended.
        // It also results in collecting their billing address for Apple Pay.
        requestPayerName: true,
        requestPayerEmail: true,
        });

        paymentRequest.on('paymentmethod', function(ev) {
            console.log(ev)
            const id = ev.paymentMethod.id
            const secret = "sk_test_2N4c0cduUlVkHqjCXEVrjNcM00NS3ArAs0"
            const clientSecret = `${id}_secret_${secret}`
             // Confirm the PaymentIntent without handling potential next actions (yet).
            
    props.stripe.confirmCardPayment(
        clientSecret,
        {payment_method: id},
        {handleActions: false}
    ).then(function(confirmResult) {
        console.log(confirmResult.error)
        
        if (confirmResult.error) {
        // Report to the browser that the payment failed, prompting it to
        // re-show the payment interface, or show an error message and close
        // the payment interface.

        
            // window.location.href = 'http://hoods-wallet.herokuapp.com/ticket'; 
            // <div>
            // <QRCode
            //     id="123456"
            //     value="123456"
            //     size={290}
            //     level={"H"}
            //     includeMargin={true}
            //     />
            //     <a onClick={this.downloadQR}> Download QR </a>
            // </div>
        
        ev.complete('fail');
        } else {
        // Report to the browser that the confirmation was successful, prompting
        // it to close the browser payment method collection interface.
        console.log("This is the error section")
        ev.complete('success');
        // Let Stripe.js handle the rest of the payment flow.
        props.stripe.confirmCardPayment(clientSecret).then(function(result) {
            if (result.error) {
            // The payment failed -- ask your customer for a new payment method.
            } else {
            // The payment has succeeded.
            }
        });
        }
    });
        
        });

        paymentRequest.canMakePayment().then((result) => {
        this.setState({canMakePayment: !!result});
        });

        this.state = {
        canMakePayment: false,
        paymentRequest,
        };
    }

    downloadQR = () => {
        const canvas = document.getElementById("123456");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "123456.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };


    render() {
        return this.state.canMakePayment ? (
        <PaymentRequestButtonElement
            paymentRequest={this.state.paymentRequest}
            className="PaymentRequestButton"
            style={{
            // For more details on how to style the Payment Request Button, see:
            // https://stripe.com/docs/elements/payment-request-button#styling-the-element
            paymentRequestButton: {
                theme: 'dark',
                height: '64px',
            },
            }}
        />
        ) : (
        <p>
            Either your browser does not support the Payment Request
            API or you do not have a saved payment method. To try out the Payment
            Request Button, switch to one of{' '}
            <a href="https://stripe.com/docs/stripe-js/elements/payment-request-button#testing">
            the supported browsers
            </a>, and make sure you have a saved payment method.
        </p>
        );
    }
    }

    const PaymentRequestForm = injectStripe(_PaymentRequestForm);

    export class PaymentRequestDemo extends Component {
    render() {
        return (
        <StripeProvider apiKey={this.props.stripePublicKey}>
            <Elements>
            <PaymentRequestForm handleResult={this.props.handleResult} />
            </Elements>
        </StripeProvider>
        );
    }
}