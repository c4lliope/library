
import React from "react"
import { observer } from "mobx-react"

const AddRecord = observer(() => (
    model.me &&
        <a href="#" onClick={() => model.focus_record(model.add_record())} >Add a record</a>
))

export default AddRecord