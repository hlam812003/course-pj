import { Course } from "../models/course.js";
// Hàm chuyển đổi phút thành chuỗi giờ và phút
const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// Cập nhật các khóa học
export const updateCourses = async () => {
  try {
    // Lấy tất cả các khóa học
    const courses = await Course.find();

    for (const course of courses) {
      // Random giá trị trong khoảng từ 180 đến 480 phút (nếu chưa có giá trị hợp lệ)
      const randomMinutes = Math.floor(Math.random() * (480 - 180 + 1)) + 180;

      // Chuyển đổi sang chuỗi giờ và phút
      const formattedTime = formatTime(randomMinutes);

      // Cập nhật `totalLength` thành chuỗi "xh ym"
      await Course.updateOne(
        { _id: course._id },
        { $set: { totalLength: formattedTime } }
      );
    }

    console.log(
      "Tất cả khóa học đã được cập nhật với totalLength dạng 'xh ym'."
    );
  } catch (err) {
    console.error("Lỗi khi cập nhật khóa học", err);
  }
};

// Gọi hàm updateCourses để thực hiện cập nhật
