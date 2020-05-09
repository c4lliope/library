import React from "react"
import { observer } from "mobx-react"

import Modal from "./modal"
import ProcessMember from "./process_member"

const AddName = observer(() => (
    model.addingName
    ?
        <Modal isOpen>
            Add your name and address, or &nbsp;
            <a href="#" onClick={() => model.set("addingName", false)}>cancel.</a>

            <p>
                By adding your name and address, you agree:<br/>
                your name and address may be shared among your peers.
            </p>

            <ProcessMember
                originalName={model.me.name}
                originalSurname={model.me.surname}
                originalAddress={model.me.address}
                buttonText="Record name and address"
                onProcess={({ name, surname, address }) => {
                    model.change_me({ name, surname, address })
                    model.set("addingName", false)
                }}
                />
        </Modal>
        : model.me ?
        (model.me.name === null || model.me.surname === null || model.me.address === null)
        ? <div>
            Nearly done -
            <a href="#" onClick={() => model.set("addingName", true)}>Add your name and address.</a>
            </div>
        : <a href="#" onClick={() => model.set("addingName", true)}>change name or address.</a>
      : null
))

export default AddName