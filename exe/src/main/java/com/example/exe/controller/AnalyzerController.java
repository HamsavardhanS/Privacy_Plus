package com.example.exe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.exe.model.PrivacyResponse;
import com.example.exe.service.LLMService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/analyzer")
@CrossOrigin(origins = "*")
public class AnalyzerController {
    @Autowired
    private LLMService llmservice;

    @GetMapping("/analyze")
    public PrivacyResponse analyzeSite(@RequestParam String url){
        return llmservice.analyzeURL(url)
                .block(); // Blocking for simplicity, consider using reactive patterns in production
    }
}
