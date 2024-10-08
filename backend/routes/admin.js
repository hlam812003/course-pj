
import  addUser  from "../Controller/addUser.js";
import getAllUsers from "../Controller/getAllUser.js";
import getUserById from "../Controller/getUserById.js";
import updateUserById from "../Controller/updateUserById.js";
import deleteUserById from "../Controller/deleteUserById.js";
async function adminRoutes(fastify, options) {

    // Lấy tất cả người dùng
    fastify.get('/admin/users', getAllUsers);
  
    // Lấy thông tin người dùng theo ID
    fastify.get('/admin/users/:id', getUserById);
  
    // Thêm người dùng mới
    fastify.post('/admin/users', addUser);
  
    // Cập nhật thông tin người dùng theo ID
    fastify.put('/admin/users/:id', updateUserById);
  
    // Xóa người dùng theo ID
    fastify.delete('/admin/users/:id', deleteUserById);
  }
  
  export default adminRoutes;
  