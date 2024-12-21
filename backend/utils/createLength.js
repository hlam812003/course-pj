import { Lesson } from "../models/lesson.js"; // Điều chỉnh đường dẫn tới model của bạn nếu cần

// Hàm chuyển đổi từ "Xm" sang "mm:ss"
const convertToMMSS = (length) => {
  // Lấy số phút từ chuỗi, loại bỏ ký tự "m"
  const minutes = parseInt(length.replace("m", ""), 10);
  const seconds = Math.floor(Math.random() * 60); // Tạo giây ngẫu nhiên từ 0 đến 59
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`; // Định dạng mm:ss
};

// Cập nhật `Length` cho các bài học
export default async function updateLessonLengths() {
  try {
    // Lấy tất cả bài học có trường Length
    const lessons = await Lesson.find({ length: { $regex: /^\d+m$/ } });

    for (const lesson of lessons) {
      // Chuyển đổi giá trị Length sang định dạng mm:ss
      const newLength = convertToMMSS(lesson.length);

      // Cập nhật lại trường Length
      await Lesson.updateOne(
        { _id: lesson._id },
        { $set: { length: newLength } }
      );
    }

    console.log("Tất cả bài học đã được cập nhật với Length dạng 'mm:ss'.");
  } catch (err) {
    console.error("Lỗi khi cập nhật bài học", err);
  }
}
