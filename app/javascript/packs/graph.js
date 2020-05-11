import graphql from "./graphql"

const graph = graphql("/graphql", {
    headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
        "Authorization": localStorage.getItem("code"),
    },
})

export default graph

const acquire_records = () => {
    graph(`query { records { id name byline summary member { id name email }}}`)()
    .then(response => model.claim_records(response.records) )
}

const acquire_session = () => {
    graph(`query { me { id name surname email address }}`)()
    .then(response => model.claim_session(response.me))
}

export {
    acquire_records,
    acquire_session,
}