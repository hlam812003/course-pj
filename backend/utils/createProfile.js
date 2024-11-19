import { User } from "../models/user";
const sampleUser = await User.findOne({ _id: "673b78aa2f5714c66ade522e" });
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
