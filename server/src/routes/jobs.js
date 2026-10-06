import {Router} from 'express'; import Job from '../models/Job.js'; import {auth,role} from '../middleware/auth.js';
const r=Router();
r.get('/',async(req,res)=>{try{const {q='',location='',type=''}=req.query;const filter={};if(q)filter.$or=[{title:{$regex:q,$options:'i'}},{company:{$regex:q,$options:'i'}},{skills:{$regex:q,$options:'i'}}];if(location)filter.location={$regex:location,$options:'i'};if(type)filter.type=type;res.json(await Job.find(filter).populate('recruiter','name company').sort({createdAt:-1}));}catch(e){res.status(500).json({message:'Could not load jobs'});}});
r.get('/:id',async(req,res)=>{try{const j=await Job.findById(req.params.id).populate('recruiter','name company');if(!j)return res.status(404).json({message:'Job not found'});res.json(j);}catch(e){res.status(404).json({message:'Job not found'});}});
r.post('/',auth,role('recruiter'),async(req,res)=>{try{const j=await Job.create({...req.body,recruiter:req.user._id});res.status(201).json(j);}catch(e){res.status(400).json({message:'Invalid job data'});}});
r.get('/recruiter/mine',auth,role('recruiter'),async(req,res)=>res.json(await Job.find({recruiter:req.user._id}).sort({createdAt:-1})));
export default r;
