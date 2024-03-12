import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { IngredientResolver, RecipeResolver, UserResolver } from "./resolvers";

async function main() {
  const schema = await buildSchema({
    resolvers: [RecipeResolver, UserResolver, IngredientResolver],
    emitSchemaFile: true
  });

  const server = new ApolloServer({
    schema,
    debug: true
  });

  server.listen().then(({ url }) => {
    console.log(` Server ready at ${url}`);
  });
}

main();
