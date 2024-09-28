const instructorProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bio: { type: String, required: true },
    expertise: { type: [String], required: true }, // Ví dụ: ['Web Development', 'Data Science']
    profilePicture: { type: String }, // Link đến ảnh đại diện
    socialLinks: { type: Map, of: String }, // Các liên kết mạng xã hội
    createdAt: { type: Date, default: Date.now },
  })
  
  exports.InstructorProfile = mongoose.model('InstructorProfile', instructorProfileSchema)
  