import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
    createdAt: { type: Date, default: Date.now },
  })
  
  export const User = mongoose.model('User', userSchema)
  