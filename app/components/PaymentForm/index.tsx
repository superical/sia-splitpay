import * as React from 'react';
import {PageHeading} from "../PageHeading";
const s = require('./style.scss');

interface IProps {
    [key:string]:any;
    pageTitle:string;
    bookingSummary:JSX.Element;
    passengerTicketBoxes: string[];
    showMinTicketError: boolean;
    onPayingSelectionChange: (isPayAll: boolean) => void;
    onPaymentSubmit: () => void;
}

export const PaymentForm = (props:IProps) => {
    const {pageTitle, bookingSummary, passengerTicketBoxes, showMinTicketError, isPayAllPassengers, onPayingSelectionChange, onPaymentSubmit} = props;

    const minTicketError = showMinTicketError ? <p className={s.minTicketErrorMessage}>You need to pay for at least 1 ticket.</p> : null;

    return (
        <div>
            <input id="paymentExecutionURL" name="paymentExecutionURL" defaultValue="/booking-flow.form?execution=e2s4"
                   type="hidden"/>
            {/* rinson : for Turbo B3 starts */}
            <form action="https://www.singaporeair.com/booking-flow.form?execution=e2s4">
            </form>
            <div className="odpecificMsgPayment">
                <div id="odpsecific">
                    <div id="staticOdSpecific" style={{display: 'none'}}>
                        <div className="odspecific alert-block checkin-alert">
                            <div className="inner">
                                <div className="alert__icon">
                                    <em className="ico-alert"/>
                                </div>
                                <div className=" odmessage alert__message"/>
                            </div>
                        </div>
                        <div className="odspecific horizontal_line"/>
                    </div>
                    <div id="chooseFlightODMessages"/>
                    <input id="odcheck" defaultValue="yes" type="hidden"/>
                </div>
            </div>
            <PageHeading title={pageTitle}/>
            {bookingSummary}
            {/* rinson : for Turbo B3 ends */}
            <div className="general-flight">
                <div className="content-wrapper">
                    <form noValidate="novalidate" id="payments-detail__form"
                          name="paymentDetailsForm" method="post"
                          action="https://www.singaporeair.com/booking-flow.form?execution=e2s4"
                          data-check-change="important" className="payments-detail__form" data-auto-detect-card="true">
                        <input name="isPyngPrtyTrvlingOnThisBkng" id="ispartytravelno" defaultValue="yes"
                               type="hidden"/>
                        <div className="main-intro">
                            <p>Review your booking and complete your payment and authentication within 8 minutes, or this
                  booking session may expire.</p>
                        </div>
                        <div className="main-intro">
                            <h3 className="sub-heading-1--dark">Select tickets to pay</h3>
                        </div>
                        <div className="payments-detail block-2">
                            <div className="payments-group payments-group__charge">
                                <div className="payments-inner">
                                    <p>You can choose to pay for selected passengers or all tickets. Passengers whose tickets are not paid will need to complete
                                their payment within 24 hours for their purchase to be fulfilled.</p>
                                    <div className="grid-row">
                                        <div className="grid-col">
                                            <div className="grid-inner">
                                                <div className="custom-radio custom-radio--1">
                                                    <input name="payForSelection" id="allPassengers" checked={isPayAllPassengers}
                                                           type="radio" onChange={onPayingSelectionChange.bind(this, true)}/>
                                                    <label htmlFor="allPassengers">I am paying for all passengers.</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid-row">
                                        <div className="grid-col">
                                            <div className="grid-inner">
                                                <div className="custom-radio custom-radio--1">
                                                    <input name="payForSelection" id="somePassengers" checked={!isPayAllPassengers}
                                                           type="radio" onChange={onPayingSelectionChange.bind(this, false)}/>
                                                    <label htmlFor="somePassengers">I would like to select passengers to pay.</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {minTicketError}
                                    <div className="grid-row">
                                        <div className="grid-col one-third">
                                            <div className="grid-inner">
                                                {(!isPayAllPassengers) ? passengerTicketBoxes : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="main-intro">
                            <h3 className="sub-heading-1--dark">Select payment method</h3>
                        </div>
                        <div className="payments-detail block-2">
                            <div className="payments-group payments-group__charge">
                                <div className="payments-inner">
                                    {/*START: /booking/payment/paymentDetails-f.jsp */}
                                    <input id="isMasterPass" defaultValue type="hidden"/>
                                    <fieldset>
                                        <input name="cardTypes" id="cardTypes" type="hidden"/>
                                        <input defaultValue="3514.40" disabled="disabled" name="mcpConversionRate"
                                               id="mcpConversionRate" type="hidden"/>
                                        <input defaultValue="SGD" disabled="disabled" name="mcpCurrencySelected"
                                               id="mcpCurrencySelected" type="hidden"/>
                                        <input id="paymentMode" defaultValue="CC" type="hidden"/>
                                        <input style={{display: 'none'}} name="fakepasswordremembered" type="password"/>
                                        <input id="booked_by_alipay" name="booked_by_alipay" defaultValue
                                               type="hidden"/>
                                        <div style={{display: 'none'}}>
                                            <input name="paymentMethod" id="kris" defaultValue="FFK" type="radio"/>
                                        </div>
                                        <p>A fee may be charged for a credit or debit card transaction. If the billing
                        currency of your credit/debit card is different from the currency charged for
                        this booking, your bank will perform the relevant conversion at their prevailing
                        exchange rate and may charge a conversion fee. Ask your service provider for
                        details</p>
                                        <div className="grid-row">
                                            <div className="grid-col one-third">
                                                <div className="grid-inner">
                                                    <div className="custom-radio custom-radio--1" data-tabs={1}>
                                                        <input name="paymentMethod" id="masterPass" defaultValue="MP"
                                                               type="radio"/>
                                                        <label htmlFor="masterPass">MasterPass</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid-col two-third">
                                                <div className="grid-inner"><img src="card-master-pass.png" alt
                                                /><a href="#"
                                                     className="info-card"
                                                     data-type={2}
                                                     data-tooltip="true"
                                                     data-content="<p class=&quot;tooltip__text-2&quot;>Pay securely with your linked credit/debit card with just one click.</p>"><em
                                                    className="ico-info-round-fill"/></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid-row">
                                            <div className="grid-col one-third">
                                                <div className="grid-inner">
                                                    <div className="custom-radio custom-radio--1" data-tabs={3}>
                                                        <input name="paymentMethod" id="paypal" defaultValue="PP"
                                                               type="radio"/>
                                                        <label htmlFor="paypal">PayPal</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid-col two-third">
                                                <div className="grid-inner"><img src="card-paypal.png" alt
                                                /><a href="#"
                                                     className="info-card"
                                                     data-type={2}
                                                     data-tooltip="true"
                                                     data-content="<p class=&quot;tooltip__text-2&quot;>Pay securely with money stored in your PayPal account, or a linked credit/debit card.</p>"><em
                                                    className="ico-info-round-fill"/></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid-row">
                                            <div className="grid-col one-third">
                                                <div className="grid-inner">
                                                    <div className="custom-radio custom-radio--1 wpPymtType"
                                                         data-tabs="UP">
                                                        <input name="paymentMethod" id="unionpay" defaultValue="UP"
                                                               type="radio"/>
                                                        <label htmlFor="unionpay">UnionPay</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid-col two-third">
                                                <div className="grid-inner"><img src="card-unionpay.png" alt
                                                /><a href="#"
                                                     className="info-card"
                                                     data-type={2}
                                                     data-tooltip="true"
                                                     data-content="<p class=&quot;tooltip__text-2&quot;>Pay securely with money stored in your UnionPay account, or a linked credit/debit card.</p>"><em
                                                    className="ico-info-round-fill"/></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid-row">
                                            <div className="grid-col one-third">
                                                <div className="grid-inner">
                                                    <div className="custom-radio custom-radio--1 checked" data-tabs={4}>
                                                        <input name="paymentMethod" id="creditcard" defaultValue="CC"
                                                               defaultChecked="checked"
                                                               data-trigger-detectcard="#credit-debit-number"
                                                               type="radio"/>
                                                        <label htmlFor="creditcard">Credit / Debit card</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid-col two-third">
                                                <div className="grid-inner">
                                                    <img src="vi.gif" alt="Visa" data-format-card="Visa"
                                                         className="type-card grey-out"
                                                         height={20} width={31}/>
                                                    <img src="dc.gif" alt="Diners Club" data-format-card="Diners Club"
                                                         className="type-card grey-out"
                                                         height={20} width={31}/>
                                                    <img src="jc.gif" alt="Japan Credit Bureau"
                                                         data-format-card="Japan Credit Bureau"
                                                         className="type-card grey-out" height={20} width={31}/>
                                                    <img src="mc.gif" alt="MasterCard" data-format-card="MasterCard"
                                                         className="type-card grey-out"
                                                         height={20} width={31}/>
                                                    <img src="ax.gif" alt="American Express"
                                                         data-format-card="American Express"
                                                         className="type-card grey-out" height={20} width={31}/>
                                                    <a href="#" className="info-card link-icon" data-type={2}
                                                       data-tooltip="true"
                                                       data-content="<p class=&quot;tooltip__text-2&quot;>Virtual and prepaid cards are not accepted.</p>"><em
                                                        className="ico-info-round-fill"/></a>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="#" className="link-4 hidden" data-trigger-popup=".popup--payment-faqs"><em
                                            className="ico-point-r">&nbsp;</em>Payment FAQs</a>
                                    </fieldset>
                                    <p className="card-alert">
                                        Alipay is only available if you're departing from China.</p>
                                        <fieldset style={{display: 'block'}} data-tabs={4}
                                                  className="complete-fields active">
                                            <p>In some instances, credit/debit card verification may be required.</p>
                                            {/* Added for Credit Card Surcharge changes-Starts */}
                                            <input id="CredCardSurIndValHidden" defaultValue="false" type="hidden"/>
                                            {/* Added for Credit Card Surcharge changes-Ends */}
                                            <p className="note">Please complete all fields marked with *.</p>
                                            <div className="form-group grid-row">
                                                <div className="grid-col one-half">
                                                    <div className="grid-inner">
                                                        <label
                                                            htmlFor="credit-debit">Name on credit / debit card*</label><span
                                                        className="input-1">
                              <input aria-required="true" className="default" name="nameOnTheCard" id="credit-debit"
                                     placeholder defaultValue size={40} maxLength={40} data-rule-required="true"
                                     autoComplete="off" data-msg-required="Enter the cardholder’s name."
                                     data-rule-nameoncard="true"
                                     data-msg-nameoncard="Enter only letters of the English alphabet." type="text"/><a
                                                        href="#clear" className="ico-cancel-thin add-clear-text"
                                                        tabIndex={-1}/></span>
                                                    </div>
                                                </div>
                                                <div className="grid-col one-half">
                                                    <div className="grid-inner">
                                                        <label htmlFor="credit-debit-number">Credit / Debit card
                              number*</label><span className="input-1">
                              <input aria-required="true" className="default" name="cardNumber" id="credit-debit-number"
                                     placeholder defaultValue size={40} maxLength={19} data-rule-creditcard="true"
                                     data-msg-creditcard="Enter a valid credit card number" autoComplete="off"
                                     data-rule-required="true" data-auto-detect-input="true"
                                     data-msg-required="Please enter credit / debit card number" type="tel"/><a
                                                        href="#clear" className="ico-cancel-thin add-clear-text"
                                                        tabIndex={-1}/>
                              <input aria-required="true" className="default" style={{display: 'none'}}
                                     id="credit-debit-avoid-autofill-number" placeholder defaultValue size={40}
                                     maxLength={19} data-rule-creditcard="true"
                                     data-msg-creditcard="Enter a valid credit card number" autoComplete="off"
                                     data-rule-required="true"
                                     data-msg-required="Please enter credit / debit card number" type="tel"/><a
                                                        href="#clear" className="ico-cancel-thin add-clear-text"
                                                        tabIndex={-1}/>
                            </span>
                                                        <p className="text-error"><span id="cardErr"/>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group grid-row">
                                                <div className="grid-col one-half form-group-inner" id="expDate">
                                                    <div className="form-group grid-row">
                                                        <div className="grid-col one-half">
                                                            <div className="grid-inner">
                                                                <label>Expiry date*</label>
                                                                <div data-customselect="true"
                                                                     className="custom-select custom-select--2 default">
                                                                    <label htmlFor="pax1-26" className="select__label">
                                                                        &nbsp;</label><span
                                                                    className="select__text">MMM</span><span
                                                                    className="ico-dropdown">MMM</span>
                                                                    <select aria-required="true"
                                                                            style={{visibility: 'hidden'}} id="pax1-26"
                                                                            name="expDateMonth" data-rule-mindate="true"
                                                                            data-msg-mindate="Enter a valid date"
                                                                            autoComplete="off" data-rule-required="true"
                                                                            data-msg-required="Select month.">
                                                                        <option value>MMM</option>
                                                                        <option data-text="January" value={1}>January
                                                                        </option>
                                                                        <option data-text="February" value={2}>
                                                                            February
                                                                        </option>
                                                                        <option data-text="March" value={3}>March
                                                                        </option>
                                                                        <option data-text="April" value={4}>April
                                                                        </option>
                                                                        <option data-text="May" value={5}>May</option>
                                                                        <option data-text="June" value={6}>June</option>
                                                                        <option data-text="July" value={7}>July</option>
                                                                        <option data-text="August" value={8}>August
                                                                        </option>
                                                                        <option data-text="September" value={9}>
                                                                            September
                                                                        </option>
                                                                        <option data-text="October" value={10}>October
                                                                        </option>
                                                                        <option data-text="November" value={11}>November
                                                                        </option>
                                                                        <option data-text="December" value={12}>December
                                                                        </option>
                                                                    </select><input defaultValue
                                                                                    style={{width: '100%', height: '100%', opacity: 0, position: 'absolute', top: 0, left: '-10%', bottom: 0, right: 0}}
                                                                                    readOnly="readonly" type="text"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="grid-col one-half">
                                                            <div className="grid-inner">
                                                                <label>&nbsp;</label>
                                                                <div data-customselect="true"
                                                                     className="custom-select custom-select--2 default">
                                                                    <label htmlFor="input-year"
                                                                           className="select__label">&nbsp;</label><span
                                                                    className="select__text">YYYY</span><span
                                                                    className="ico-dropdown">YYYY</span>
                                                                    <select aria-required="true"
                                                                            style={{visibility: 'hidden'}}
                                                                            id="input-year" name="expDateYear"
                                                                            data-rule-mindate="true"
                                                                            data-msg-mindate=" "
                                                                            data-rule-required="true" autoComplete="off"
                                                                            data-msg-required="Select year.">
                                                                        <option value>YYYY</option>
                                                                        <option data-text={2016} value={2016}>2016
                                                                        </option>
                                                                        <option data-text={2017} value={2017}>2017
                                                                        </option>
                                                                        <option data-text={2018} value={2018}>2018
                                                                        </option>
                                                                        <option data-text={2019} value={2019}>2019
                                                                        </option>
                                                                        <option data-text={2020} value={2020}>2020
                                                                        </option>
                                                                        <option data-text={2021} value={2021}>2021
                                                                        </option>
                                                                        <option data-text={2022} value={2022}>2022
                                                                        </option>
                                                                        <option data-text={2023} value={2023}>2023
                                                                        </option>
                                                                        <option data-text={2024} value={2024}>2024
                                                                        </option>
                                                                        <option data-text={2025} value={2025}>2025
                                                                        </option>
                                                                        <option data-text={2026} value={2026}>2026
                                                                        </option>
                                                                        <option data-text={2027} value={2027}>2027
                                                                        </option>
                                                                        <option data-text={2028} value={2028}>2028
                                                                        </option>
                                                                        <option data-text={2029} value={2029}>2029
                                                                        </option>
                                                                        <option data-text={2030} value={2030}>2030
                                                                        </option>
                                                                        <option data-text={2031} value={2031}>2031
                                                                        </option>
                                                                        <option data-text={2032} value={2032}>2032
                                                                        </option>
                                                                        <option data-text={2033} value={2033}>2033
                                                                        </option>
                                                                        <option data-text={2034} value={2034}>2034
                                                                        </option>
                                                                        <option data-text={2035} value={2035}>2035
                                                                        </option>
                                                                        <option data-text={2036} value={2036}>2036
                                                                        </option>
                                                                    </select><input defaultValue
                                                                                    style={{width: '100%', height: '100%', opacity: 0, position: 'absolute', top: 0, left: '-10%', bottom: 0, right: 0}}
                                                                                    readOnly="readonly" type="text"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid-col one-half number-cvv">
                                                    <div className="grid-inner">
                                                        <label htmlFor="input-cvv">CVV*<a href="#" className="info-card"
                                                                                          data-type={2}
                                                                                          data-trigger-popup="[data-popup-ccv]"
                                                                                          tabIndex={-1}><em
                                                            className="ico-info-round-fill"/></a>
                                                        </label><span className="input-1">
                              <input aria-required="true" className="default" name="securityNumber" id="input-cvv"
                                     placeholder size={4} maxLength={3} defaultValue
                                     data-rule-required="true" autoComplete="off"
                                     data-msg-required="Enter the credit/debit card security code."
                                     data-msg-digits="Only numbers allowed" data-rule-digits="true" type="password"/>
                              <input aria-required="true" className="default" style={{display: 'none'}}
                                     id="input-avoid-autofill-cvv" placeholder size={4} maxLength={3} defaultValue
                                     data-rule-required="true" autoComplete="off"
                                     data-msg-required="Enter the credit/debit card security code."
                                     data-msg-digits="Only numbers allowed" data-rule-digits="true" type="password"/>
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="list-cards">
                                                <li><img src="card-credit-6.png" alt />
                                                </li>
                                                <li><img src="card-credit-7.png" alt />
                                                </li>
                                                <li><img src="card-credit-8.png" alt />
                                                </li>
                                            </ul>
                                        </fieldset>
                                        <fieldset style={{display: 'none'}} data-tabs={3} className="payment-currency">
                                            <div className="custom-checkbox custom-checkbox--1" data-toggler="true">
                                                <input name="change-payment-currency" id="change-payment-currency"
                                                       type="checkbox"/>
                                                <label htmlFor="change-payment-currency">Change payment currency</label>
                                            </div>
                                            <ul>
                                                <li>If your credit card is billed in one of the major currencies available,
                          you're welcome to pay for your booking in that currency.
                                                </li>
                                                <li>The total amount will be converted based on the most competitive rate from
                          our financial partners.<br />. If you purchase a refundable ticket and cancel
                          your booking, you'll receive your refund based on the default fare currency.
                                                </li>
                                            </ul>
                                            <div className="wrap-payment-convert">
                                                <div className="form-inline">
                                                    <label htmlFor="input-alexandra-road-1"
                                                           className="hidden">&nbsp;</label><span data-address-line1
                                                                                                  className="input-1 price-input disabled">
                            <input data-actualvalue="3514.4" name="input-alexandra-road-1" id="input-alexandra-road-1"
                                   placeholder defaultValue="3,514.40" readOnly="readonly" data-source="true"
                                   data-default-value={0} type="text"/></span>
                                                </div>
                                                <span className="left">to</span>
                                                <div className="form-inline">
                                                    <div data-customselect="true"
                                                         className="custom-select custom-select--2 disabled default"
                                                         data-rate="true">
                                                        <label htmlFor="pax1-27"
                                                               className="select__label">&nbsp;</label><span
                                                        className="select__text"/><span className="ico-dropdown">Currency</span>
                                                        <select style={{visibility: 'hidden'}} id="pax1-27"
                                                                name="pax1-27">
                                                        </select><input defaultValue
                                                                        style={{width: '100%', height: '100%', opacity: 0, position: 'absolute', top: 0, left: '-10%', bottom: 0, right: 0}}
                                                                        readOnly="readonly" type="text"/>
                                                    </div>
                                                </div>
                                                <div className="form-inline">
                                                    <label htmlFor="input-alexandra-road-2"
                                                           className="hidden">&nbsp;</label><span data-address-line1
                                                                                                  className="input-1 disabled">
                            <input name="input-alexandra-road-2" id="input-alexandra-road-2" placeholder
                                   defaultValue="3,514.40" readOnly="readonly" data-destination="true"
                                   type="text"/></span>
                                                </div>
                                            </div>
                                            <input id="sliderChange" name="sliderChange" type="hidden"/>
                                        </fieldset>
                                        <fieldset style={{display: 'none'}} data-tabs={1}
                                                  className="krisflyer-account complete-fields">
                                            <div className="booking-group"/>
                                            <p className="paymentpageinfo-fontMax">
                                                By choosing to pay with MasterPass, you'll be directed to MasterPass website to
                                                complete your payment. You'll automatically return to singaporeair.com once your
                                                payment is accepted.
                                            </p>
                                        </fieldset>
                                        <fieldset style={{display: 'none'}} data-tabs={3}
                                                  className="krisflyer-account complete-fields">
                                            <div className="booking-group"/>
                                            <p className="paymentpageinfo-fontMax">By choosing to pay with PayPal, you'll be
                        directed to PayPal website to complete your payment. You'll automatically return
                        to singaporeair.com once your payment is accepted. Your booking cannot be
                        changed or cancelled online. For assistance, get in touch with your <a
                                                href="https://www.singaporeair.com/en_UK/contact-us/">local Singapore
                          Airlines office. </a></p>
                                            <br />
                                            <p><span className="paymentpageinfo-fontMin">Note: Tickets bought using PayPal cannot be changed or cancelled via singaporeair.com. Customers may call/visit their nearest Singapore Airlines Ticket Office to make such changes. Any applicable additional charges due to the changes must be paid by credit card or in cash (for in person payments at a ticketing office only)</span>
                                            </p>
                                        </fieldset>
                                        <fieldset style={{display: 'none'}} data-tabs={2}
                                                  className="krisflyer-account complete-fields">
                                            <div className="booking-group"/>
                                            <p className="paymentpageinfo-fontMax">By choosing to pay with Alipay, you'll be
                        directed to Alipay website to complete your payment. Once payment is accepted,
                        you'll automatically return to singaporeair.com.</p>
                                        </fieldset>
                                        <fieldset style={{display: 'none'}} data-tabs="UP"
                                                  className="krisflyer-account complete-fields">
                                            <div className="booking-group"/>
                                            <div className="paymentpageinfo-font">
                                                <p className="paymentpageinfo-fontMax">
                                                </p>
                                                <p>When you pay with UnionPay, you'll be directed to the UnionPay website to
                          complete your payment. Once payment is accepted, you'll automatically return
                          to&nbsp;singaporeair.com. Tickets bought using&nbsp;UnionPay&nbsp;cannot be
                          changed or cancelled online. For assistance, get in touch with your local
                          Singapore Airlines office.</p>
                                                <p>Any additional charges must be paid by credit card (excluding UnionPay, which
                          can only be used as an online payment mode), or in cash. For in-person
                          payments, charges must be paid in cash only.</p>
                                                <p />
                                            </div>
                                        </fieldset>
                                        <fieldset style={{display: 'block'}} data-tabs={4}
                                                  className="krisflyer-account complete-fields active">
                                            <div className="form-group grid-row">
                                                <div className="grid-col full">
                                                    <div className="grid-inner">
                                                        <label>Billing address*</label>
                                                        <input id="addrsFrmProfl" defaultValue type="hidden"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group grid-row">
                                                <div className="grid-col full">
                                                    <div className="grid-inner">
                                                        <label htmlFor="address-line1">Address line 1*</label><span
                                                        className="input-1" data-address-line1>
                              <input aria-required="true" className="default" name="address1" id="address-line1"
                                     placeholder size={40} maxLength={30} defaultValue data-rule-required="true"
                                     data-msg-required="Enter letters of the English alphabet, numbers, and if required, any of these symbols #'/-_"
                                     data-rule-address="true" data-msg-address="Enter a valid address line."
                                     type="text"/><a href="#clear" className="ico-cancel-thin add-clear-text"
                                                     tabIndex={-1}/></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group grid-row">
                                                <div className="grid-col full">
                                                    <div className="grid-inner">
                                                        <label htmlFor="address-line2">Address line 2</label><span
                                                        className="input-1" data-address-line2>
                              <input className="default" name="address2" id="address-line2" placeholder size={40}
                                     maxLength={30} defaultValue data-rule-address="true"
                                     data-msg-address="Enter a valid address line." type="text"/><a href="#clear"
                                                                                                    className="ico-cancel-thin add-clear-text"
                                                                                                    tabIndex={-1}/></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group grid-row">
                                                <div className="grid-col full">
                                                    <div className="grid-inner">
                                                        <label htmlFor="address-line3">Address line 3</label><span
                                                        className="input-1" data-address-line3> <input
                                                        className="default" name="address3" id="address-line3"
                                                        placeholder size={40} maxLength={30} defaultValue
                                                        data-rule-address="true"
                                                        data-msg-address="Enter a valid address line." type="text"/><a
                                                        href="#clear" className="ico-cancel-thin add-clear-text"
                                                        tabIndex={-1}/></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group grid-row">
                                                <div className="grid-col full">
                                                    <div className="grid-inner">
                                                        <label htmlFor="address-line4">Address line 4</label><span
                                                        className="input-1" data-address-line4> <input
                                                        className="default" name="address4" id="address-line4"
                                                        placeholder size={40} maxLength={30} defaultValue
                                                        data-rule-address="true"
                                                        data-msg-address="Enter a valid address line." type="text"/><a
                                                        href="#clear" className="ico-cancel-thin add-clear-text"
                                                        tabIndex={-1}/></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group grid-row">
                                                <div className="grid-col one-half">
                                                    <div className="grid-inner">
                                                        <label>Country / Region*</label>
                                                        <input id="usInsurance" defaultValue="false" type="hidden"/>
                                                        <div data-autocomplete="true"
                                                             className="custom-select custom-select--2 autocomplete default">
                                                            {/* <label for="countryInput" class="input-1">&nbsp;</label> */}
                                                            <span className="select__text" data-country-region>
                                <span className="ui-helper-hidden-accessible" aria-live="polite" role="status"/><input
                                                                autoComplete="off" className="ui-autocomplete-input"
                                                                aria-required="true" id="countryInput"
                                                                placeholder="Country" defaultValue
                                                                data-rule-required="true"
                                                                data-msg-required="Select a country/region of residence."
                                                                type="text"/><a href="#clear"
                                                                                className="ico-cancel-thin add-clear-text"
                                                                                tabIndex={-1}/>
                              </span>
                                                            <span className="ico-dropdown"
                                                                  data-country-region>arrow</span>
                                                            <label htmlFor="countryDD" className="select__label">&nbsp;
                                                                <select id="countryDD" name="countryDD">
                                                                    <option value="AF" data-text="Afghanistan">
                                                                        Afghanistan
                                                                    </option>
                                                                    <option value="AL" data-text="Albania">Albania
                                                                    </option>
                                                                    <option value="DZ" data-text="Algeria">Algeria
                                                                    </option>
                                                                    <option value="AS" data-text="American Samoa">American
                                    Samoa
                                                                    </option>
                                                                    <option value="AD" data-text="Andorra">Andorra
                                                                    </option>
                                                                    <option value="AO" data-text="Angola">Angola
                                                                    </option>
                                                                    <option value="AI" data-text="Anguilla">Anguilla
                                                                    </option>
                                                                    <option value="AQ" data-text="Antarctica">Antarctica
                                                                    </option>
                                                                    <option value="AG" data-text="Antigua And Barbuda">Antigua
                                    And Barbuda
                                                                    </option>
                                                                    <option value="AR" data-text="Argentina">Argentina
                                                                    </option>
                                                                    <option value="AM" data-text="Armenia">Armenia
                                                                    </option>
                                                                    <option value="AW" data-text="Aruba">Aruba</option>
                                                                    <option value="AU" data-text="Australia">Australia
                                                                    </option>
                                                                    <option value="AT" data-text="Austria">Austria
                                                                    </option>
                                                                    <option value="AZ" data-text="Azerbaijan Republic">
                                                                        Azerbaijan Republic
                                                                    </option>
                                                                    <option value="BS" data-text="Bahamas">Bahamas
                                                                    </option>
                                                                    <option value="BH" data-text="Bahrain">Bahrain
                                                                    </option>
                                                                    <option value="BD" data-text="Bangladesh">Bangladesh
                                                                    </option>
                                                                    <option value="BB" data-text="Barbados">Barbados
                                                                    </option>
                                                                    <option value="BY" data-text="Belarus">Belarus
                                                                    </option>
                                                                    <option value="BE" data-text="Belgium">Belgium
                                                                    </option>
                                                                    <option value="BZ" data-text="Belize">Belize
                                                                    </option>
                                                                    <option value="BJ" data-text="Benin">Benin</option>
                                                                    <option value="BM" data-text="Bermuda">Bermuda
                                                                    </option>
                                                                    <option value="BT" data-text="Bhutan">Bhutan
                                                                    </option>
                                                                    <option value="BO" data-text="Bolivia">Bolivia
                                                                    </option>
                                                                    <option value="BQ"
                                                                            data-text="Bonaire, Sint Eustatius and Saba">
                                                                        Bonaire, Sint Eustatius and Saba
                                                                    </option>
                                                                    <option value="BA" data-text="Bosnia-Herzegovina">
                                                                        Bosnia-Herzegovina
                                                                    </option>
                                                                    <option value="BW" data-text="Botswana">Botswana
                                                                    </option>
                                                                    <option value="BR" data-text="Brazil">Brazil
                                                                    </option>
                                                                    <option value="BN" data-text="Brunei Darussalam">Brunei
                                    Darussalam
                                                                    </option>
                                                                    <option value="BG" data-text="Bulgaria">Bulgaria
                                                                    </option>
                                                                    <option value="BF" data-text="Burkina Faso">
                                                                        Burkina Faso
                                                                    </option>
                                                                    <option value="BI" data-text="Burundi">Burundi
                                                                    </option>
                                                                    <option value="KH" data-text="Cambodia">Cambodia
                                                                    </option>
                                                                    <option value="CM" data-text="Cameroon">Cameroon
                                                                    </option>
                                                                    <option value="CA" data-text="Canada">Canada
                                                                    </option>
                                                                    <option value="CV" data-text="Cape Verde">Cape Verde
                                                                    </option>
                                                                    <option value="KY" data-text="Cayman Islands">Cayman
                                    Islands
                                                                    </option>
                                                                    <option value="CF"
                                                                            data-text="Central African Republic">
                                                                        Central African Republic
                                                                    </option>
                                                                    <option value="TD" data-text="Chad">Chad</option>
                                                                    <option value="IO" data-text="Chagos Archipelago">Chagos
                                    Archipelago
                                                                    </option>
                                                                    <option value="CL" data-text="Chile">Chile</option>
                                                                    <option value="CX" data-text="Christmas Island">Christmas
                                    Island
                                                                    </option>
                                                                    <option value="CC" data-text="Cocos Island">
                                                                        Cocos Island
                                                                    </option>
                                                                    <option value="CO" data-text="Colombia">Colombia
                                                                    </option>
                                                                    <option value="DM"
                                                                            data-text="Commonwealth of Dominica">
                                                                        Commonwealth of Dominica
                                                                    </option>
                                                                    <option value="KM" data-text="Comoros">Comoros
                                                                    </option>
                                                                    <option value="CK" data-text="Cook Islands">
                                                                        Cook Islands
                                                                    </option>
                                                                    <option value="CR" data-text="Costa Rica">Costa Rica
                                                                    </option>
                                                                    <option value="CI" data-text="Cote D'Ivoire">
                                                                        Cote D'Ivoire
                                                                    </option>
                                                                    <option value="HR" data-text="Croatia">Croatia
                                                                    </option>
                                                                    <option value="CU" data-text="Cuba">Cuba</option>
                                                                    <option value="CW" data-text="Curacao">Curacao
                                                                    </option>
                                                                    <option value="CY" data-text="Cyprus">Cyprus
                                                                    </option>
                                                                    <option value="CZ" data-text="Czech Republic">Czech
                                    Republic
                                                                    </option>
                                                                    <option value="CD"
                                                                            data-text="Democratic Republic of Congo">
                                                                        Democratic Republic of Congo
                                                                    </option>
                                                                    <option value="DK" data-text="Denmark">Denmark
                                                                    </option>
                                                                    <option value="DJ" data-text="Djibouti">Djibouti
                                                                    </option>
                                                                    <option value="DO" data-text="Dominican Republic">Dominican
                                    Republic
                                                                    </option>
                                                                    <option value="EC" data-text="Ecuador">Ecuador
                                                                    </option>
                                                                    <option value="EG" data-text="Egypt">Egypt</option>
                                                                    <option value="SV" data-text="El Salvador">
                                                                        El Salvador
                                                                    </option>
                                                                    <option value="GQ" data-text="Equatorial Guinea">Equatorial
                                    Guinea
                                                                    </option>
                                                                    <option value="EE" data-text="Estonia">Estonia
                                                                    </option>
                                                                    <option value="ET" data-text="Ethiopia">Ethiopia
                                                                    </option>
                                                                    <option value="FK" data-text="Falkland Islands">Falkland
                                    Islands
                                                                    </option>
                                                                    <option value="FO" data-text="Faroe Islands">
                                                                        Faroe Islands
                                                                    </option>
                                                                    <option value="FJ" data-text="Fiji">Fiji</option>
                                                                    <option value="FI" data-text="Finland">Finland
                                                                    </option>
                                                                    <option value="FR" data-text="France">France
                                                                    </option>
                                                                    <option value="GF" data-text="French Guiana">
                                                                        French Guiana
                                                                    </option>
                                                                    <option value="PF" data-text="French Polynesia">French
                                    Polynesia
                                                                    </option>
                                                                    <option value="TF"
                                                                            data-text="French Southern Territories">
                                                                        French Southern Territories
                                                                    </option>
                                                                    <option value="GA" data-text="Gabon">Gabon</option>
                                                                    <option value="GM" data-text="Gambia">Gambia
                                                                    </option>
                                                                    <option value="GE" data-text="Georgia">Georgia
                                                                    </option>
                                                                    <option value="DE" data-text="Germany">Germany
                                                                    </option>
                                                                    <option value="GH" data-text="Ghana">Ghana</option>
                                                                    <option value="GI" data-text="Gibraltar">Gibraltar
                                                                    </option>
                                                                    <option value="GR" data-text="Greece">Greece
                                                                    </option>
                                                                    <option value="GL" data-text="Greenland">Greenland
                                                                    </option>
                                                                    <option value="GD" data-text="Grenada">Grenada
                                                                    </option>
                                                                    <option value="GP" data-text="Guadeloupe">Guadeloupe
                                                                    </option>
                                                                    <option value="GU" data-text="Guam">Guam</option>
                                                                    <option value="GT" data-text="Guatemala">Guatemala
                                                                    </option>
                                                                    <option value="GN" data-text="Guinea">Guinea
                                                                    </option>
                                                                    <option value="GW" data-text="Guinea-Bissau">
                                                                        Guinea-Bissau
                                                                    </option>
                                                                    <option value="GY" data-text="Guyana">Guyana
                                                                    </option>
                                                                    <option value="HT" data-text="Haiti">Haiti</option>
                                                                    <option value="HN" data-text="Honduras">Honduras
                                                                    </option>
                                                                    <option value="HK" data-text="Hong Kong SAR">
                                                                        Hong Kong SAR
                                                                    </option>
                                                                    <option value="HU" data-text="Hungary">Hungary
                                                                    </option>
                                                                    <option value="IS" data-text="Iceland">Iceland
                                                                    </option>
                                                                    <option value="IN" data-text="India">India</option>
                                                                    <option value="ID" data-text="Indonesia">Indonesia
                                                                    </option>
                                                                    <option value="IR" data-text="Iran">Iran</option>
                                                                    <option value="IQ" data-text="Iraq">Iraq</option>
                                                                    <option value="IE" data-text="Ireland">Ireland
                                                                    </option>
                                                                    <option value="IL" data-text="Israel">Israel
                                                                    </option>
                                                                    <option value="IT" data-text="Italy">Italy</option>
                                                                    <option value="JM" data-text="Jamaica">Jamaica
                                                                    </option>
                                                                    <option value="JP" data-text="Japan">Japan</option>
                                                                    <option value="JO" data-text="Jordan">Jordan
                                                                    </option>
                                                                    <option value="KZ" data-text="Kazakhstan">Kazakhstan
                                                                    </option>
                                                                    <option value="KE" data-text="Kenya">Kenya</option>
                                                                    <option value="LS" data-text="Kingdom Of Lesotho">Kingdom Of
                                    Lesotho
                                                                    </option>
                                                                    <option value="KI" data-text="Kiribati">Kiribati
                                                                    </option>
                                                                    <option value="KP" data-text="Korea (North)">
                                                                        Korea (North)
                                                                    </option>
                                                                    <option value="KW" data-text="Kuwait">Kuwait
                                                                    </option>
                                                                    <option value="KG" data-text="Kyrgyzstan">Kyrgyzstan
                                                                    </option>
                                                                    <option value="LA" data-text="Laos">Laos</option>
                                                                    <option value="LV" data-text="Latvia">Latvia
                                                                    </option>
                                                                    <option value="LB" data-text="Lebanon">Lebanon
                                                                    </option>
                                                                    <option value="LR" data-text="Liberia">Liberia
                                                                    </option>
                                                                    <option value="LY" data-text="Libya">Libya</option>
                                                                    <option value="LI" data-text="Liechtenstein">
                                                                        Liechtenstein
                                                                    </option>
                                                                    <option value="LT" data-text="Lithuania">Lithuania
                                                                    </option>
                                                                    <option value="LU" data-text="Luxembourg">Luxembourg
                                                                    </option>
                                                                    <option value="MO" data-text="Macau">Macau</option>
                                                                    <option value="MK" data-text="Macedonia">Macedonia
                                                                    </option>
                                                                    <option value="MG" data-text="Madagascar">Madagascar
                                                                    </option>
                                                                    <option value="MW" data-text="Malawi">Malawi
                                                                    </option>
                                                                    <option value="MY" data-text="Malaysia">Malaysia
                                                                    </option>
                                                                    <option value="MV" data-text="Maldives">Maldives
                                                                    </option>
                                                                    <option value="MT" data-text="Malta">Malta</option>
                                                                    <option value="MH" data-text="Marshall Islands">Marshall
                                    Islands
                                                                    </option>
                                                                    <option value="MQ" data-text="Martinique">Martinique
                                                                    </option>
                                                                    <option value="MR" data-text="Mauritania">Mauritania
                                                                    </option>
                                                                    <option value="MU" data-text="Mauritius">Mauritius
                                                                    </option>
                                                                    <option value="YT" data-text="Mayotte">Mayotte
                                                                    </option>
                                                                    <option value="MX" data-text="Mexico">Mexico
                                                                    </option>
                                                                    <option value="FM" data-text="Micronesia">Micronesia
                                                                    </option>
                                                                    <option value="MD" data-text="Moldova">Moldova
                                                                    </option>
                                                                    <option value="MC" data-text="Monaco">Monaco
                                                                    </option>
                                                                    <option value="MN" data-text="Mongolia">Mongolia
                                                                    </option>
                                                                    <option value="ME" data-text="Montenegro">Montenegro
                                                                    </option>
                                                                    <option value="MS" data-text="Montserrat">Montserrat
                                                                    </option>
                                                                    <option value="MA" data-text="Morocco">Morocco
                                                                    </option>
                                                                    <option value="MZ" data-text="Mozambique">Mozambique
                                                                    </option>
                                                                    <option value="MM" data-text="Myanmar">Myanmar
                                                                    </option>
                                                                    <option value="NA" data-text="Namibia">Namibia
                                                                    </option>
                                                                    <option value="NR" data-text="Nauru">Nauru</option>
                                                                    <option value="NP" data-text="Nepal">Nepal</option>
                                                                    <option value="NL" data-text="Netherlands">
                                                                        Netherlands
                                                                    </option>
                                                                    <option value="NC" data-text="New Caledonia">
                                                                        New Caledonia
                                                                    </option>
                                                                    <option value="NZ" data-text="New Zealand">
                                                                        New Zealand
                                                                    </option>
                                                                    <option value="NI" data-text="Nicaragua">Nicaragua
                                                                    </option>
                                                                    <option value="NE" data-text="Niger">Niger</option>
                                                                    <option value="NG" data-text="Nigeria">Nigeria
                                                                    </option>
                                                                    <option value="NU" data-text="Niue">Niue</option>
                                                                    <option value="NF" data-text="Norfolk Island">Norfolk
                                    Island
                                                                    </option>
                                                                    <option value="MP"
                                                                            data-text="Northern Marianas Islands">
                                                                        Northern Marianas Islands
                                                                    </option>
                                                                    <option value="NO" data-text="Norway">Norway
                                                                    </option>
                                                                    <option value="OM" data-text="Oman">Oman</option>
                                                                    <option value="PK" data-text="Pakistan">Pakistan
                                                                    </option>
                                                                    <option value="PW" data-text="Palau">Palau</option>
                                                                    <option value="PS" data-text="Palestine">Palestine
                                                                    </option>
                                                                    <option value="PA" data-text="Panama">Panama
                                                                    </option>
                                                                    <option value="PG" data-text="Papua New Guinea">Papua New
                                    Guinea
                                                                    </option>
                                                                    <option value="PY" data-text="Paraguay">Paraguay
                                                                    </option>
                                                                    <option value="CN"
                                                                            data-text="People's Republic Of China">
                                                                        People's Republic Of China
                                                                    </option>
                                                                    <option value="PE" data-text="Peru">Peru</option>
                                                                    <option value="PH" data-text="Philippines">
                                                                        Philippines
                                                                    </option>
                                                                    <option value="PL" data-text="Poland">Poland
                                                                    </option>
                                                                    <option value="PT" data-text="Portugal">Portugal
                                                                    </option>
                                                                    <option value="PR" data-text="Puerto Rico">
                                                                        Puerto Rico
                                                                    </option>
                                                                    <option value="QA" data-text="Qatar">Qatar</option>
                                                                    <option value="SC"
                                                                            data-text="Republic Of Seychelles">
                                                                        Republic Of Seychelles
                                                                    </option>
                                                                    <option value="SM"
                                                                            data-text="Republic of San Marino">
                                                                        Republic of San Marino
                                                                    </option>
                                                                    <option value="CG"
                                                                            data-text="Republic of the Congo">
                                                                        Republic of the Congo
                                                                    </option>
                                                                    <option value="RE" data-text="Reunion">Reunion
                                                                    </option>
                                                                    <option value="RO" data-text="Romania">Romania
                                                                    </option>
                                                                    <option value="RU" data-text="Russian Federation">Russian
                                    Federation
                                                                    </option>
                                                                    <option value="RW" data-text="Rwanda">Rwanda
                                                                    </option>
                                                                    <option value="KN"
                                                                            data-text="Saint Kitts and Nevis">Saint
                                    Kitts and Nevis
                                                                    </option>
                                                                    <option value="LC" data-text="Saint Lucia">
                                                                        Saint Lucia
                                                                    </option>
                                                                    <option value="WS" data-text="Samoa">Samoa</option>
                                                                    <option value="ST" data-text="Sao Tome ">Sao Tome
                                                                    </option>
                                                                    <option value="SA" data-text="Saudi Arabia">
                                                                        Saudi Arabia
                                                                    </option>
                                                                    <option value="SN" data-text="Senegal">Senegal
                                                                    </option>
                                                                    <option value="RS" data-text="Serbia">Serbia
                                                                    </option>
                                                                    <option value="SL" data-text="Sierra Leone">
                                                                        Sierra Leone
                                                                    </option>
                                                                    <option value="SG" data-text="Singapore">Singapore
                                                                    </option>
                                                                    <option value="SX" data-text="Sint Maarten">
                                                                        Sint Maarten
                                                                    </option>
                                                                    <option value="SK" data-text="Slovakia">Slovakia
                                                                    </option>
                                                                    <option value="SI" data-text="Slovenia">Slovenia
                                                                    </option>
                                                                    <option value="SB" data-text="Solomon Islands">Solomon
                                    Islands
                                                                    </option>
                                                                    <option value="SO" data-text="Somalia">Somalia
                                                                    </option>
                                                                    <option value="ZA" data-text="South Africa">
                                                                        South Africa
                                                                    </option>
                                                                    <option value="KR" data-text="South Korea">
                                                                        South Korea
                                                                    </option>
                                                                    <option value="SS" data-text="South Sudan">
                                                                        South Sudan
                                                                    </option>
                                                                    <option value="ES" data-text="Spain">Spain</option>
                                                                    <option value="LK" data-text="Sri Lanka">Sri Lanka
                                                                    </option>
                                                                    <option value="PM"
                                                                            data-text="St Pierre and Miquelon">St
                                    Pierre and Miquelon
                                                                    </option>
                                                                    <option value="VC"
                                                                            data-text="St Vincent And The Grenadines">St Vincent
                                    And The Grenadines
                                                                    </option>
                                                                    <option value="SD" data-text="Sudan">Sudan</option>
                                                                    <option value="SR" data-text="Suriname">Suriname
                                                                    </option>
                                                                    <option value="SZ" data-text="Swaziland">Swaziland
                                                                    </option>
                                                                    <option value="SE" data-text="Sweden">Sweden
                                                                    </option>
                                                                    <option value="CH" data-text="Switzerland">
                                                                        Switzerland
                                                                    </option>
                                                                    <option value="SY" data-text="Syria">Syria</option>
                                                                    <option value="TW" data-text="Taiwan">Taiwan
                                                                    </option>
                                                                    <option value="TJ" data-text="Tajikistan">Tajikistan
                                                                    </option>
                                                                    <option value="TZ" data-text="Tanzania">Tanzania
                                                                    </option>
                                                                    <option value="TH" data-text="Thailand">Thailand
                                                                    </option>
                                                                    <option value="TL" data-text="Timor Leste">
                                                                        Timor Leste
                                                                    </option>
                                                                    <option value="TG" data-text="Togo">Togo</option>
                                                                    <option value="TK" data-text="Tokelau">Tokelau
                                                                    </option>
                                                                    <option value="TO" data-text="Tonga">Tonga</option>
                                                                    <option value="TT" data-text="Trinidad">Trinidad
                                                                    </option>
                                                                    <option value="TN" data-text="Tunisia">Tunisia
                                                                    </option>
                                                                    <option value="TR" data-text="Turkey">Turkey
                                                                    </option>
                                                                    <option value="TM" data-text="Turkmenistan">
                                                                        Turkmenistan
                                                                    </option>
                                                                    <option value="TC"
                                                                            data-text="Turks and Caios Islands">Turks
                                    and Caios Islands
                                                                    </option>
                                                                    <option value="TV" data-text="Tuvalu">Tuvalu
                                                                    </option>
                                                                    <option value="UG" data-text="Uganda">Uganda
                                                                    </option>
                                                                    <option value="UA" data-text="Ukraine">Ukraine
                                                                    </option>
                                                                    <option value="AE" data-text="United Arab Emirates">United
                                    Arab Emirates
                                                                    </option>
                                                                    <option value="GB" data-text="United Kingdom">United
                                    Kingdom
                                                                    </option>
                                                                    <option value="US"
                                                                            data-text="United States Of America">
                                                                        United States Of America
                                                                    </option>
                                                                    <option value="UM"
                                                                            data-text="Unites States Minor Outlying Islands">
                                                                        Unites States Minor Outlying Islands
                                                                    </option>
                                                                    <option value="UY" data-text="Uruguay">Uruguay
                                                                    </option>
                                                                    <option value="UZ" data-text="Uzbekistan">Uzbekistan
                                                                    </option>
                                                                    <option value="VU" data-text="Vanuatu">Vanuatu
                                                                    </option>
                                                                    <option value="VA"
                                                                            data-text="Vatican City State (Holy See)">Vatican
                                    City State (Holy See)
                                                                    </option>
                                                                    <option value="VE" data-text="Venezuela">Venezuela
                                                                    </option>
                                                                    <option value="VN" data-text="Vietnam">Vietnam
                                                                    </option>
                                                                    <option value="VG" data-text="Virgin Islands (GB)">Virgin
                                    Islands (GB)
                                                                    </option>
                                                                    <option value="VI" data-text="Virgin Islands(U.S.)">Virgin
                                    Islands(U.S.)
                                                                    </option>
                                                                    <option value="WF" data-text="Walls  Islands">Walls
                                    Islands
                                                                    </option>
                                                                    <option value="YE" data-text="Yemen">Yemen</option>
                                                                    <option value="ZM" data-text="Zambia">Zambia
                                                                    </option>
                                                                    <option value="ZW" data-text="Zimbabwe">Zimbabwe
                                                                    </option>
                                                                </select>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <input name="country" id="country" defaultValue type="hidden"/>
                                                <div className="grid-col one-half">
                                                    <div className="grid-inner">
                                                        <label htmlFor="input-postcode">Postcode</label><span
                                                        data-postcode className="input-1">
                              <input className="default" name="zipcode" id="input-postcode" placeholder defaultValue
                                     size={40} maxLength={10} data-rule-address="true"
                                     data-msg-address="Enter numbers only." type="text"/><a href="#clear"
                                                                                            className="ico-cancel-thin add-clear-text"
                                                                                            tabIndex={-1}/></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group grid-row">
                                                <div className="grid-col one-half">
                                                    <div className="grid-inner">
                                                        <label htmlFor="citytown">City / Town*</label><span
                                                        data-city-town className="input-1"> <input aria-required="true"
                                                                                                   className="default"
                                                                                                   name="city"
                                                                                                   id="citytown"
                                                                                                   placeholder
                                                                                                   defaultValue
                                                                                                   size={40}
                                                                                                   maxLength={30}
                                                                                                   data-rule-required="true"
                                                                                                   data-msg-required="Enter letters of the English alphabet, and if required, any of these symbols - #_-',/"
                                                                                                   data-rule-citystate="true"
                                                                                                   data-msg-citystate="Enter letters of the English alphabet, and if required, any of these symbols - #_-',/"
                                                                                                   type="text"/><a
                                                        href="#clear" className="ico-cancel-thin add-clear-text"
                                                        tabIndex={-1}/></span>
                                                    </div>
                                                </div>
                                                <div className="grid-col one-half ">
                                                    <div className="grid-inner stateDropDown hidden">
                                                        <label>State / Province*</label>
                                                        <div data-customselect="true" id="refresh-state"
                                                             className="custom-select custom-select--2 default"
                                                             data-state-province>
                                                            <label htmlFor="state-provine" className="select__label">&nbsp;</label>
                                                            <span className="select__text">Select</span>
                                                            <span className="ico-dropdown">Select</span>
                                                            <select aria-required="true" style={{visibility: 'hidden'}}
                                                                    id="state-provine" name="usState"
                                                                    data-rule-required="true"
                                                                    data-field-billingaddress="true"
                                                                    data-msg-required="Select a state/province.">
                                                                <option value>Select</option>
                                                                <option value="AA" id="AA">AA Armed Forces Americas
                                                                </option>
                                                                <option value="AE" id="AE">AE Armed Forces Europe
                                                                </option>
                                                                <option value="AFP" id="AFP">AP Armed Forces Pacific
                                                                </option>
                                                                <option value="AL" id="AL">Alabama</option>
                                                                <option value="AK" id="AK">Alaska</option>
                                                                <option value="AZ" id="AZ">Arizona</option>
                                                                <option value="AR" id="AR">Arkansas</option>
                                                                <option value="CA" id="CA">California</option>
                                                                <option value="CO" id="CO">Colorado</option>
                                                                <option value="CT" id="CT">Connecticut</option>
                                                                <option value="DC" id="DC">DC</option>
                                                                <option value="DE" id="DE">Delaware</option>
                                                                <option value="FL" id="FL">Florida</option>
                                                                <option value="GA" id="GA">Georgia</option>
                                                                <option value="HI" id="HI">Hawaii</option>
                                                                <option value="ID" id="ID">Idaho</option>
                                                                <option value="IL" id="IL">Illinois</option>
                                                                <option value="IN" id="IN">Indiana</option>
                                                                <option value="IA" id="IA">Iowa</option>
                                                                <option value="KS" id="KS">Kansas</option>
                                                                <option value="KY" id="KY">Kentucky</option>
                                                                <option value="LA" id="LA">Louisiana</option>
                                                                <option value="ME" id="ME">Maine</option>
                                                                <option value="MD" id="MD">Maryland</option>
                                                                <option value="MA" id="MA">Massachussetts</option>
                                                                <option value="MI" id="MI">Michigan</option>
                                                                <option value="MN" id="MN">Minnesota</option>
                                                                <option value="MS" id="MS">Mississippi</option>
                                                                <option value="MO" id="MO">Missouri</option>
                                                                <option value="MT" id="MT">Montana</option>
                                                                <option value="NE" id="NE">Nebraska</option>
                                                                <option value="NV" id="NV">Nevada</option>
                                                                <option value="NH" id="NH">New Hampshire</option>
                                                                <option value="NJ" id="NJ">New Jersey</option>
                                                                <option value="NM" id="NM">New Mexico</option>
                                                                <option value="NY" id="NY">New York</option>
                                                                <option value="NC" id="NC">North Carolina</option>
                                                                <option value="ND" id="ND">North Dakota</option>
                                                                <option value="OH" id="OH">Ohio</option>
                                                                <option value="OK" id="OK">Oklahoma</option>
                                                                <option value="OR" id="OR">Oregon</option>
                                                                <option value="PA" id="PA">Pennsylvania</option>
                                                                <option value="RI" id="RI">Rhode Island</option>
                                                                <option value="SC" id="SC">South Carolina</option>
                                                                <option value="SD" id="SD">South Dakota</option>
                                                                <option value="TN" id="TN">Tennessee</option>
                                                                <option value="TX" id="TX">Texas</option>
                                                                <option value="UT" id="UT">Utah</option>
                                                                <option value="VT" id="VT">Vermont</option>
                                                                <option value="VA" id="VA">Virginia</option>
                                                                <option value="WA" id="WA">Washington</option>
                                                                <option value="WV" id="WV">West Virginia</option>
                                                                <option value="WI" id="WI">Wisconsin</option>
                                                                <option value="WY" id="WY">Wyoming</option>
                                                            </select><input defaultValue
                                                                            style={{width: '100%', height: '100%', opacity: 0, position: 'absolute', top: 0, left: '-10%', bottom: 0, right: 0}}
                                                                            readOnly="readonly" type="text"/>
                                                        </div>
                                                        <input id="selectedUsState" defaultValue type="hidden"/>
                                                    </div>
                                                    <div className="grid-inner stateText">
                                                        <label htmlFor="stateText">State / Province</label> <span
                                                        className="input-1" data-statetext>
                              <input className="default" name="state" id="stateText" placeholder size={40}
                                     maxLength={30} defaultValue data-rule-citystate="true"
                                     data-msg-citystate="Select a state/province." type="text"/><a href="#clear"
                                                                                                   className="ico-cancel-thin add-clear-text"
                                                                                                   tabIndex={-1}/></span>
                                                    </div>
                                                    <input id="selectedState" defaultValue type="hidden"/>
                                                </div>
                                            </div>
                                        </fieldset>
                                </div>
                            </div>
                        </div>
                        <div className="terms-conditions">
                            <h4 className="sub-heading-2--dark">Read and accept terms and conditions </h4>
                            <ul className="cta-group">
                                <li><a href="https://www.singaporeair.com/fareConditions.form?tripType=O&fromBS=true"
                                       className="link-4 launchLightBox fareConditions" id="summary-fare-conditions"><em
                                    className="ico-point-r">&nbsp;</em>Full fare rules and conditions</a>
                                </li>
                                <li><a href="https://www.singaporeair.com/en_UK/global_footer/conditions-carriage/"
                                       className="link-4" target="_top"><em className="ico-point-r">&nbsp;</em>General conditions of
                      carriage</a>
                                </li>
                                <li><a href="https://www.singaporeair.com/en_UK/global_footer/conditions-of-notice/"
                                       className="link-4" target="_top"><em className="ico-point-r">&nbsp;</em>Conditions of
                      contract and notices</a>
                                </li>
                                <li><a
                                    href="https://www.singaporeair.com/en_UK/global_footer/conditions-online-booking/"
                                    className="link-4" target="_top"><em className="ico-point-r">&nbsp;</em>Conditions of use</a>
                                </li>
                                <li><a href="https://www.singaporeair.com/en_UK/global_footer/privacy-policy/"
                                       className="link-4" target="_top"><em className="ico-point-r">&nbsp;</em>Privacy Policy</a>
                                </li>
                                <li><a href="#" className="link-4" id="restrictionCarriage"><em className="ico-point-r">&nbsp;</em>Restrictions
                      on carrying dangerous items</a>
                                </li>
                            </ul>
                            <div className="custom-checkbox custom-checkbox--1" data-confirm-tc="true">
                                <input name="acceptTnC" id="accept-cb" type="checkbox"/>
                                <label htmlFor="accept-cb">I understand and accept all the terms and conditions described
                    above.</label>
                            </div>
                        </div>
                        <div className="button-group-1">
                            <input name="_eventId" defaultValue="validatePaymentDetails" type="hidden"/>
                            <input id="make-payment" defaultValue="Make payment"
                                   className="btn-1 launchLightBoxWithText" type="button" onClick={onPaymentSubmit.bind(this)}/>
                        </div>
                        <input id="sessionTimerSeconds" className="autoRenew" defaultValue="540|postPnr|0|false"
                               type="hidden"/>
                        <input
                            defaultValue="0400nyhffR+vPCUNf94lis1ztlYPSRNJ9+Z7+z5pRK0ssomcVeSrl1IcM1K4kBgTGPuI1pl2KXafGT4PuAViCNfNZHYpPgQiEVyi6EP5YEYwjHSodXyUKxUgVtZ++LaXDquIRV8flS7U9roxXNv9ELmceiEunI8jxfwrm2m7iwQyd/xVah0xS2NUk2rjy4XiassOex1TLARybUr4X35U0eVzPZXAAYR3cfgv/1L9+R2VMjHxP/CQr42uyxzmWIC3GmtyYhGrWtLxXZsld8E1pw3t/kKmBDRk7AvCCu2Vndk9hzo3HgZyXjZ5woKPBxZIicgYpRTVQlk3lGfWXRv2TB6X9sBVZc6EmGngMgmyiLJvzoNCHbxLfjGyRDvMc8mWcnHrOHHd19I8xT71TaXMCw4w67/Xjr7Mr0wVVRiuuhFxLmg9GC17jlnhcysWvqTKCrrf71Emyfi7c90d/tZS2Kh2RNAh8gEGxN23YtROsmR3xCBW638yRZPgiilCz8QbOZkvqHZ7cucH07g+d610BtdBRtqxK3FNv7r8uQFH9RMRtje1TTOhPjFOoE/h6EFXXmXEnbzscmBoGl9HDo0vYYDC390OT+2jjRx5bazR87feXj5RMy2x4o0twh6KpL5MElz4yJkmDK0I0r0PnweHcgz/bqwTcVYsAe/kR8sf8lla7ZWsjcxpJiuDO8rzblpWlkz8JP+uJSqKjN8A6K3HjRQPNr+yUn2sHCCI3cwOWQk/wlayPr0t8ztVFisjUV4dJsOy9trc5e+WyhGSBBWhu07LmRdt5U4CpewIj2qku3ZkvznzM62ltvnPi/2gutXD3D+VjXOee1yaDxciKug0+fq4xP2vFnup4QVZDrXnGJEJCcC1Y3WN087Wg29aEt10jnhmJ1XvBJOoly1BnwDIvl6daVRexTlo+EfnQqqocGF2FMb89xAGYe/8PSw+Jld00Kp8i0YCT3YbrYlMcDaVptovbdciPTQaFQzm/BBzQIGMMrRavVeoTcfA+tkyPDIvrKq0wzM0asI2UBRzOwn/lrb3VpakkvF4RWTRbL4FCUQc93tGe7tysqKhWQtb2jPRdPM16VC9wanyZCUoHAJpEFCF837y9EPMulwHy7TO6/U6XXTtsixQfXq06eCmeDwJXyPnhM/a7zCGW+Zb62pxKbGrISmCmfvd0ggZicl6HR1GqLUVw6/jq/Osp9TQeesBSsvEjIasaVJ6wf46JACF+SfXRZ4rRY8Ta/phORIlQBnPLpJFa0wGd1fEhtl/I1dwbgbTu1vVgVLmWiS17oxw2Xmq8bAVO5Zf2TTjahdyamRgJ2GbRLEY9doelgJMfjS/XlXsirU4aDA1QFBjLRdj7wZx7u/ivVEu+n4vJCX9dZs5mfxBBGmKfN2wTgdWRIS5qCGbyy5pGKL86q0HVkSEuaghm8Lco/TxCee6B1ZEhLmoIZtnXziSI4tc5wdWRIS5qCGbGeGPWmZRM/gHVkSEuaghmx3/LmkdJd58zhm+XsWxaajR5LEE+fAVQHzQKEvkeKE6M5/rlQX6UZG4hL3YwDYAfBS8oHjquwZSnv5WEVXz/OF9xD6KYGuP2R7r3EQLWXFZ+MTw3KUeezS2sxSEtWSs+UmIujRbbhRbgcpn4SItJNK1rwcGJaBDWvB5poj31wU5SHoLPR1uVQ5o1c3gAPT9q5VPfVKB9sZJYYUaLIgB+1bTt4eH9UeN8pi35BsfK5qxjZT8PVWZKhjHZOjTVYDmtssAbRwK8Ceh"
                            name="ioBlackBox" id="ioBlackBox" type="hidden"/>
                        <input id="totalMilesUsedParent" name="paymentDetailsForm.totalMilesUsed" type="hidden"/>
                        <input id="ticketFarePaidViaMilesParent" name="paymentDetailsForm.ticketFarePaidViaMiles"
                               type="hidden"/>
                    </form>
                    <input id="sliderMiles" defaultValue type="hidden"/>
                </div>
            </div>
        </div>

    );
}