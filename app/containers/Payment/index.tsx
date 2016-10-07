import * as React from 'react';
import * as _ from 'lodash';
import * as axios from 'axios';
import {PaymentForm} from "../../components/PaymentForm";
import {BookingSummary} from "../../components/BookingSummary/index";
import {PassengerTicketSelectBox} from "../../components/PaasengerTicketSelectBox/index";
import {PassengerTicket} from "../../models/payment";
import {ThankYouMessage} from "../../components/ThankYou/index";

interface IProps {
    [key:string]:any;
}

interface IState {
    [key:string]:any;
    perTicketPrice?: number;
    numOfTickets?: number;
    passengers?: {[key:number]: PassengerTicket};
    showMinTicketError?: boolean;
    hasFormSubmitted?: boolean;
}

export class Payment extends React.Component<IProps, IState> {
    public constructor(props) {
        super(props);
        this.state = {
            perTicketPrice: 2500,
            numOfTickets: 0,
            passengers: {
                1001: {
                    firstName: 'John',
                    lastName: 'Smith',
                    email: '',
                    isPaying: true
                },
                1002: {
                    firstName: 'Jane',
                    lastName: 'Smith',
                    email: '',
                    isPaying: true
                },
                1003: {
                    firstName: 'Tom',
                    lastName: 'Smith',
                    email: '',
                    isPaying: true
                }
            },
            showMinTicketError: false,
            hasFormSubmitted: false
        };
    }

    private updatePassenger(pId: number, changes:{}) {
        const {passengers} = this.state;
        return Object.assign({}, passengers, { [pId]: Object.assign({}, passengers[pId], changes)})
    }

    private ticketSelectBoxOnChangeHandler(pId) {
        const {passengers} = this.state;
        //const ticketsPaying = Object.keys(_.pickBy(passengers, passenger => passenger.isPaying)).length;
        this.setState({
            //passengers: Object.assign({}, passengers, { [pId]: Object.assign({}, passengers[pId], {isPaying: !passengers[pId].isPaying})}),
            passengers: this.updatePassenger(pId, {isPaying: !passengers[pId].isPaying}),
            showMinTicketError: false
        });
    }

    private onSubmitPaymentHandler() {
        const passengers = Object.keys(this.state.passengers).map(pId => {
            const p = this.state.passengers[pId];
            return {
                name: `${p.firstName} ${p.lastName}`,
                email: p.email,
                paid: p.isPaying
            }
        })
        const data = {
            flightStart: {place: 'SIN', date: '05 Oct Wed'},
            flightEnd: {place: 'PEK', date: '05 Oct Wed'},
            flightPricePerPax: this.state.perTicketPrice,
            passengers: passengers
        }
        //console.log(data);

        axios.post('http://nodejs-mongodb-example-booking-backend.44fs.preview.openshiftapps.com/api/addSplitPayment', data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({hasFormSubmitted: true});
    }

    public render() {
        const {perTicketPrice, passengers, showMinTicketError} = this.state;
        const passengersTicketBoxes = Object.keys(passengers).map(id => <PassengerTicketSelectBox key={id} id={id} inputName="passengerTicket"
                                                                                                  passengerName={`${passengers[id].firstName}, ${passengers[id].lastName}`}
                                                                                                  checked={passengers[id].isPaying}
                                                                                                  onChange={() => this.ticketSelectBoxOnChangeHandler(id)}
                                                                                                  passengerEmail={passengers[id].email}
                                                                                                  onEmailInputChange={e => {
                                                                                                      this.setState({
                                                                                                          passengers: this.updatePassenger(id as any, {email: e.target.value})
                                                                                                      })
                                                                                                  }} />);
        const numOfTickets = Object.keys(_.pickBy(passengers, passenger => passenger.isPaying)).length;

        const isPayingAllPassengers = (numOfTickets / Object.keys(passengers).length === 1) ? true : false;



        return (
            <div>
                {
                   ! this.state.hasFormSubmitted ?
                        <PaymentForm
                            pageTitle="Payment"
                            showMinTicketError={showMinTicketError}
                            bookingSummary={ <BookingSummary perTicketPrice={perTicketPrice} numOfTickets={numOfTickets} airportTax={104.8} surcharge={589.6} /> }
                            passengerTicketBoxes={passengersTicketBoxes}
                            isPayAllPassengers={isPayingAllPassengers}
                            onPayingSelectionChange={(isPayAll:boolean) => {
                        let updatePassengers = Object.assign({}, passengers);

                        if(isPayAll) {
                            Object.keys(passengers).forEach(pId => { updatePassengers[pId].isPaying = true });
                        } else {
                            Object.keys(passengers).forEach(pId => { updatePassengers[pId].isPaying = false });
                        }
                        this.setState({passengers: updatePassengers});
                    }}
                            onPaymentSubmit={this.onSubmitPaymentHandler.bind(this)}
                        /> : <ThankYouMessage />
                }

            </div>
        );
    }
}