import React, { useState } from "react"
import { observer } from "mobx-react"
import { getSnapshot } from "mobx-state-tree"
import styled from "styled-components"

const BasicField = styled.input`
padding: 0.5rem;
${p => p.as === "textarea"
? "width: 30rem; height: 6rem;"
: null
}
`

const Spacing = styled.div`
padding: 0.5rem;
`

const Field = observer(({ as, model, attribute }) => {
    const [editing, changeEditing] = useState(false)
    const [originalValue, changeOriginalValue] = useState({})

    return (
        editing
        ?
            <Spacing>
                <BasicField
                as={as || "input"}
                placeholder={attribute}
                value={model[attribute]}
                onChange={e => model.set(attribute, e.target.value)}
                />
                <a href="#" onClick={() => {model.change(attribute, model[attribute]); changeEditing(false) }}>save</a>
                &nbsp;or&nbsp;
                <a href="#" onClick={() => {model.set(attribute, originalValue); changeEditing(false) }}>cancel</a>
            </Spacing>
        :
            <Spacing onClick={() => { changeOriginalValue(getSnapshot(model)[attribute]); changeEditing(true) }}>
                {model[attribute] || `click to set ${attribute}`}
            </Spacing>
    )
})

export default Field