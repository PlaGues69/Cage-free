package com.example.cagefree.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cagefree.Entity.User;
import com.example.cagefree.Pojo.AuthPojo;
import com.example.cagefree.Pojo.UserPojo;
import com.example.cagefree.Service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/save")
    public void save(@RequestBody UserPojo userPojo) {
        userService.saveData(userPojo);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getAll")
    public List<User> getAll() {
        return userService.getAllUsers();
    }



    @PostMapping("/login")
    public Integer login(@RequestBody AuthPojo request) {
        String username = request.getUsername();
        String password = request.getPassword();
        Integer userId = userService.login(username, password);
        return userId;
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody UserPojo userPojo) {
        return userService.updateUser(id, userPojo);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
