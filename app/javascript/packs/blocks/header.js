import React from "react"
import styled from "styled-components"

const Background = styled.div`
background-color: #950cd6;
text-align: right;
color: #fbeed1;
padding: 0.5rem;
position: fixed;
top: 0;
left: 0;
right: 0;
box-shadow: 0px 6px 6px 0px #b16893;
font-family: 'Carter One', sans-serif;
`

const Heading = styled.div`
font-size: 1.6em;
`

const Spacing = styled.div`
padding: ${p => p.space || "1rem"};
${p => p.overhang
? `padding-top: ${p.overhang};`
: null
}
`

const Header = () => (
    <Background>
        <Heading>...our shared library。</Heading>
    </Background>
)

export { Spacing }
export default Header;