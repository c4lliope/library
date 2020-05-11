import React, { useState } from "react"
import { observer } from "mobx-react"
import { getSnapshot } from "mobx-state-tree"
import styled from "styled-components"

const Field = styled.input`
padding: 0.5rem;
`

const UnchangingField = styled.div`
padding: 0.5rem;
`

const ChangeableField = observer(({ as, model, attribute }) => {
    const [editing, changeEditing] = useState(false)
    const [originalValue, changeOriginalValue] = useState({})

    return (
        editing
        ?
            <div>
                <Field
                as={as || "input"}
                placeholder={attribute}
                value={model[attribute]}
                onChange={e => model.set(attribute, e.target.value)}
                />
                <a href="#" onClick={() => {model.change(attribute, model[attribute]); changeEditing(false) }}>save</a>
                &nbsp;or&nbsp;
                <a href="#" onClick={() => {model.set(attribute, originalValue); changeEditing(false) }}>cancel</a>
            </div>
        :
            <UnchangingField onClick={() => { changeOriginalValue(getSnapshot(model)[attribute]); changeEditing(true) }}>
                {model[attribute]}
            </UnchangingField>
    )
})

export default ChangeableField