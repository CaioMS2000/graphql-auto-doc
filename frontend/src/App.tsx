import "./style.css"
import { useEffect, useState } from 'react'
import { useQuery } from "@apollo/client"
import { graphql } from "./gql"

function App() {
  const allRecipesQueryDocument = graphql(`
    query GetRecipes ($amount: Float!) {
      recipes(amount: $amount) {
        id
        title
        description
        creationDate
        ingredients
      }
    }
  `)
  const { data, error } = useQuery(allRecipesQueryDocument, { variables: { amount: 5 } })
  const recipes = data?.recipes

  return (
    <>
    </>
  )
}

export default App
