import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

const Search = observer(() => (
    <div>
        <input type="text" placeholder="search" value={model.search} onChange={(e) => model.set("search", e.target.value)} />
        <button onClick={() => model.run_search()}>Run search</button>
    </div>
))

export default Search