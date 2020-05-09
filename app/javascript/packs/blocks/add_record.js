
import React from "react"
import { observer } from "mobx-react"

import Border from "./border"
import ProcessRecord from "./process_record"

const AddRecord = observer(() => (
    model.addingRecord
    ?  <Border>
            <span onClick={() => model.set("addingRecord", false)} >Cancel</span>
            <ProcessRecord
            buttonText="Add record"
            onProcessRecord={({ name, byline, summary, image }) => {
                model.set("addingRecord", false)
                model.add_record(name, byline, summary, image)
            }}
            />
        </Border>
    :  model.me &&
        <a href="#" onClick={() => model.set("addingRecord", true)} >Add a record</a>
))

export default AddRecord