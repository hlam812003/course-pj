import axios from "axios";

const categories = [
  {
    name: "Web Development",
    description: "Resources for building websites and web applications.",
  },
  {
    name: "Data Science",
    description: "Learning materials for data analysis and machine learning.",
  },
  {
    name: "Cybersecurity",
    description: "Courses and guides on information security.",
  },
  {
    name: "DevOps",
    description: "Best practices for development and operations.",
  },
  {
    name: "Cloud Computing",
    description: "Guides and resources on cloud services.",
  },
];

async function createCategories() {
  try {
    for (const category of categories) {
      const response = await axios.post(
        "http://localhost:3000/categories",
        category
      );
      console.log("Category created:", response.data);
    }
  } catch (error) {
    console.log(error);
    console.error(
      "Error creating category:",
      error.response?.data || error.message
    );
  }
}

createCategories();
