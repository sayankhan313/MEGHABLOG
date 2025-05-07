import conf from "../conf/conf";
import { Client, Databases, Storage, Query } from "appwrite";
import { ID} from 'appwrite';

export  class Service{
client=new Client();
databases;
bucket;
constructor(){
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId)
    this.databases=new Databases(this.client)
    this.bucket=new Storage(this.client)


}
async updatePost(slug,{title,content,featuredImage,status}){
try {
   return await this.databases.updateDocument(conf.appwriteDataBaseId,conf.appwriteCollectionId,slug,{
        title,
        content,
        featuredImage,
        status,
        
   })
    
} catch (error) {
    console.log('Service::updatePost::error',error);
}
}

async createPost({title,slug,content,featuredImage,status,userId}){
try {
    return await this.databases.createDocument(conf.appwriteDataBaseId,conf.appwriteCollectionId,slug,{
        title,
        content,
        featuredImage,
        status,
        userId,
  
    })
} catch (error) {
    console.log('Service::createPost::error',error);
}
}
async deletePost(slug){
    try {
        return await this.databases.deleteDocument(conf.appwriteDataBaseId,conf.appwriteCollectionId,slug);
        
    } catch (error) {
        console.log('Service::deletePost::error',error);
    }
}
async getPost(slug){
    try {
        return await this.databases.getDocument(conf.appwriteDataBaseId,conf.appwriteCollectionId,slug);
    } catch (error) {
        console.log('Service::getPost::error',error);
    }
}
async getPosts(queries=[Query.equal('status','active')]){
    try {
        return await this.databases.listDocuments(conf.appwriteDataBaseId,conf.appwriteCollectionId,queries);
    } catch (error) {
        console.log('Service::getPosts::error',error);
    }
}

async uploadFile(file) {
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file,
            
        );
    } catch (error) {
        console.log("Service::uploadFile::error", error);
    }
}
async deleteFile(fileId){
try {
   await this.bucket.deleteFile(conf.appwriteBucketId,fileId);
    return true
    
} catch (error) {
    console.log('Service::deleteFile::error',error);
    return false 
}
}
getFileView(fileId){
    return this.bucket.getFileView( conf.appwriteBucketId,fileId);
}
}
const service=new Service();
export default service;