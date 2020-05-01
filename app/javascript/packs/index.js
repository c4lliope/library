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


const rootStore = RootStore.create(undefined, {
    gqlHttpClient: createHttpClient("http://localhost:3000/graphql")
})

render(
    <StoreContext.Provider value={rootStore}>
        <div>👻</div>
        <Home/>
    </StoreContext.Provider>,
    document.querySelector('#base')
);