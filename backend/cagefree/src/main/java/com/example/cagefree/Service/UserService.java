package com.example.cagefree.Service;

import com.example.cagefree.Entity.User;
import com.example.cagefree.Pojo.UserPojo;

import java.util.List;

public interface UserService {
    void saveData(UserPojo userPojo);
    List<User> getAllUsers();
    User getUserById(Long id);
    Integer login(String username, String password);
    User updateUser(Long id, UserPojo userPojo);
    void deleteUser(Long id);
}