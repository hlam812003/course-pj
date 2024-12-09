import axios from "axios";
import { Course } from "../models/course.js"; // Đường dẫn model khóa học
import { Lesson } from "../models/lesson.js"; // Đường dẫn model bài học

const YOUTUBE_API_URL = "https://youtube.googleapis.com/youtube/v3";
const PLAYLIST_ID = "PLSDeUiTMfxW6nMcmZPUG4SgFPAlazWB_S"; // Playlist ID
const API_KEY = "AIzaSyBKfyFU9dcPao9rgpUKeBV53x8jooCDJAw"; // Thay bằng API Key của bạn
const INSTRUCTOR_ID = "673b8251cacb110b3ca99203"; // ID giảng viên
const CATEGORY_ID = "6736fb8d9a701d5ca3768b67"; // ID danh mục

// Lấy thông tin playlist (tiêu đề, mô tả, thumbnail)
async function fetchPlaylistInfo(playlistId) {
  try {
    const response = await axios.get(`${YOUTUBE_API_URL}/playlists`, {
      params: {
        part: "snippet",
        id: playlistId,
        key: API_KEY,
      },
    });

    const playlist = response.data.items[0]?.snippet;
    if (!playlist) throw new Error("Playlist not found");

    return {
      title: playlist.title,
      description:
        "Learn to design stunning, high-converting landing pages with Amazing Landing Pages 🔥. This course covers everything you need to create visually appealing and effective pages that capture attention and drive action. Master principles of UX/UI design, responsive layouts, compelling copywriting, and A/B testing. Explore powerful tools like HTML, CSS, JavaScript, and modern frameworks to bring your ideas to life. Whether you're a marketer, designer, or developer, this course will help you craft landing pages that leave a lasting impression and boost your conversions!",
      thumbnail: playlist.thumbnails.high.url,
    };
  } catch (error) {
    console.error("Error fetching playlist info:", error.message);
    throw error;
  }
}

// Lấy danh sách video trong playlist
async function fetchPlaylistItems(playlistId) {
  try {
    const response = await axios.get(`${YOUTUBE_API_URL}/playlistItems`, {
      params: {
        part: "snippet",
        playlistId,
        maxResults: 50,
        key: API_KEY,
      },
    });

    return response.data.items.map((item) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      videoUrl: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      thumbnail: item.snippet.thumbnails.high.url,
    }));
  } catch (error) {
    console.error("Error fetching playlist items:", error.message);
    throw error;
  }
}

// Tạo khóa học và bài học từ playlist
async function createCourseWithLessonsFromPlaylist() {
  try {
    // Lấy thông tin playlist
    const playlistInfo = await fetchPlaylistInfo(PLAYLIST_ID);

    // Lấy danh sách video từ playlist
    const videos = await fetchPlaylistItems(PLAYLIST_ID);

    // Tạo khóa học từ thông tin playlist
    const course = new Course({
      title: playlistInfo.title,
      description: playlistInfo.description,
      price: 20, // Giá cố định hoặc có thể thay đổi
      instructor: INSTRUCTOR_ID,
      category: CATEGORY_ID,
      level: "Beginner",
      thumbnail: playlistInfo.thumbnail,
    });

    const savedCourse = await course.save();

    // Tạo bài học từ danh sách video
    const lessons = videos.map((video) => ({
      title: video.title,
      content: video.videoUrl,
      course: savedCourse._id,
    }));

    const savedLessons = await Lesson.insertMany(lessons);

    // Liên kết bài học với khóa học
    savedCourse.lessons = savedLessons.map((lesson) => lesson._id);
    await savedCourse.save();

    console.log("Course and lessons created successfully:", savedCourse);
    return savedCourse;
  } catch (error) {
    console.error("Error creating course with lessons:", error.message);
    throw error;
  }
}

// Export các hàm
export {
  fetchPlaylistInfo,
  fetchPlaylistItems,
  createCourseWithLessonsFromPlaylist,
};
