const progressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    progressPercentage: { type: Number, default: 0 },
    lastAccessedAt: { type: Date, default: Date.now },
  })
  
  exports.Progress = mongoose.model('Progress', progressSchema)
  