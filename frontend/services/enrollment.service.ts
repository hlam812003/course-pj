import axios from "axios";
import Cookies from "js-cookie";

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
}

export const enrollmentService = new EnrollmentService(); 