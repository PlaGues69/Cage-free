package com.example.cagefree.Service.ServiceImpl;

import com.example.cagefree.Entity.User;
import com.example.cagefree.Pojo.UserPojo;
import com.example.cagefree.Repository.UserRepository;
import com.example.cagefree.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void saveData(UserPojo userPojo) {
        User user = new User();
        user.setId(userPojo.getId());
        user.setUsername(userPojo.getName());
        user.setPassword(userPojo.getPassword());
        user.setGender(userPojo.getGender());
        user.setAddress(userPojo.getAddress());
        userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public Integer login(String username, String password) {
        return userRepository.getUserIdfromPwordAndUname(username, password);
    }



    @Override
    public User updateUser(Long id, UserPojo userPojo) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setUsername(userPojo.getName());
            existingUser.setPassword(userPojo.getPassword());
            existingUser.setGender(userPojo.getGender());
            existingUser.setAddress(userPojo.getAddress());
            return userRepository.save(existingUser);
        }
        return null;
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    private UserPojo convertToPojo(User user) {
        UserPojo userPojo = new UserPojo();
        userPojo.setId(user.getId());
        userPojo.setName(user.getUsername());
        userPojo.setPassword(user.getPassword());
        userPojo.setGender(user.getGender());
        userPojo.setAddress(user.getAddress());
        return userPojo;
    }
}