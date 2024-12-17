import axios from "axios";
import { faker } from "@faker-js/faker";

// Hàm gửi yêu cầu POST
async function createUsers() {
  const users = Array.from({ length: 20 }, () => ({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }));

  for (const user of users) {
    try {
      const response = await axios.post("http://localhost:3000/users", user);
      console.log(user);
      console.log(`User created: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error("Error creating user:", error.message);
      console.error("Full error object:", error);
    }
  }
}

// Gọi hàm để tạo người dùng
createUsers();
