const Project = require('../models/Project');
const Client = require('../models/Client');

const { GraphQLObjectType, GraphQLID, GraphQLEnumType,
  GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');

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


//Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // add a Client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(_parent, args) {
        const newClient = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        })
        return newClient.save()
      }
    },
    // delete a Client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(_parent, args) {
        return Client.findByIdAndRemove(args.id)
      }
    },
    // add a Project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              'new': { value: 'Not Started' },
              'progress': { value: 'In Progress' },
              'completed': { value: 'Completed' },
            }
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(_parent, args) {
        const newProject = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId
        })
        return newProject.save()
      }
    },
    // Delete a Project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(_parent, args) {
        return Project.findByIdAndRemove(args.id)
      }
    },
    // Update a Project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              'new': { value: 'Not Started' },
              'progress': { value: 'In Progress' },
              'completed': { value: 'Completed' },
            }
          }),
        },
      },
      resolve(_parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        )
      }
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
})