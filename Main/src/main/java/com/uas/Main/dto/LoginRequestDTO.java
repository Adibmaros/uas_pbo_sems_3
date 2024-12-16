package com.uas.Main.dto;

import lombok.Data;
import java.util.Date;
import java.util.Map;

@Data
public class LoginRequestDTO {
    private String username;
    private String password;
}
