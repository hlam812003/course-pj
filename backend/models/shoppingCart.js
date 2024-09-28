const shoppingCartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Người dùng sở hữu giỏ hàng
    courses: [{
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Khóa học trong giỏ hàng
      quantity: { type: Number, default: 1 }, // Số lượng khóa học (mặc định 1)
    }],
    totalAmount: { type: Number, required: true }, // Tổng số tiền giỏ hàng
    createdAt: { type: Date, default: Date.now }, // Thời gian tạo giỏ hàng
    updatedAt: { type: Date, default: Date.now }, // Thời gian cập nhật gần nhất
  })
  
  exports.shoppingCart = mongoose.model('shoppingCar', cartSchema)