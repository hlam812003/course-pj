const questionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    question: { type: String, required: true },
    answer: { type: String },
    answeredAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
  })
  
  exports.Question = mongoose.model('Question', questionSchema)