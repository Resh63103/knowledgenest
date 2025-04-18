package com.knowledgenest.controller;

import com.knowledgenest.entity.User;
import com.knowledgenest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 全ユーザー取得
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ID指定でユーザー取得
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id);
    }

    // ユーザー登録
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // ユーザー更新
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUserName(updatedUser.getUserName());
                    user.setPassword(updatedUser.getPassword());
                    return userRepository.save(user);
                })
                .orElseGet(() -> {
                    updatedUser.setUserId(id);
                    return userRepository.save(updatedUser);
                });
    }

    // ユーザー削除
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
