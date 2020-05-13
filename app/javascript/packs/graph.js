import graphql from "./graphql"

const graph = graphql("/graphql", {
    headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
        "Authorization": localStorage.getItem("code"),
    },
})

export default graph