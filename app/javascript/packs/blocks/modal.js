import React from "react"
import BaseModal from "styled-react-modal"

const Modal = BaseModal.styled`
background-color: #fbeed1;
padding: 1rem;
max-height: 60vh;
max-width: 40vw;
border: 4px solid darkgrey;
border-radius: 8px;
`

export default (props) => <Modal {...props} allowScroll />