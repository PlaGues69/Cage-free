package com.example.cagefree.Service.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cagefree.Entity.UserTable;
import com.example.cagefree.Pojo.UserPojo;
import com.example.cagefree.Repository.UserRepository;
import com.example.cagefree.Service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void saveData(UserPojo userPojo) {
        UserTable user = new UserTable();
        user.setId(userPojo.getId());
        user.setUsername(userPojo.getUsername());
        user.setPassword(userPojo.getPassword());
        user.setGender(userPojo.getGender());
        user.setAddress(userPojo.getAddress());
        userRepository.save(user);
    }

    @Override
    public List<UserPojo> getAllUsers() {
        try {
            return userRepository.findAll().stream().map(this::convertToPojo).toList();
        } catch (Exception e) {
            System.err.println("Error fetching all users: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error fetching all users", e);
        }
    }

    @Override
    public UserPojo getUserById(Long id) {
        UserTable user = userRepository.findById(id).orElse(null);
        return user != null ? convertToPojo(user) : null;
    }

    @Override
    public UserPojo login(String username, String password) {
        UserTable user = userRepository.findByUsernameAndPassword(username, password);
        return user != null ? convertToPojo(user) : null;
    }

    @Override
    public UserPojo updateUser(Long id, UserPojo userPojo) {
        UserTable existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setUsername(userPojo.getUsername());
            existingUser.setPassword(userPojo.getPassword());
            existingUser.setGender(userPojo.getGender());
            existingUser.setAddress(userPojo.getAddress());
            return convertToPojo(userRepository.save(existingUser));
        }
        return null;
    }

    @Override
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private UserPojo convertToPojo(UserTable user) {
        UserPojo userPojo = new UserPojo();
        userPojo.setId(user.getId());
        userPojo.setUsername(user.getUsername());
        userPojo.setPassword(user.getPassword());
        userPojo.setGender(user.getGender());
        userPojo.setAddress(user.getAddress());
        return userPojo;
    }
}
