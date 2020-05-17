import React from "react"
import { observer } from "mobx-react"

const YouAreHereLink = ({ link, here }) => (
    <>
    <a href={link} >{link}</a>
    {link === here && "- you are here."}
    </>
)

const Links = observer(({ here }) => (
    <div>
        <h3>Links</h3>

        <YouAreHereLink here={here} link="/" /><br/>
        <YouAreHereLink here={here} link="/mail-money-pool" /><br/>
        <YouAreHereLink here={here} link="/librarian-salary-pool" /><br/>
    </div>
))

export default Links