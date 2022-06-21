const Project = require('../models/Project');
const Client = require('../models/Client');

const { GraphQLObjectType, GraphQLID,
  GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');

//Project type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, _args) {
        return Client.findById(parent.clientId);
      }
    }
  })
});


//Client type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});



const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //project
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(_parent, _args) {
        return Project.find();
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(_parent, args) {
        return Project.findById(args.id);
      }
    },
    //client
    clients: {
      type: new GraphQLList(ClientType),
      resolve(_parent, _args) {
        return Client.find();
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(_parent, args) {
        return Client.findById(args.id);
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
})