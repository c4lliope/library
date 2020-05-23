import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { mdiMagnify } from "@mdi/js"
import Icon from "@mdi/react"

const SearchField = styled.input`
background: none;
border: none;
border-bottom: 2px solid black;

&:focus {
    outline: none;
}
`

const Search = observer(() => (
    <div>
        <SearchField
            type="text"
            placeholder="search"
            value={model.search}
            onChange={(e) => model.claim("search", e.target.value)}
            onKeyDown={(e) => { if(e.keyCode === 13) model.run_search(); else return true }}
        />

        <Icon path={mdiMagnify} size={1} onClick={() => model.run_search()} />
    </div>
))

export default Search