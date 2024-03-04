import { PrismaClient } from '@prisma/client'
import { Recipe, User } from "./models";
import { randomUUID } from "node:crypto";
import { NewRecipeInput } from './Inputs';

export type NewUserType = Omit<User, "id">;

const prisma = new PrismaClient()

export async function GET_RECIPES() {
	try {
		const recipes = await prisma.recipe.findMany()

    return recipes

	} catch (error) {
		console.log(error);
	}
}

export async function CREATE_RECIPE(newRecipe: NewRecipeInput) {
	try {
		const NEWRECIPE = await prisma.recipe.create({data:{
      description: newRecipe.description,
      title: newRecipe.title,
      ingredients: {
        connectOrCreate: newRecipe.ingredients.map(ingredient => ({
          create: {
            name: ingredient
          },
          where: {
            name: ingredient
          }
        }))
      },
      creator: {
        connect: {
          id: newRecipe.userId
        }
      }
    }})

		return NEWRECIPE;
	} catch (error) {
		console.log(error);
	}
}

export async function GET_USERS() {
	try {
		const users = await prisma.user.findMany()

		return users;
	} catch (error) {
		console.log(error);
	}
}

export async function CREATE_USER(newUser: NewUserType) {
	try {
		const NEWUSER = await prisma.user.create({
			data: {
				email: newUser.email,
				name: newUser.name,
			}
		})

		return NEWUSER;
	} catch (error) {
		console.log(error);
	}
}