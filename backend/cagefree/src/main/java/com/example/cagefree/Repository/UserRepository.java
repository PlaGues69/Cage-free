package com.example.cagefree.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.cagefree.Entity.UserTable;

public interface UserRepository extends JpaRepository<UserTable, Long> {

    @Query("SELECT u FROM UserTable u WHERE u.username = :username AND u.password = :password")
    UserTable findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
}
