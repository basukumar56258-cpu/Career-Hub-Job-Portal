import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true},email:{type:String,required:true,unique:true,lowercase:true,trim:true},password:{type:String,required:true},role:{type:String,enum:['candidate','recruiter'],default:'candidate'},company:{type:String,trim:true}},{timestamps:true});
export default mongoose.model('User',schema);
