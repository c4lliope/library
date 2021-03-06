
import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"

import BaseModal from "./modal"
import { BaseField } from "./field"

const Modal = styled(BaseModal)`
overflow: hidden;
display: flex;
flex-direction: column;
`

const Responses = styled.div`
overflow-y: scroll;
`

const Response = styled.div`
border-top: 1px solid grey;
display: flex;
flex-direction: row;
align-items: center;
padding: 1rem;

&:hover {
    background-color: #f7e8bf;
    cursor: pointer;
}
`

const Image = styled.img`
height: 3rem;
margin-right: 1rem;
`

const AddRecord = observer(() => (
    <>
        {model.me &&
        <a href="#" onClick={() => model.claim("goodreads_search", "")} >Supply a book.</a>
        }<br/>
        {model.me &&
        <a href="#" onClick={() => model.add_record("", "", null)} >Add a blank record.</a>
        }

        {model.goodreads_search === null
        ? null
        : <Modal onBackgroundClick={() => model.claim("goodreads_search", null)} >
            <BaseField
              ref={e => e && e.focus()}
              onChange={(e) => model.delay("goodreads_search", e.target.value, 1000, () => model.run_goodreads_search())}
              value={model.goodreads_search}
              placeholder="search goodreads"
              />
            <Responses>
                {model.goodreads_responses.map(response => (
                    <Response
                        key={response.id}
                        onClick={() => {
                            model.focus_record(model.add_record(response.name, response.byline, response.imageAddress))
                            model.claim("goodreads_responses", [])
                            model.claim("goodreads_search", null)
                        }}
                    >
                        <Image src={response.imageAddress} alt={`${response.name} by ${response.byline}`} />
                        {response.name} by {response.byline}
                    </Response>
                ))}
            </Responses>
          </Modal>
        }
    </>
))

export default AddRecord