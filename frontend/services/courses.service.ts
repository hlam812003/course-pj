import axios from "axios";

export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  __v: number;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  __v: number;
}

export interface Review {
  _id: string;
  user: User;
  course: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: string;
  __v: number;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  instructor: string | User;
  category: string | Category;
  level: string;
  status: string;
  thumbnail: string;
  lessons: string[];
  reviews: Review[];
  length: number;
  totalLength: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CoursesResponse {
  courses: Course[];
  totalPages: number;
  currentPage: number;
  totalCourses: number;
}

export interface GetCoursesParams {
  page?: number;
  limit?: number;
  category?: string;
  level?: string;
}

class CoursesService {
  private readonly API_URL = "http://localhost:3001";

  async getAllCourses(params?: GetCoursesParams): Promise<CoursesResponse> {
    const { data } = await axios.get(`${this.API_URL}/courses`, { params });
    return data;
  }

  async getCourseById(id: string): Promise<Course> {
    const { data } = await axios.get(`${this.API_URL}/courses/${id}`);
    return data;
  }

  async getCourseReviews(courseId: string): Promise<Review[]> {
    const { data } = await axios.get(`${this.API_URL}/reviews/course/${courseId}`);
    return data;
  }
}

export const coursesService = new CoursesService();