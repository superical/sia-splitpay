import * as React from 'react';
import * as axios from 'axios';
import {PassengerTicketBox} from "../../components/PaasengerTicketBox/index";

interface IProps {
    [key:string]:any;
    params:any;
}

interface IState {
    [key:string]:any;
    bookingData: any;
}

export class SplitPayment extends React.Component<IProps, IState> {

    public constructor(props) {
        super(props);
        this.state = {
            bookingData: {
                passengers: [   //Todo: Remove this dummy data once API can handle passenger IDs
                    {
                        "id": 1001,
                        "name": "John Smith",
                        "email": "waeaweawe@serser.com",
                        "paid": true
                    },
                    {
                        "id": 1002,
                        "name": "Jane Smith",
                        "email": "",
                        "paid": false
                    },
                    {
                        "id": 1003,
                        "name": "Tom Smith",
                        "email": "",
                        "paid": false
                    }
                ]
            }
        }
    }

    private componentWillMount() {
        axios.get('http://nodejs-mongodb-example-booking-backend.44fs.preview.openshiftapps.com/api/bookingId', {
            params: {
                bookingId: '57f6a9c2e221230019706d32'
            }
        })
            .then(response => {
                //this.setState({bookingData: response.data});      //Todo: Uncomment this line when API is ready
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    private onCompletePurchaseHandler() {
        //Todo: Call API here to update booking - paying status
        //...
        const {passengers} = this.state.bookingData;
        this.setState({
            bookingData: Object.assign({}, this.state.bookingData, {passengers: passengers.map(p => {
                if(p.id == this.props.params.passengerId) return Object.assign({}, p, {paid: true});
                else return p;
            })})
        });
    }

    public render() {
        const {params} = this.props;
        const {bookingData} = this.state;
        const passengers:any[] = bookingData.passengers ? bookingData.passengers : [];

        const sentence = (passenger, currentId) => {
            const greet = passenger.id == currentId ? 'Your' : `${passenger.name}'s`;
            return passenger.paid ? `${greet} payment is completed.` : `${greet} payment is still pending`;
        }

        const passengerBoxes = passengers.map(p => <PassengerTicketBox key={p.id}
            sideContainer={ p.paid ? <img src="pay-success.png"/> :<img src="pay-pending.png"/>}
            mainContainer={sentence(p, params.passengerId)} />);

        const me = passengers.filter(p => p.id == params.passengerId);

        return (
            <div>
                <div className="main-intro">
                    <h3 className="sub-heading-1--dark">Ticket Split Payment</h3>
                </div>
                <div className="payments-detail block-2">
                    <div className="payments-group payments-group__charge">
                        <div className="payments-inner" style={{padding: '24px 20px 15px'}}>
                            <p>Your ticket purchase is not done yet! Complete your payment by clicking on the Pay button. </p>
                            <div className="grid-row">
                                <div className="grid-col">
                                    <div className="grid-inner">
                                        {passengerBoxes}
                                    </div>
                                </div>
                            </div>
                            <div className="grid-row">
                                <div className="grid-col">
                                    <div className="grid-inner">
                                        {
                                            me && me[0] && !me[0].paid ?
                                                <div className="button-group-1">
                                                    <input name="_eventId" defaultValue="validatePaymentDetails" type="hidden"/>
                                                    <input id="make-payment" defaultValue="Complete your purchase"
                                                           className="btn-1 launchLightBoxWithText" type="button" onClick={this.onCompletePurchaseHandler.bind(this)} />
                                                </div> : ''
                                        }

                                    </div>
                                </div>
                            </div>

                            <div className="grid-row">
                                <div className="grid-col one-third">
                                    <div className="grid-inner">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}