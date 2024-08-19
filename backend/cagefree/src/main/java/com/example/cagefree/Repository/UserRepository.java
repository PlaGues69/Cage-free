package com.example.cagefree.Repository;

import com.example.cagefree.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    @Query(nativeQuery = true,value = "select * from users where username=?1 and password=?2")
    Integer getUserIdfromPwordAndUname(String username, String password);


}