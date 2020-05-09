import React, { useRef } from "react"
import { observer } from "mobx-react"

const Session = observer(() => {
    const input = useRef(null)

    if(!model.me) {
        return (
            model.session_pending
            ?  <div>Please check your email, or <a href="#" onClick={() => model.set("session_pending", false)}>sign in again</a>.</div>
            :
                <form onSubmit={(e) => {
                    e.preventDefault()
                    model.sign_in({ email: input.current.value })
                    console.log(`${model.me ? model.me.email : "no one"} signed in.`)
                }}>
                    <input ref={input} type="email" placeholder="your email" />
                    <input type="submit" value="Begin session" />
                </form>
        )
    }
    return (
        <div>
            Signed in as {model.me.name || model.me.email}.
        </div>
    )
})

export default Session