import React, { useState } from "react"
import { observer } from "mobx-react"
import { getSnapshot } from "mobx-state-tree"
import styled from "styled-components"

import Modal from "./modal"
import ChangeableField from "./changeable_field"

const Links = styled.div`
display: flex;
flex-direction: column;
`

const FocusedRecord = observer(() => (
    model.focused_record &&
    <Modal
          isOpen
          onBackgroundClick={() => model.focus_record(null)}
        >
            <a href='#' onClick={() => model.focus_record(null)}>close record.</a><br/>

            {model.me && model.focused_record.member.id === model.me.id
             ? <a
                href='#'
                onClick={() => { var id = model.focused_record.id; model.focus_record(null); model.drop_record(id)}}
                >drop record.</a>
            : null
            }

            <ChangeableField
            model={model.focused_record}
            attribute="name"
            />

            <ChangeableField
            model={model.focused_record}
            attribute="byline"
            />

            <ChangeableField
            model={model.focused_record}
            attribute="summary"
            as="textarea"
            />

            <Links>
                <a href="#" onClick={() => model.place_hold(model.focused_record)} >place hold</a>
                <a href="#" onClick={() => model.flag(model.focused_record)} >flag</a>
            </Links>
        </Modal>
))

export default FocusedRecord