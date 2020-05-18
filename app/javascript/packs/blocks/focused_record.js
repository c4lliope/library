import React, { useState } from "react"
import { observer } from "mobx-react"
import { getSnapshot } from "mobx-state-tree"
import styled from "styled-components"

import Modal from "./modal"
import Field from "./field"

import { mdiRefresh } from "@mdi/js"
import Icon from "@mdi/react"

const Links = styled.div`
display: flex;
flex-direction: column;
`

const Label = styled.span`
color: grey;
`

const FocusedRecord = observer(() => (
    model.focused_record &&
    <Modal
          isOpen
          onBackgroundClick={() => model.focus_record(null)}
        >
            {model.me && model.focused_record.member.id === model.me.id
            ? <div>
                <a
                href='#'
                onClick={() => model.drop_record(model.focused_record.id)}
                >drop record.</a> ~small bug: a page delay, click <Icon path={mdiRefresh} size/>
              </div>
            : null
            }

            <Label>Name:</Label>
            <Field model={model.focused_record} claim="name" />

            <Label>By:</Label>
            <Field model={model.focused_record} claim="byline" />

            <Label>Summary:</Label>
            <Field model={model.focused_record} claim="summary" as="textarea" />

            <Links>
                <a href="#" onClick={() => model.place_hold(model.focused_record)} >place hold</a>
                <a href="#" onClick={() => model.flag(model.focused_record)} >flag (pending)</a>
            </Links>
        </Modal>
))

export default FocusedRecord