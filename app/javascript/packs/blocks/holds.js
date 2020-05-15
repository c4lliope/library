import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import Modal from "./modal"

const Holds = observer(() => (
    <div>
        {model.me && <a href="#" onClick={() => model.set("displaying_holds", true)} >Holds.</a>}

        {model.displaying_holds
        ?
            <Modal onBackgroundClick={() => model.set("displaying_holds", false)}>
                {model.holds.map(hold => (
                    <div key={hold.id}>
                        {hold.recordId.name} by {hold.recordId.byline},
                        from {hold.beginsOn.toISODate()} to {hold.expiresOn.toISODate()}.
                    </div>
                ))}
            </Modal>
        : null
        }
    </div>
))

export default Holds