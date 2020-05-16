// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import React, { useRef } from 'react'
import { render } from 'react-dom'
import { observer } from "mobx-react"
import 'mobx-react-lite/batchingForReactDom'
import styled from "styled-components"
import { ModalProvider } from 'styled-react-modal'

import Border from "./blocks/border"

import Model from "./models"
import { acquire_records, acquire_session } from "./graph"

var model = window.model = Model.create({})

model.acquire_records()
model.acquire_session()
// model.delay("goodreads_search", "political order and political decay", 1000, () => model.run_goodreads_search())

const Header = styled.div`
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

const Spacing = styled.div`
padding: ${p => p.space || "1rem"};
${p => p.overhang
? `padding-top: ${p.overhang};`
: null
}

display: grid;
grid-template-columns: auto 1fr;
grid-column-gap: 1rem;

@media(max-width: 1000px) {
    grid-template-columns: 1fr;    
}
`

const Heading = styled.div`
font-size: 1.6em;

@media(min-width: 1000px) {
}
`

const Page = styled.div`
background-color: #f7e8bf;

font-family: 'DM Mono', monospace;

input {
    font-size: 1.6em;
    clear: both;
    margin-bottom: 0.2em;
}

font-size: 36px;
@media(min-width: 1000px) {
    font-size: 16px;
}
`

const Bar = styled.div`
  padding: 1rem 0;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 1rem;
`

const AlignEnd = styled.div`
text-align: end;
`

const Appeal = styled.div`
`

const Large = styled.h3`
`

render(
    <ModalProvider>
        <Page>
            <Header>
                <Heading>...our shared library。</Heading>
            </Header>

            <Spacing space="2rem" overhang="4em" >
            <Appeal>
                <Large>
                Mail Money Pool
                </Large>
                <p>
                Our Shared Library is nearly open for business;<br/>
                a scrappy online home for lending and leasing books among peers.<br/>
                </p>
                <p>
                Our business model depends on people mailing books,<br/>
                and so far our members are spending hard-earned money.<br/>
                </p>
                <p>
                Our plan includes reimbursing mailers so more people can lend a hand,<br/>
                and here you can help.<br/>
                </p>
                <p>
                Help more people read good books by becoming a donor.<br/>
                </p>
                <p>
                Proceeds are only used by librarians reimbursing our members' mailings.<br/>
                </p>
                <p>
                Much obliged,<br/>
                Grace Youngblood<br/>
                Lead Librarian<br/>
                </p>
            </Appeal>

            <Border>
                Please send <a href="https://cash.app">Square Cash</a>.<br/>
                Handle: $c4lliope<br/>
                Message: "Mail Money Pool"<br/>
            </Border>
            </Spacing>
        </Page>
    </ModalProvider>,
    document.querySelector('#base')
);