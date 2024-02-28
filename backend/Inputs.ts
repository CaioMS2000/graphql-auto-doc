import { Field, InputType } from "type-graphql";

@InputType()
export class NewRecipeInput{
    @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field(type => [String])
  ingredients: string[];
}