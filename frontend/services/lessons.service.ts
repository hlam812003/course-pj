import axios from "axios";
import Cookies from "js-cookie";

export interface Lesson {
  _id: string;
  title: string;
  content: string;
  course: {
    _id: string;
    title: string;
    description: string;
    price: number;
  };
  length: string;
  createdAt: string;
  __v: number;
}

export interface LessonsResponse {
  lessons: Lesson[];
  pagination: {
    totalLessons: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

class LessonsService {
  private readonly API_URL = "http://localhost:3001";

  private getConfig() {
    const token = Cookies.get("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  async getLessonsByCourseId(courseId: string): Promise<LessonsResponse> {
    const { data } = await axios.get(
      `${this.API_URL}/lessons/course/${courseId}`,
      this.getConfig()
    );
    return data;
  }
}

export const lessonsService = new LessonsService(); 