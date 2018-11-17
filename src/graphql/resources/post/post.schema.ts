const postTypes =`
type Post {
    id:ID!
    title:String!
    content:String!
    photo:String!
    createdAT:String!
    updatedAT:String!
    author:User!
    comments:[Comment!]!
}

input PostInput {
    title: String!
    content: String!
    photo:String!
    author:Int!
}
`;

const postQueries = `
    posts(firt:Int,offset:Int):[Post!]!
    post(id:ID!):Post
    `;

    
const postMutations = `
createPosts(input:PostInput):Post
updatePost(id:ID!,input:PostInput):Post
deletePost(id:ID!):Boolean
`;

export {
    postQueries,
    postMutations,
    postTypes
}
