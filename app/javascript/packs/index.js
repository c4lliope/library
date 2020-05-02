// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import React from 'react'
import { render } from 'react-dom'
import { createHttpClient } from "mst-gql"
import { RootStore, StoreContext } from "./graphql"
import { observer } from "mobx-react"
import { useQuery } from "./graphql/reactUtils"
import { observable, runInAction } from "mobx"
import 'mobx-react-lite/batchingForReactDom'
import { types } from "mobx-state-tree"

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
const Record = ({ record }) => <div>{record.name}</div>

const Home = observer(() => {
    const { store, error, loading, data } = useQuery(store =>
      store.queryRecords()
    )
    if (error) return <Error>{error.message}</Error>
    if (loading) return <Loading />
    return (
      <ul>
        {data.records.map(record => (
          <Record key={record.id} record={record} />
        ))}
      </ul>
    )
  })

var Model = types.model({
    photoString: "",
    photoWasTaken: false,
    cameraIsOpen: false,
}).actions(self => ({
    set: (key, value) => { self[key] = value },
}))

var model = Model.create({})
  
const Images = observer(() => {

    const handlePhoto = (photo) => {
        model.set("photoString", photo)
        model.set("photoWasTaken", true)
        model.set("cameraIsOpen", false)
        console.log("photo taken.")
    }

    const handleExit = () => {
        model.set("cameraIsOpen", false)
    }

    const handleRetake = () => {
        model.set("photoWasTaken", false)
        model.set("cameraIsOpen", true)
    }

    const classes = useStyles();

    return (
        <div style={{width: "100%"}}>
            {model.photoWasTaken
            ?
                <>
                <img src={model.photoString}/>
                <ClickableText className={classes.info} hideIcon onClick={handleRetake} text="re-take image" />
                </>
            :
                <>
                <ButtonBase style={{width:"90%",margin:"5%"}} onClick={() => model.set("cameraIsOpen", true)} >
                    <CameraAltIcon />
                    Open camera.
                </ButtonBase>
                </>
            }

            {model.cameraIsOpen
            ? <Camera handleExit={() => runInAction(handleExit)} returnPhoto={handlePhoto} />
            : null
            }
        </div>
    )
})

const rootStore = RootStore.create(undefined, {
    gqlHttpClient: createHttpClient("http://localhost:3000/graphql")
})

render(
    <StoreContext.Provider value={rootStore}>
        <div>👻</div>
        <Home/>
        <Images />
    </StoreContext.Provider>,
    document.querySelector('#base')
);