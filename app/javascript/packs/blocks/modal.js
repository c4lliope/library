import React from "react"
import BaseModal from "styled-react-modal"

const Modal = BaseModal.styled`
background-color: #fbeed1;
padding: 1rem;
max-height: 60vh;
max-width: 40vw;
border: 2px solid black;
border-radius: 4px;

font-family: 'DM Mono', monospace;
`

export default (props) => <Modal isOpen allowScroll {...props} />