package com.example.cagefree.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Void> save(@RequestBody UserPojo userPojo) {
        try {
            userService.saveData(userPojo);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getById/{userId}")
    public ResponseEntity<UserPojo> getUserById(@PathVariable Long userId) {
        try {
            UserPojo userPojo = userService.getUserById(userId);
            if (userPojo == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(userPojo);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<UserPojo>> getAll() {
        try {
            List<UserPojo> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Long> login(@RequestBody AuthPojo request) {
        try {
            String username = request.getUsername();
            String password = request.getPassword();
            UserPojo userPojo = userService.login(username, password);
    
            if (userPojo != null) {
                return ResponseEntity.ok(userPojo.getId());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserPojo> updateUser(@PathVariable Long id, @RequestBody UserPojo userPojo) {
        try {
            UserPojo updatedUser = userService.updateUser(id, userPojo);
            if (updatedUser == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            if (userService.deleteUser(id)) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
