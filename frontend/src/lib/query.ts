import { graphql } from "../gql";

export const allRecipesQueryDocument = graphql(`
  query GetRecipes($amount: Float) {
    recipes(amount: $amount) {
      id
      title
      description
      creationDate
      ingredients{
        name
      }
      userId
    }
  }
`);

export const allUsersQueryDocument = graphql(`
  query GetUsers {
    users {
      email
      id
      name
    }
  }
`);

export const allIngredientsQueryDocument = graphql(`
  query Ingredients {
    ingredients {
      id
      name
    }
  }
`)