import express from 'express'; import cors from 'cors'; import dotenv from 'dotenv'; import mongoose from 'mongoose'; import authRoutes from './routes/auth.js'; import sessionRoutes from './routes/sessions.js'; import userRoutes from './routes/users.js';
dotenv.config(); const app=express(); app.use(cors({
  origin: true,
  credentials: true
})); app.use(express.json());
app.get('/api/health',(req,res)=>res.json({ok:true,service:'turf-roster-api'})); app.use('/api/auth',authRoutes); app.use('/api/sessions',sessionRoutes); app.use('/api/users',userRoutes);
const port=process.env.PORT||5000; mongoose.connect(process.env.MONGO_URI||'mongodb://127.0.0.1:27017/turf-roster').then(()=>{console.log('MongoDB connected'); app.listen(port,()=>console.log(`API running on ${port}`));}).catch(e=>{console.error('MongoDB connection failed:',e.message); process.exit(1)});
