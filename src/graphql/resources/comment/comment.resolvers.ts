import { GraphQLResolveInfo } from "../../../../node_modules/@types/graphql";
import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import {UserInstance} from "../../../models/UserModel"
import { Transaction } from "../../../../node_modules/@types/sequelize";
import { CommentInstance } from "../../../models/CommentModel";
import { handleError } from "../../../utils/utils";

export const commentResolvers = {

    Comment:{
        post:(parent,args,{db}:{db:DbConnection},info: GraphQLResolveInfo)=>{
            return db.Post
                .findById(parent.get('post'))
                .catch(handleError)
        },

        user:(parent,args,{db}:{db:DbConnection},info: GraphQLResolveInfo)=>{
            return db.User
                .findById(parent.get('user'))
                .catch(handleError)
        },      
    },

    Query:{

        commentsByPost:(parent,{postID,first = 10,offset = 0},{db}:{db:DbConnection},info: GraphQLResolveInfo)=>{
            postID = parseInt(postID)
            return db.Comment.findAll({
                where:{post:postID},
                limit:first,
                offset:offset
            }).catch(handleError);
        },

    },

    Mutation:{
        createComment:(parent,{input},{db}:{db:DbConnection},info:GraphQLResolveInfo) =>{
            return db.sequelize.transaction((t:Transaction) => {
                return db.Comment
                    .create(input,{transaction:t});
            }).catch(handleError)
        },

        updateComment:(parent,{id,input},{db}:{db:DbConnection},info:GraphQLResolveInfo) =>{
            id = parseInt(id)
            return db.sequelize.transaction((t:Transaction) => {
                return db.Comment
                    .findById(id)
                    .then((comment:CommentInstance) => {
                        if(!comment) throw new Error(`Comment with id ${id} not found!`);
                        return comment.update(input,{transaction:t})
                    })
            }).catch(handleError)
        },

        deleteComment:(parent,{id},{db}:{db:DbConnection},info:GraphQLResolveInfo) =>{
            id = parseInt(id)
            return db.sequelize.transaction((t:Transaction) => {
                return db.Comment
                    .findById(id)
                    .then((comment:CommentInstance) => {
                        if(!comment) throw new Error(`Comment with id ${id} not found!`);
                        return comment.destroy({transaction:t});
                    })
            }).catch(handleError)
        }

    }
};
