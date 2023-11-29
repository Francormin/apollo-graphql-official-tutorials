const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const TrackAPI = require("./datasources/track-api");

const port = process.env.PORT || 4000;

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;

      return {
        dataSources: {
          trackAPI: new TrackAPI({ cache })
        }
      };
    },
    listen: { port }
  });

  console.log(`
    🚀  Server is running!
    🔉  Listening on port ${port}
    📭  Query at ${url}
  `);
}

startApolloServer();
