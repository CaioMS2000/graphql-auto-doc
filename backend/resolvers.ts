import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { NewRecipeInput, NewUserInput } from "./Inputs";
import { Ingredient, Recipe, User } from "./models";
import { CREATE_RECIPE, CREATE_USER, GET_INGREDIENTS, GET_RECIPES, GET_USERS } from "./crud";
import { PrismaClient } from "@prisma/client";

@Resolver(Recipe)
export class RecipeResolver {
	@Query(() => Recipe)
	async recipe(@Arg("id") id: number) {
		const recipe = (await GET_RECIPES()).find((recipe) => recipe.id == id);
		if (recipe === undefined) {
			throw new Error(`Recipe ${id} not found`);
		}
		return recipe;
	}

	@Query(() => [Recipe])
	async recipes(@Arg("amount", {nullable: true, defaultValue: undefined}) amount?: number) {
		const data = await GET_RECIPES();
		
		if (!data) return [];
		if (!amount) return data;
		
		const res = data.slice(0, amount)
		return res;
	}

	@Mutation(() => Recipe)
	async addRecipe(@Arg("newRecipeData") newRecipeData: NewRecipeInput) {
		const newRecipe = await CREATE_RECIPE(newRecipeData);

		return newRecipe;
	}

	@FieldResolver(() => Ingredient)
	async ingredients(@Root() recipe: Recipe){
		const prisma = new PrismaClient()
		const currentRecipe = await prisma.recipe.findFirst({
			where:{
				id: recipe.id
			},
			 include: {
				ingredients: true
			 }
		})
		const ingredientList = currentRecipe.ingredients

		return ingredientList
	}
}

@Resolver(User)
export class UserResolver {
	@Query(() => [User])
	async users() {
		try {
			const users = await GET_USERS();
			return users;
		} catch (error) {
			console.log(error);
		}
	}
	
	@Mutation(() => User)
	async createUser(@Arg('newUser') newUser: NewUserInput) {
		console.log('newUser arrived')
		console.log(newUser)
		try {
			const user = await CREATE_USER(newUser);
			return user;
		} catch (error) {
			console.log(error);
		}
	}
}

@Resolver(Ingredient)
export class IngredientResolver{
	@Query(() => [Ingredient])
	async ingredients(){
		try {
			const ingredients = await GET_INGREDIENTS()

			return ingredients
		} catch (error) {
			console.log(error)
		}
	}
}