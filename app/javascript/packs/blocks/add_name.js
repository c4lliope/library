import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import Modal from "./modal"
import Field from "./field"

const Label = styled.span`
color: grey;
`

const AddName = observer(() => (
    model.addingName
    ?
        <Modal onBackgroundClick={() => model.set("addingName", false)}>
            <p>
                By adding your name and addresses, you agree:<br/>
                your name and addresses may be shared among your peers.
            </p>

            
            <Label>Name:</Label>
            <Field model={model.me} claim="name" />

            <Label>Surname:</Label>
            <Field model={model.me} claim="surname" />

            <Label>Address:</Label>
            <Field model={model.me} claim="address" as="textarea" />

            <Label>Cash Handle:</Label>
            <Field model={model.me} claim="cashHandle" />
            
        </Modal>
        : model.me ?
        (model.me.name === null || model.me.surname === null || model.me.address === null)
        ? <div>
            Nearly done -
            <a href="#" onClick={() => model.set("addingName", true)}>Add your name and address.</a>
          </div>
        : <div><a href="#" onClick={() => model.set("addingName", true)}>change name or address.</a></div>
      : null
))

export default AddName