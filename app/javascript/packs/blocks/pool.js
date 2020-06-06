import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import Border from "./border"
import { BaseField } from "./field"

const Pool = observer(({ pool }) => (
    <Border>
        <h3>Pool: ${model.pool_sum}</h3>
        <p>Become a donor.</p>
        <p>
        Please use <a href="https://cash.me/$c4lliope">Square Cash</a>.<br/>
        Handle: $c4lliope<br/>
        Message: "{pool}"<br/>
        </p>

        {(model.card_name && model.card_nonce)
        ?
            <div>
                Using {model.card_name}<br/>
                <BaseField
                model={model}
                claim="donor_price"
                ref={e => e && e.focus()}
                as={"input"}
                placeholder={"donor_price"}
                value={model["donor_price"] || ""}
                onChange={e => model.claim("donor_price", e.target.value)}
                />
                <a href="#" onClick={() => model.pay_donor_price(pool)} >Send money.</a>
            </div>
        :
            <Form id="form-container">
                <div id="sq-card-number"></div>
                <div id="sq-expiration-date"></div>
                <div id="sq-cvv"></div>
                <div id="sq-postal-code"></div>
                <button id="sq-creditcard" onClick={(e) => paymentForm.requestCardNonce()}>Remember card</button>
            </Form>
        }
    </Border>
))

const Form = styled.div`
width: 20rem;
`

const paymentForm = new SqPaymentForm({
    // Initialize the payment form elements
    
    //TODO: Replace with your sandbox application ID
    applicationId: "sandbox-sq0idb-hIae3fOav9m07a_ANnf9zg",
    inputClass: 'sq-input',
    autoBuild: false,
    // Customize the CSS for SqPaymentForm iframe elements
    inputStyles: [{
        fontSize: '16px',
        lineHeight: '24px',
        padding: '16px',
        placeholderColor: '#a0a0a0',
        backgroundColor: 'transparent',
    }],
    // Initialize the credit card placeholders
    cardNumber: {
        elementId: 'sq-card-number',
        placeholder: 'Bank Card Number'
    },
    cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
    },
    expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
    },
    postalCode: {
        elementId: 'sq-postal-code',
        placeholder: 'ZIP'
    },
    // SqPaymentForm callback functions
    callbacks: {
        /*
        * callback function: cardNonceResponseReceived
        * Triggered when: SqPaymentForm completes a card nonce request
        */
        cardNonceResponseReceived: function (errors, nonce, cardData) {
            if (errors) {
                // Log errors from nonce generation to the browser developer console.
                console.error('Encountered errors:');
                errors.forEach(function (error) {
                    console.error('  ' + error.message);
                });
                alert('Encountered errors, check browser developer console for more details');
                return;
            }

            model.record_bank_card({
                nonce,
                name: `card ending in ${cardData.last_4}, expiring ${cardData.exp_month}/${cardData.exp_year}`,
            })
        }
    }
  });

paymentForm.build()

export default Pool