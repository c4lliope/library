import React, { useRef } from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import { mdiArrowRight } from "@mdi/js"
import Icon from "@mdi/react"

var Spacing = styled.div`
margin: 1rem;
`

const SessionField = styled.input`
background: none;
border: none;
border-bottom: 2px solid black;

`

const Session = observer(() => {
    const input = useRef(null)

    if(!model.me) {
        return (
            model.session_pending
            ?  <div>Please check your email, or <a href="#" onClick={() => model.claim("session_pending", false)}>sign in again</a>.</div>
            :
                <Spacing>
                    <SessionField ref={input} type="email" placeholder="email" />
                    <a href="#" onClick={(e) => model.sign_in({ email: input.current.value })} >
                        Begin session.
                    </a>
                </Spacing>
        )
    }
    return (
        <div>
            Signed in as {model.me.name || model.me.email}.
            &nbsp;<a href="#" onClick={() => { model.claim("me", null); localStorage.removeItem("code") }}>end session.</a>
        </div>
    )
})

export default Session