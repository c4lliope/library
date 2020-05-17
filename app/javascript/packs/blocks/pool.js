import React from "react"
import { observer } from "mobx-react"

import Border from "./border"

const Pool = observer(({ pool }) => (
    <Border>
        <h3>Pool: ${model.pool_sum}</h3>
        <p>Become a donor.</p>
        <p>
        Please use <a href="https://cash.me/$c4lliope">Square Cash</a>.<br/>
        Handle: $c4lliope<br/>
        Message: "{pool}"<br/>
        </p>
    </Border>
))

export default Pool