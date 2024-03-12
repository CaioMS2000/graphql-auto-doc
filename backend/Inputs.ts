import { Field, InputType } from "type-graphql";
import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional } from "class-validator";

@InputType()
export class NewRecipeInput{
  @IsString()
  @Field()
  title: string;
  
  @IsNumber()
  @Field()
  userId: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description?: string;

  @IsArray()
  @Field(type => [String])
  ingredients: string[];
}

@InputType()
export class NewUserInput{
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  @Field()
  email: string;
}