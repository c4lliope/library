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

import Model from "./models"
import ProcessRecord from "./process_record"
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import SimpleButton from "./camera/simple_button"
import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase } from '@material-ui/core';
import Colors from './camera/colors';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Camera from "./camera"
import styledComponentsCjs from 'styled-components'

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
            <form onSubmit={(e) => {
                e.preventDefault()
                model.sign_in({ email: input.current.value })
                console.log(`${model.me ? model.me.email : "no one"} signed in.`)
            }}>
                <input ref={input} type="email" placeholder="your email" />
                <input type="submit" value="Sign In" />
            </form>
        )
    }
    const { name } = model.me;
    return <div>Signed in as {name}.</div>
})

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
        :
            <span onClick={() => model.set("addingRecord", true)} >Add record</span>
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
                <img src={image}/>
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
    <div>
        record focused: {model.focused_record.name}
        <ProcessRecord
            originalName={model.focused_record.name}
            originalByline={model.focused_record.byline}
            originalSummary={model.focused_record.summary}
            buttonText="Change record"
            onProcessRecord={({ name, byline, summary }) => {
                model.change_record(model.focused_record.id, { name, byline, summary })
                model.focusRecord(null)
            }}
            />
        <Images
          image={model.focused_record.image}
          onImage={(image) => {
              model.focused_record.change_image(image)
              model.change_record(model.focused_record.id, { ...model.focused_record, image })
          }}
          />
    </div>
))

render(
    <div>
        <div>👻</div>
        <Session/>
        <Home/>
        <FocusedRecord />
    </div>,
    document.querySelector('#base')
);