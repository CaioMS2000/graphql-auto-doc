import { GraphQLScalarType } from "graphql";
import { Field, ObjectType } from "type-graphql";

export class NumberOrString {
  private value: string | number;

  constructor(value: string | number) {
    this.value = value;
  }

  getValue(): string | number {
    return this.value;
  }
}

const NumberOrStringScalar = new GraphQLScalarType({
  name: 'NumberOrString',
  serialize(value: string | number) {
    return value;
  },
  parseValue(value: string | number) {
    return new NumberOrString(value);
  },
});

@ObjectType()
export class User {
  @Field(() => NumberOrStringScalar)
  id: string|number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;
}

const x = new User()

@ObjectType()
export class Recipe {
  @Field(() => NumberOrStringScalar)
  id: string|number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field(type => [String])
  ingredients: string[];
}