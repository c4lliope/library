import React, { useState } from "react"
import { observer } from "mobx-react"
import { getSnapshot } from "mobx-state-tree"
import styled from "styled-components"

const BaseField = styled.input`
padding: 0.5rem;
${p => p.as === "textarea"
? "width: 30rem; height: 6rem;"
: null
}
`

const Spacing = styled.div`
padding: 0.5rem;
white-space: pre-wrap;
`

const Field = observer(({ as, model, claim }) => {
    const [editing, changeEditing] = useState(false)
    const [originalValue, changeOriginalValue] = useState({})

    return (
        editing
        ?
            <Spacing>
                <BaseField
                ref={e => e && e.focus()}
                as={as || "input"}
                placeholder={claim}
                value={model[claim]}
                onChange={e => model.set(claim, e.target.value)}
                />
                <a href="#" onClick={() => {model.change(claim, model[claim]); changeEditing(false) }}>remember change</a>
                &nbsp;or&nbsp;
                <a href="#" onClick={() => {model.set(claim, originalValue); changeEditing(false) }}>cancel</a>
            </Spacing>
        :
            <Spacing onClick={() => { changeOriginalValue(getSnapshot(model)[claim]); changeEditing(true) }}>
                {model[claim] || `click: ${claim}`}
            </Spacing>
    )
})

export { BaseField }
export default Field