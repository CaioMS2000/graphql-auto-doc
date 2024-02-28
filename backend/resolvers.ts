import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { NewRecipeInput } from "./Inputs";
import { Recipe, User } from "./models";
import { GET_RECIPES, GET_USERS } from "./crud";

@Resolver(Recipe)
export class RecipeResolver {

  @Query(() => Recipe)
  async recipe(@Arg("id") id: string) {
    const recipe = GET_RECIPES().find(recipe => recipe.id == id);
    if (recipe === undefined) {
      throw new Error(`Recipe ${id} not found`);
    }
    return recipe;
  }

  @Query(() => [Recipe])
  recipes(@Arg("amount") amount: number) {
    const data = GET_RECIPES()
    
    if(!data) return [];

    return data.slice(0, amount)
  }


  @Mutation(() => Recipe)
  async  addRecipe(
    @Arg("newRecipeData") newRecipeData: NewRecipeInput,
    @Ctx("user") user: User,
  ) {
    const recipes = GET_RECIPES()
    recipes.push({
        creationDate: new Date(),
        id: generateRandomInteger(0, 1000),
        ingredients: newRecipeData.ingredients,
        title: newRecipeData.title,
        description: newRecipeData.description,
      })

      return recipes
  }
}

@Resolver(User)
export class UserResolver{
  @Query(() => [User])
  async users() {
    try {
      const users = GET_USERS()
      return users
    } catch (error) {
      console.log(error)
    }
  }
}