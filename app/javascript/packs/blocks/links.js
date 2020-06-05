import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

const ImpressionableLink = styled.a`
color: ${p => p.impressed ? "#f7e8bf" : "#950cd6"};
background-color: ${p => p.impressed ? "#950cd6" : "#f7e8bf" };
`

const YouAreHereLink = ({ link, here }) => (
    <>
    <ImpressionableLink
        impressed={link === here}
        href={link}
        >{link}
     </ImpressionableLink>
    </>
)

const Links = observer(({ here }) => (
    <div>
        born in Los Angeles,<br/>
        raised in Michigan,<br/>
        publishing on <ImpressionableLink href="https://medium.com/our-shared-library">medium</ImpressionableLink>,<br/>
        and made by <ImpressionableLink href="https://assembled.app">assembled appeal</ImpressionableLink>.

        <h3>Pages</h3>

        <YouAreHereLink here={here} link="/" /><br/>
        Become a donor -<br/>
        - <YouAreHereLink here={here} link="/mail-money-pool" /><br/>
        - <YouAreHereLink here={here} link="/librarian-salary-pool" /><br/>
    </div>
))

export default Links