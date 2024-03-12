import { graphql } from "../gql";

export const createUserQueryDocument = graphql(`
    mutation CreateUser($newUser: NewUserInput!) {
        createUser(newUser: $newUser) {
            email
            id
            name
        }
    }
`)

export const createRecipeQueryDocument = graphql(`
    mutation CreateRecipe($newRecipeData: NewRecipeInput!) {
        addRecipe(newRecipeData: $newRecipeData) {
            creationDate
            creator {
                email
                id
                name
            }
            description
            id
            userId
            title
            ingredients {
                name
                id
            }
        }
    }
`)