
import React from "react"
import { observer } from "mobx-react"

import Border from "./border"
import ProcessRecord from "./process_record"
import Modal from "./modal"

const AddRecord = observer(() => (
    model.addingRecord
    ?  <Modal isOpen onBackgroundClick={() => model.set("addingRecord", false)}>
            <span onClick={() => model.set("addingRecord", false)} >Cancel</span>
            <ProcessRecord
            buttonText="Add record"
            onProcessRecord={({ name, byline, summary, image }) => {
                model.set("addingRecord", false)
                model.add_record(name, byline, summary, image)
            }}
            />
        </Modal>
    :  model.me &&
        <a href="#" onClick={() => model.set("addingRecord", true)} >Add a record</a>
))

export default AddRecord