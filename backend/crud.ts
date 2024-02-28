import { readFileSync, writeFileSync } from "fs";
import { Recipe, User } from "./models";
import { randomUUID } from "node:crypto";

export function GET_RECIPES() {
  try {
    const { recipes } = JSON.parse(readFileSync("recipes.json", "utf-8")) as {
      recipes: Recipe[];
    };

    const recipesWithDateFix = recipes.map((recipe) => {
      const transformed = new Date(recipe.creationDate);

      return { ...recipe, creationDate: transformed };
    });

    return recipesWithDateFix;
  } catch (error) {
    console.log(error);
  }
}

export function CREATE_RECIPE(newRecipe: Omit<Recipe, "id">) {
  try {
    writeFileSync(
      "recipes.json",
      JSON.stringify(
        Array.from([...GET_RECIPES(), { ...newRecipe, id: randomUUID() }])
      )
    );
  } catch (error) {
    console.log(error);
  }

  return GET_RECIPES();
}

export function GET_USERS() {
  try {
    const { users } = JSON.parse(readFileSync("users.json", "utf-8")) as {
      users: User[];
    };
    return users;
  } catch (error) {
    console.log(error);
  }
}

export function CREATE_USER(newUser: Omit<User, "id">) {
  try {
    writeFileSync(
      "users.json",
      JSON.stringify(
        Array.from([...GET_USERS(), { ...newUser, id: randomUUID() }])
      )
    );
  } catch (error) {
    console.log(error);
  }

  return GET_USERS();
}
