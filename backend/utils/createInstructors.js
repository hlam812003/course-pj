import axios from "axios";
import { User } from "../models/user.js";
const YOUTUBE_API_KEY = "AIzaSyBKfyFU9dcPao9rgpUKeBV53x8jooCDJAw";

const YOUTUBE_CHANNEL_ID = "UCGwuxdEeCf0TIA2RbPOj-8g"; // TechWorldwithNana Channel ID

async function createInstructor() {
  try {
    // 1. Fetch channel data from YouTube API
    const channelResponse = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );

    const channelData = channelResponse.data.items[0].snippet;

    // 2. Create user data
    const userData = {
      username: channelData.customUrl.replace("@", ""),
      password: "your_password", // Replace with a secure password
      email: `${channelData.customUrl.replace("@", "")}@example.com`, // Replace with a valid email
      role: "instructor",
    };

    // 3. POST request to /register
    const userResponse = await axios.post(
      "http://localhost:3000/register",
      userData
    );
    const createdUser = userResponse.data;
    // Get the user userWithId = User.findOne(createdUser._id);
    const sampleUser = await User.findOne({ username: userData.username });
    //4. Create instructor profile data
    try {
      const instructorProfileData = {
        user: sampleUser._id,
        bio: channelData.description,
        expertise: ["Technology", "Programming"], // Adjust based on channel content
        profilePicture: channelData.thumbnails.default.url,
        socialLinks: {
          youtube: `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`,
        },
      };

      // 5. POST request to /instructorProfiles
      await axios.post(
        "http://localhost:3000/instructorProfiles",
        instructorProfileData
      );
    } catch (e) {
      console.log(e.message);
    }

    console.log("Instructor created successfully!");
  } catch (error) {
    console.error("Error creating instructor:", error);
  }
}

createInstructor();
