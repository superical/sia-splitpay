import * as React from 'react';
import {BookingTooltip} from "./BookingTooltip/index";
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {moneyFormatter} from "../../helpers/Utils/index";

interface IProps {
    [key:string]:any;
    perTicketPrice: number;
    numOfTickets: number;
    airportTax: number;
    surcharge: number;
}

interface IState {
    [key:string]:any;
    priceDiff: number;
}

const s = require('./style.scss');

export class BookingSummary extends React.Component<IProps, IState> {
    public constructor(props) {
        super(props);
        this.state = {priceDiff: 0};
    }

    public componentWillReceiveProps(nextProp:IProps) {
        const {perTicketPrice, numOfTickets, airportTax, surcharge} = this.props;
        const diff = (nextProp.perTicketPrice + nextProp.airportTax + nextProp.surcharge) * nextProp.numOfTickets - (perTicketPrice + airportTax + surcharge) * numOfTickets + this.state.priceDiff;

        this.setState({priceDiff: diff});
        setTimeout(() => this.setState({priceDiff: 0}), 3000);
    }


    public render() {
        const {priceDiff} = this.state;
        const {numOfTickets, perTicketPrice, airportTax, surcharge} = this.props;
        const totalCost = numOfTickets * (perTicketPrice + airportTax + surcharge);
        let bookingTooltip = null;
        if(priceDiff) bookingTooltip = <BookingTooltip key={priceDiff} priceDiff={priceDiff} />;

        return (
            <div>
                <div className={s.bookingSummaryContainer}>
                    <form action="https://www.singaporeair.com/booking-flow.form?execution=e2s4">
                        {/* /booking/common/bookingSummary-f.jsp */}
                        <div style={{}} className="booking-summary active">
                            <input id="countryCode" defaultValue="SG" type="hidden"/>
                            <input id="stopOverBoundCount" defaultValue={0} type="hidden"/>
                            <input id="usExceptionForInsurance" data-excludedstates type="hidden"/>
                            <div className="booking-summary__heading"><a href="#" className="booking-summary__control">Booking
                  summary<em className="ico-point-d"/></a>
                                <div className="booking-summary__info">
                                    <p className="number-passengers">{numOfTickets} Adults</p>
                                    <p data-headtotal="true" className="total-cost"><span
                                        className="unit">SGD {moneyFormatter(totalCost)}</span></p>
                                    <p className="fare-notice fare-notice-cib">Total fare including taxes and surcharges</p>
                                    <p className="fare-notice fare-notice-orb hidden">Total fare including taxes, surcharges and
                    discounts</p>
                                </div>
                                <span className="loading loading--medium-2 hidden">Loading...</span>
                            </div>
                            <div style={{display: 'block'}} className="booking-summary__content">
                                <div className="booking-group">
                                    <div className="booking-heading">
                                        <h3>Flights</h3><a href="#" className="link-4"
                                                           data-trigger-popup=".popup--flights-details"
                                                           data-popup-anchor="flights" data-is-disabled-stop-im="true"><em
                                        className="ico-point-r">&nbsp;</em>More details</a>
                                    </div>
                                    <div data-flight-info="true" className="booking-group__content">
                                        <div className="flights-info">
                                            <div className="flights-info-heading"><h4>Flight 1</h4>        <span>05 Oct (Wed) - 08:30</span>
                                            </div>
                                            <div className="flights-info__country"><span>SIN</span> <span>PEK</span></div>
                                        </div>
                                        <div className="flights-info">
                                            <div className="flights-info-heading"><h4>Flight 2</h4>        <span>19 Oct (Wed) - 00:05</span>
                                            </div>
                                            <div className="flights-info__country"><span>PEK</span> <span>SIN</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="booking-group">
                                    <div className="booking-heading bsp-cost-heading">
                                        <h3>COST</h3><a href="#" className="link-4"
                                                        data-trigger-popup=".popup--flights-details"
                                                        data-popup-anchor="cost" data-is-disabled-stop-im="true"><em
                                        className="ico-point-r">&nbsp;</em>More details</a>
                                    </div>
                                    <div className="booking-group__content">
                                        <div className="flights-cost">
                                            <h4 className="flights-cost-title"><span
                                                className="text-left">Flights</span><span className="text-right"/>
                                                <span data-orb-miles-head="true" className="hidden">
                          <span className="text-right" style={{textTransform: 'capitalize'}}>miles</span>
                          <span className="text-right"/>
                        </span>
                                            </h4>
                                            <ul className="flights-cost__details">
                                                <li data-fare="true"><span>Fare^</span><span
                                                    className="price">{moneyFormatter(perTicketPrice)}</span></li>
                                                <li data-fare-discount="true"><span /><span className="price"/></li>
                                                <li>
                                                    <h4 data-orb-currency="true" className="flights-cost-title hidden"
                                                        style={{marginBottom: 0}}>
                                                        <span className="text-right">SGD</span><span
                                                        className="text-right"/>
                                                    </h4>
                                                </li>
                                                <li data-taxes="true"><span>Airport/Government taxes</span><span
                                                    className="price">{moneyFormatter(this.props.airportTax)}</span>
                                                </li>
                                                <li data-carrier="true"><span>Carrier surcharges</span><span
                                                    className="price">{moneyFormatter(this.props.surcharge)}</span>
                                                </li>
                                                {/* Added for Credit Card Surcharge changes-Starts */}
                                                <li data-ccsurcharge="true"><span /><span className="price"/></li>
                                                {/* Added for Credit Card Surcharge changes-Ends */}
                                                <li data-qsurcharge="true"><span /><span className="price"/></li>
                                                <li data-others="true"><span id="others"
                                                                             className="hidden">Others</span><span
                                                    className="price"/></li>
                                                <li data-subtotal="true" className="sub-total"><span>Sub-total</span><span
                                                    className="price">SGD {moneyFormatter(totalCost)}</span></li>
                                            </ul>
                                        </div>
                                        <div className="flights-cost hidden">
                                            <h4 className="flights-cost-title"><span className="text-left">Add-ons</span>
                                            </h4>
                                            <ul className="flights-cost__details" data-addons="true"/>
                                        </div>
                                        <div className="flights-cost">
                                            <ul className="flights-cost__details">
                                                <li data-topup="true"><span /><span className="price"/></li>
                                            </ul>
                                        </div>
                                        <div className="flights-cost">
                                            <ul className="flights-cost__details">
                                                <li className="grand-price"><span>Grand total</span><span
                                                    data-grandtotal="true" className="price">SGD {moneyFormatter(totalCost)}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="grand-total"><span
                                            className="total-title">Total to be paid</span><span data-tobepaid="true"
                                                                                                 className="total-info"><span
                                            className="unit">SGD {moneyFormatter(totalCost)}</span></span>
                                            <p>Includes taxes and surcharges</p>
                                        </div>
                                    </div>
                                </div>
                                <ul className="cta-group">
                                    <li><a href="https://www.singaporeair.com/fareConditions.form?tripType=O&fromBS=true"
                                           className="link-4 launchLightBox fareConditions" id="summary-fare-conditions"><em
                                        className="ico-point-r">&nbsp;</em>Full fare rules and conditions</a>
                                    </li>
                                    <li>
                                        <a href="https://www.singaporeair.com/baggagelightbox.form?articleName=baggageAllowance_turbo&locale=en_UK&mode=r5"
                                           className="link-4 launchLightBox baggageAllowance" id="baggage-allowance"><em
                                            className="ico-point-r">&nbsp;</em>Baggage allowance</a>
                                    </li>
                                </ul>
                                <a href="#" className="visible-mb collapse-bsp" data-collapse-bsp="true"><em
                                    className="ico-point-d">
                                    &nbsp;</em></a>
                            </div>
                        </div>
                        <div className="tooltip-1 add-ons-booking-tooltip">
                            <div className="tooltip__content">
                                <p><span className="text-1"/></p>
                            </div>
                            <em className="tooltip__arrow"/>
                        </div>
                        {/* end bookingSummary-f.jsp */}
                        <input id="initiator" name="id" defaultValue={104} type="hidden"/>
                        <input id="flowIndicator" name="flowIndicator" defaultValue="CIB" type="hidden"/>
                        <input id="isinsuranceeligible" name="isinsuranceeligible" defaultValue="true" type="hidden"/>
                    </form>
                    <ReactCSSTransitionGroup transitionName={{
                    enter: s.bookingTooltip__enter,
                    enterActive: s.bookingTooltip__enter__active,
                    leave: s.bookingTooltip__leave,
                    leaveActive: s.bookingTooltip__leave__active,
                    appear: s.bookingTooltip__enter,
                    appearActive: s.bookingTooltip__enter__active
                }}
                transitionAppear={true} transitionAppearTimeout={3000} transitionEnterTimeout={3000} transitionLeaveTimeout={1000}>
                        {bookingTooltip}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
}