import mongoose from 'mongoose';
const schema=new mongoose.Schema({title:{type:String,required:true,trim:true},company:{type:String,required:true,trim:true},location:{type:String,required:true,trim:true},type:{type:String,enum:['Full-time','Part-time','Contract','Internship'],default:'Full-time'},experience:{type:String,default:'0-2 years'},salary:{type:String,default:'Competitive'},skills:[String],description:{type:String,required:true},recruiter:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}},{timestamps:true});
export default mongoose.model('Job',schema);
