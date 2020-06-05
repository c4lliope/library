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
        <div id="form-container">
            <div id="sq-card-number"></div>
            <div id="sq-expiration-date"></div>
            <div id="sq-cvv"></div>
            <div id="sq-postal-code"></div>
            <button id="sq-creditcard" onClick={(e) => model.paymentForm.requestCardNonce()}>Pay $1.00</button>
        </div>
    </Border>
))

export default Pool