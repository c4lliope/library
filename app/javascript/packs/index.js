// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import React, { useRef } from 'react'
import { render } from 'react-dom'
import { observer } from "mobx-react"
import 'mobx-react-lite/batchingForReactDom'
import styled from "styled-components"
import Modal from "react-modal"

import Model from "./models"
import ProcessRecord from "./process_record"
import ProcessMember from "./process_member"

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

const Error = ({ children }) => <div>Error: {children}</div>
const Loading = () => <div>Loading</div>
const Image = styled.img`
width: 100%;
`

const Record = observer(({ record, onClick }) => (
    <Border onClick={onClick}>
        {record.name}<br/>
        by {record.byline}

        {record.image
        ? <Image src={record.image} alt={`Image of ${record.name}`} />
        : null
        }
    </Border>
))

const Session = observer(() => {
    // const { store, error, loading, data } = useQuery(store =>
    //     store.queryMe()
    // )

    const input = useRef(null)
    // const { setQuery, loading2, error2 } = useQuery()

    // if(error) return <Error>{error.message}</Error>
    // if(loading) return <Loading />
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

const AddName = observer(() => (
    model.addingName
    ?
    <Modal
          isOpen={model.addingName}
          onRequestClose={() => model.focus_record(null)}
          style={{ border: "4px solid grey" }}
        >
            Add your name and address, or &nbsp;
            <a href="#" onClick={() => model.set("addingName", false)}>cancel.</a>

            <p>
                By adding your name and address, you agree:<br/>
                your name and address may be shared among your peers.
            </p>

            <ProcessMember
                originalName={model.me.name}
                originalSurname={model.me.surname}
                originalAddress={model.me.address}
                buttonText="Record name and address"
                onProcess={({ name, surname, address }) => {
                    model.change_me({ name, surname, address })
                    model.set("addingName", false)
                }}
                />
        </Modal>
    : model.me ?
        (model.me.name === null || model.me.surname === null || model.me.address === null)
        ? <div>
            Nearly done -
            <a href="#" onClick={() => model.set("addingName", true)}>Add your name and address.</a>
            </div>
        : <a href="#" onClick={() => model.set("addingName", true)}>change name or address.</a>
      : null
))

const Border = styled.div`
border: 1px solid grey;
padding: 1rem;
`

const Home = observer(() => (
    <div>
        {model.addingRecord
        ?  <Border>
                <span onClick={() => model.set("addingRecord", false)} >Cancel</span>
                <ProcessRecord
                buttonText="Add record"
                onProcessRecord={({ name, byline, summary, image }) => {
                    model.set("addingRecord", false)
                    model.add_record(name, byline, summary, image)
                }}
                />
           </Border>
        :  model.me &&
            <a href="#" onClick={() => model.set("addingRecord", true)} >Add a record</a>
        }

        { model.records.length > 0
        ? <Grid>
            {model.records.map(record => (
                <Record
                key={record.name}
                record={record}
                onClick={() => model.focus_record(record)}
                />
            ))}
        </Grid>
        : <Loading />
        }
    </div>
))

const Grid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-column-gap: 1rem;
grid-row-gap: 1rem;

@media(max-width: 768px) {
    grid-template-columns: 1fr;
}
`

var model = window.model = Model.create({})

model.acquire_records()
model.acquire_session()

const FocusedRecord = observer(() => (
    model.focused_record &&
    <Modal
          isOpen={model.focused_record}
          onRequestClose={() => model.focus_record(null)}
          style={{ border: "4px solid grey" }}
        >
            <a href='#' onClick={() => model.focus_record(null)}>close record.</a><br/>

            {model.me && model.focused_record.member.id === model.me.id
             ? <a
                href='#'
                onClick={() => { model.focus_record(null); model.drop_record(model.focused_record.id)}}
                >drop record.</a>
            : null
            }

          <ProcessRecord
              originalName={model.focused_record.name}
              originalByline={model.focused_record.byline}
              originalSummary={model.focused_record.summary}
              originalImage={model.focused_record.image}
              buttonText="Change record"
              onProcessRecord={({ name, byline, summary, image }) => {
                  model.change_record(model.focused_record.id, { name, byline, summary, image })
                  model.focus_record(null)
              }}
              />
        </Modal>
))

const Header = styled.div`
background-color: #b492c4;
color: #fdfac7;
padding: 1rem;
text-align: right;
display: grid;
grid-template-columns: auto 1fr;
`

const Spacing = styled.div`
padding: 2rem;
background-color: #fdfac7;
`

const Heading = styled.div`
font-size: 2.4rem;
`

Modal.setAppElement('#base')

render(
    <div>
        <Header>
            <Heading>Shared Library</Heading>
            
            <div>
                <Session/>
                <AddName/>
            </div>
        </Header>

        <Spacing>
            <Home/>
            <FocusedRecord />
        </Spacing>
    </div>,
    document.querySelector('#base')
);