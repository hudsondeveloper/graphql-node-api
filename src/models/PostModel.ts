import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';
import UserModel from './UserModel';


export interface PostAttributes{
    id?:number;
    title?:string;
    content?:string;
    photo?:string;
    author?:number;
    createdAt?:string;
    updatedAt?:string;
}

export interface PostInstance extends Sequelize.Instance<PostAttributes>{}

export interface PostModel extends BaseModelInterface, Sequelize.Model<PostInstance,PostAttributes>{}

export default (sequelize:Sequelize.Sequelize, DataTypes:Sequelize.DataTypes):PostModel => {
    const Post: PostModel =
    sequelize.define<PostInstance,PostAttributes>('Post',{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        }   ,
        title:{
            type:DataTypes.STRING(128),
            allowNull:false,
        },
        content:{
            type:DataTypes.STRING(128),
            allowNull:false,
        },
        photo:{
            type:DataTypes.BLOB({
                length:'long'
            }),
            allowNull:true,
            defaultValue:null
        }
    },{
        tableName:'Posts',
    });

    
    Post.associate = (models:ModelsInterface):void => {
        Post.belongsTo(models.User,{
            foreignKey:{
                allowNull:false,
                field:'author',
                name:'author'
            }
        });
    };

    return Post;
};