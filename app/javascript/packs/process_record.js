import React, { useState } from "react";
import { observer } from "mobx-react"
import { runInAction } from "mobx"
import styled from "styled-components"

import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase } from '@material-ui/core';

import SimpleButton from "./camera/simple_button"
import Colors from './camera/colors';
import Camera from "./camera"

const Image = styled.img`
width: 100%;
`

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


const ProcessRecord = observer(({
  originalName = "",
  originalSummary = "",
  originalByline = "",
  originalImage = "",
  onProcessRecord,
  buttonText,
  loading,
}) => {
  const [name, upgradeName] = useState(originalName);
  const [byline, upgradeByline] = useState(originalByline);
  const [summary, upgradeSummary] = useState(originalSummary);
  const [image, upgradeImage] = useState(originalImage);

  return (
    <div>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={e => upgradeName(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder="summary"
        value={summary}
        onChange={e => upgradeSummary(e.currentTarget.value)}
      />

      <input
        type="text"
        placeholder="byline"
        value={byline}
        onChange={e => upgradeByline(e.currentTarget.value)}
      />

      <Images
        image={image}
        onImage={(image) => {
          upgradeImage(image)
        }}
        />

      {loading ? (
        "...Loading"
      ) : (
        <button
          onClick={() => onProcessRecord({ name, byline, summary, image })}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
})

export default ProcessRecord;