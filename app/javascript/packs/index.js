// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import React, { useRef } from 'react'
import { render } from 'react-dom'
import { observer } from "mobx-react"
import 'mobx-react-lite/batchingForReactDom'
import styled from "styled-components"
import { runInAction } from "mobx"
import Modal from "react-modal"

import Model from "./models"
import ProcessRecord from "./process_record"
import ProcessMember from "./process_member"
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import SimpleButton from "./camera/simple_button"
import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase } from '@material-ui/core';
import Colors from './camera/colors';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Camera from "./camera"

const useStyles = makeStyles({
  text:{
      color: Colors.buttonBlue,
      background: "none",
      textTransform: "capitalize",
      fontSize: ".8em",
      fontFamily: "Roboto, sans-serif"
  },
  icon:{
      marginRight: ".25em"
  },
  big: {
      fontSize: "1em"
  }
})

const ClickableText = (props) => {
    const classes = useStyles();

    return(
    !props.big ?
    <ButtonBase className={`${classes.text} ${props.className}`} onClick={props.onClick}>
        { !props.hideIcon && <ErrorOutlineIcon className={classes.icon} /> }
        {props.text}
    </ButtonBase>
    :
    <ButtonBase className={`${classes.text} ${classes.big} ${props.className}`} onClick={props.onClick}>
        {props.text}
    </ButtonBase>
    )
}

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

const Record = observer(({ record, onClick, onDrop }) => (
    <Border onClick={onClick}>
        {record.name}<br/>
        by {record.byline}

        {record.image
        ? <Image src={record.image} alt={`Image of ${record.name}`} />
        : null
        }

        {model.me && record.member.id === model.me.id
        ? <span onClick={onDrop}>(X)</span>
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
        <Border>
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
        </Border>
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
            <ProcessRecord
            buttonText="Add record"
            onProcessRecord={({ name, byline, summary }) => model.add_record(name, byline, summary)}
            />
            <span onClick={() => model.set("addingRecord", false)} >Cancel</span>
           </Border>
        :  model.me &&
            <a href="#" onClick={() => model.set("addingRecord", !model.addingRecord)} >Add a record</a>
        }

        { model.records.length > 0
        ? <Grid>
            {model.records.map(record => (
                <Record
                key={record.name}
                record={record}
                onClick={() => model.focus_record(record)}
                onDrop={() => model.drop_record(record.id)}
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
  
const Images = observer(({ image, onImage }) => {

    const handlePhoto = (photo) => {
        onImage(photo)
        model.set("cameraIsOpen", false)
    }

    const handleExit = () => {
        model.set("cameraIsOpen", false)
    }

    const handleRetake = () => {
        onImage(null)
        model.set("cameraIsOpen", true)
    }

    const classes = useStyles();

    return (
        <div style={{width: "100%"}}>
            {image
            ?   <>
                <Image src={image}/>
                <ClickableText className={classes.info} hideIcon onClick={handleRetake} text="re-take image" />
                </>
            :   <ButtonBase style={{width:"90%",margin:"5%"}} onClick={() => model.set("cameraIsOpen", true)} >
                    <CameraAltIcon />
                    Open camera.
                </ButtonBase>
            }

            {model.cameraIsOpen
            ? <Camera handleExit={runInAction(() => handleExit)} returnPhoto={handlePhoto} />
            : null
            }
        </div>
    )
})

const FocusedRecord = observer(() => (
    model.focused_record &&
    <Modal
          isOpen={model.focused_record}
          onRequestClose={() => model.focus_record(null)}
        >
            <a href='#' onClick={() => model.focus_record(null)}>close record.</a>
          <ProcessRecord
              originalName={model.focused_record.name}
              originalByline={model.focused_record.byline}
              originalSummary={model.focused_record.summary}
              buttonText="Change record"
              onProcessRecord={({ name, byline, summary }) => {
                  model.change_record(model.focused_record.id, { name, byline, summary })
                  model.focus_record(null)
              }}
              />
          <Images
            image={model.focused_record.image}
            onImage={(image) => {
                model.focused_record.change_image(image)
                model.change_record(model.focused_record.id, { ...model.focused_record, image })
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