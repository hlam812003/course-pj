import axios from "axios";
import Cookies from "js-cookie";
import { Course } from "./courses.service";

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
  enrolledAt: string;
  status: string;
}

export interface EnrollmentResponse {
  message: string;
  enrollment: Enrollment;
}

export interface EnrolledCourse {
  _id: string;
  user: string;
  course: {
    _id: string;
    title: string;
    thumbnail: string;
    category: string | { name: string };
    level: string;
    totalLength: string;
  };
  enrolledAt: string;
}

export interface TopCourse {
  enrollmentCount: number;
  courseDetails: Course;
  courseId: string;
}

class EnrollmentService {
  private readonly API_URL = "http://localhost:3001";

  private getConfig() {
    const token = Cookies.get("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  async enrollCourse(courseId: string): Promise<EnrollmentResponse> {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const { data } = await axios.post<EnrollmentResponse>(
        `${this.API_URL}/enrollments`,
        {
          user: user._id,
          course: courseId
        },
        this.getConfig()
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to enroll in course';
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  async getUserEnrollments(): Promise<EnrolledCourse[]> {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const { data } = await axios.get(
        `${this.API_URL}/enrollments/user/${user._id}`,
        this.getConfig()
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch enrollments');
      }
      throw error;
    }
  }

  async checkEnrollmentStatus(courseId: string): Promise<boolean> {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const { data } = await axios.get(
        `${this.API_URL}/enrollments/user/${user._id}`,
        this.getConfig()
      );
      return data.some((enrollment: EnrolledCourse) => enrollment.course._id === courseId);
    } catch (error) {
      return false;
    }
  }

  async getTopCourses(limit: number = 6): Promise<TopCourse[]> {
    const response = await axios.get(`${this.API_URL}/enrollments/top/${limit}`);
    return response.data;
  }
}

export const enrollmentService = new EnrollmentService(); 