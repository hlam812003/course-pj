import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }],
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
  })
  
  export const Order = mongoose.model('Order', orderSchema)
  