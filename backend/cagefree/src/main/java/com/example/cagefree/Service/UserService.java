package com.example.cagefree.Service;

import java.util.List;

import com.example.cagefree.Pojo.UserPojo;

public interface UserService {
    void saveData(UserPojo userPojo);
    List<UserPojo> getAllUsers();
    UserPojo getUserById(Long id);
    UserPojo login(String username, String password);
    UserPojo updateUser(Long id, UserPojo userPojo);
    boolean deleteUser(Long id);
}
