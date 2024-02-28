import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { RecipeResolver, UserResolver } from "./resolvers";

async function main() {
  const schema = await buildSchema({
    resolvers: [RecipeResolver, UserResolver],
    emitSchemaFile: true
  });

  const server = new ApolloServer({
    schema,
  });

  server.listen().then(({ url }) => {
    console.log(` Server ready at ${url}`);
  });
}

main();
