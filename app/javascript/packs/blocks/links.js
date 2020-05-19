import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

const ColoredLink = styled.a`
color: ${p => p.here ? "#f7e8bf" : "#950cd6"};
background-color: ${p => p.here ? "#950cd6" : "#f7e8bf" };
`

const YouAreHereLink = ({ link, here }) => (
    <>
    <ColoredLink
     here={link === here && "- you are here."}
     href={link}
     >{link}</ColoredLink>
    </>
)

const Links = observer(({ here }) => (
    <div>
        <h3>Links</h3>

        <YouAreHereLink here={here} link="/" /><br/>
        <YouAreHereLink here={here} link="/mail-money-pool" /><br/>
        <YouAreHereLink here={here} link="/librarian-salary-pool" /><br/>
    </div>
))

export default Links