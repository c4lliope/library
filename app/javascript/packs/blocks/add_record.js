
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
`

const Image = styled.img`
height: 3rem;
margin-right: 1rem;
`

const AddRecord = observer(() => (
    <>
        {model.me &&
        <a href="#" onClick={() => model.set("goodreads_search", "")} >Supply a book.</a>
        }

        {model.goodreads_search === null
        ? null
        : <Modal allowScroll={false}>
            <a href="#" onClick={() => model.set("goodreads_search", null)} >cancel</a>
            <BaseField
              onChange={(e) => model.delay("goodreads_search", e.target.value, 1000, () => model.run_goodreads_search())}
              value={model.goodreads_search}
              placeholder="search goodreads"
              />
            <Responses>
                {model.goodreads_responses.map(response => (
                    <Response key={response.id}>
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