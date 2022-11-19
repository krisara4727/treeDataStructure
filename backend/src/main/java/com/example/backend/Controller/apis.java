package com.example.backend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class apis {
    @GetMapping("/")
    public String helloworld() {
        return "hello world";
    }
}
