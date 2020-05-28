import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import Modal from "./modal"
import Field from "./field"

const Hold = styled.div`
display: grid;
grid-template-columns: 1fr auto 1fr;
grid-column-gap: 1rem;
`

const Holds = observer(() => (
    <div>
        {model.me && <a href="#" onClick={() => model.claim("displaying_holds", true)} >Holds.</a>}

        {model.displaying_holds
        ?
            <Modal onBackgroundClick={() => model.claim("displaying_holds", false)}>
                <h2>Your holds:</h2>
                {model.holds.length === 0 && "none."}
                {model.holds.map(hold => (
                    <Hold key={hold.id}>
                        <div>
                        beginning {hold.beginsOn.toISODate()}<br/>
                        ending {hold.expiresOn.toISODate()}.
                        </div>

                        {hold.recordId.name} by {hold.recordId.byline},

                        <div>Price</div>
                        {/* <Field model={hold.shippingCharge} claim="price" /> */}
                    </Hold>
                ))}
            </Modal>
        : null
        }
    </div>
))

export default Holds