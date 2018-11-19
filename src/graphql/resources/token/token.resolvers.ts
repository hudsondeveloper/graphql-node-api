import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { UserInstance } from "../../../models/UserModel";

export const tokenResolvers = {

    Mutation:{
        createToken:(parent,{email,password},{db}:{db:DbConnection})=>{
            return db.User
            .findOne({
                where:{ email:email},
                attributes:['id','password']
            }).then((user:UserInstance)=>{
                let errorMessage :string = 'Unauthotized, wrong email os password';
                if(!user){throw new Error(errorMessage)}
                if(!user.isPassword(user.get('password'),password)){throw new Error(errorMessage)}

                cost payload = {sub:user.get('id')}
            
            });
        }
    }
}