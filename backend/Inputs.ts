import { Field, InputType } from "type-graphql";

@InputType()
export class NewRecipeInput{
  @Field()
  title: string;
  
  @Field()
  userId: number;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [String])
  ingredients: string[];
}