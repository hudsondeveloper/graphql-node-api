import { GraphQLResolveInfo } from "../../../../node_modules/@types/graphql";
import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import {UserInstance} from "../../../models/UserModel"
import { Transaction } from "../../../../node_modules/@types/sequelize";

export const usersResolvers = {

    Query:{

        users:(parent,{first = 10,offset = 0},{db}:{db:DbConnection},info: GraphQLResolveInfo)=>{
            return db.User.findAll({
                limit:first,
                offset:offset
            });
        },

        user:(parent,{id},{db}:{db:DbConnection},info: GraphQLResolveInfo)=>{
            return db.User
            .findById(id)
            .then((user: UserInstance)=>{
                if(!user) throw new Error(`User with id ${id} not found`);
                return user;
            });
        },
        Mutation:{
            createUser:(parent,args,{db}:{db:DbConnection},info: GraphQLResolveInfo)=>{
                return db.sequelize.transaction((t:Transaction)=>{
                    return db.User.create(args.input,{transaction:t});
                })
             },

             updateUser:(parent,{id,input},{db}:{db:DbConnection},info: GraphQLResolveInfo)=>{
             id = parseInt(id);
             return db.sequelize.transaction((t:Transaction)=>{
                 return db.User
                 .findById(id)
                 .then((user:UserInstance)=>{
                    if(!user) throw new Error(`User with id ${id} not found`);

                    return user.update(input,{transaction: t});
                 })
             })
             }
        }
    }
};