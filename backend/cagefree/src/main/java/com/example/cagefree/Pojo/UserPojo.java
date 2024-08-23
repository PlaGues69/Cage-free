package com.example.cagefree.Pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserPojo {
    private Long id;
    private String username;  // Renamed from name to username
    private String gender;
    private String address;
    private String password;  // Include password if needed for login or other operations
}
