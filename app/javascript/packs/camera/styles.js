let Styles = {

    popOver:{
        height: "100vh",
        width: "100vw",
        backgroundColor: "white",
        position: "fixed"
    },
    flexRow:{
        display: "flex",
        flexDirection: "row"
    },
    flexColumn:{
        display: "flex",
        flexDirection: 'column'
    },
    flexCenter:{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems:"center",

    },
    buttonBase: {
        fontSize: "1.125em",
        padding: ".75em",
        borderRadius: "10px",
        fontStyle: "normal",
        fontWeight: "450",
        marginBottom: ".5em"

    },
    secondaryText:{
        color: "#757575",
        fontSize: ".75em",
        textTransform: "uppercase"
    },
    modifiedPaper:{
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        margin: "auto",
        marginTop: "10px",
        padding: "1em",
        width:"85%",
    },
    
}

Styles.alignRight = {
    ...Styles.flexRow,
    width: "100vw",
    justifyContent: "flex-end",
    "& > button": {
        marginRight: "1.5em"
    }
}

export default Styles;