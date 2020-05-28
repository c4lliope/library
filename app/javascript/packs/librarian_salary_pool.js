// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import React, { useRef } from 'react'
import { render } from 'react-dom'
import { observer } from "mobx-react"
import 'mobx-react-lite/batchingForReactDom'
import styled from "styled-components"
import { ModalProvider } from 'styled-react-modal'

import Border from "./blocks/border"
import Header, { Spacing as BaseSpacing } from "./blocks/header"
import Links from "./blocks/links"
import Pool from "./blocks/pool"

import { Pool as Model } from "./models"

window.model = Model.create({})
model.acquire_charges("librarian")

const Spacing = styled(BaseSpacing)`
display: grid;
grid-template-columns: auto 1fr auto;
grid-column-gap: 1rem;

@media(max-width: 1000px) {
    grid-template-columns: 1fr;    
}
`

const Page = styled.div`
background-color: #f7e8bf;

font-family: 'DM Mono', monospace;

input {
    font-size: 1.6em;
    clear: both;
    margin-bottom: 0.2em;
}

font-size: 36px;
@media(min-width: 1000px) {
    font-size: 16px;
}
`

const Bar = styled.div`
  padding: 1rem 0;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 1rem;
`

const AlignEnd = styled.div`
text-align: end;
`

const Appeal = styled.div`
`

const Large = styled.h3`
`

render(
    <ModalProvider>
        <Page>
            <Header/>

            <Spacing space="2rem" overhang="4em" >
            <Links here="/librarian-salary-pool" />

            <Appeal>
                <Large>
                Librarian Salary Pool
                </Large>
                <p>
                Our Shared Library is nearly up and running;<br/>
                a scrappy online program<br/>
                encouraging lending and leasing among peers.<br/>
                </p>
                <p>
                Our business model depends on librarians<br/>
                building programs and managing our book index,<br/>
                and librarian salaries are paid by donors.<br/>
                </p>
                <p>
                Help more people read good books by becoming a donor.<br/>
                </p>
                <p>
                Proceeds help keep our library running.<br/>
                </p>
                <p>
                Much obliged,<br/>
                Grace Youngblood<br/>
                Programmer<br/>
                </p>
            </Appeal>

            <Pool pool="librarian" />
            </Spacing>
        </Page>
    </ModalProvider>,
    document.querySelector('#base')
);

const paymentForm = new SqPaymentForm({
    // Initialize the payment form elements
    
    //TODO: Replace with your sandbox application ID
    applicationId: "",
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
            model.add_bank_card({ nonce })
        }
    }
  });

model.paymentForm.build()