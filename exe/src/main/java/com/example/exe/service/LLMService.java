package com.example.exe.service;

import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.exe.model.PrivacyResponse;

import reactor.core.publisher.Mono;

@Service
public class LLMService {
    
    @Value("${together.api.key}")
    private String apiKey;

    public Mono<PrivacyResponse> analyzeURL(String url) {
        String prompt = "Analyze the privacy and security risks of this website: " + url +
                        ". Provide a privacy score from 0 to 100 and 3 improvement suggestions.";

        WebClient webClient = WebClient.builder()
                .baseUrl("https://api.together.xyz/v1/chat/completions")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .build();

        Map<String, Object> request = Map.of(
            "model", "mistralai/Mixtral-8x7B-Instruct-v0.1",
            "messages", List.of(
                Map.of("role", "user", "content", prompt)
            )
        );

        return webClient.post()
            .bodyValue(request)
            .retrieve()
            .bodyToMono(Map.class)
            .map(resp -> {
                String content = ((Map)((List)resp.get("choices")).get(0)).get("message").toString();
                // Dummy parsing: You can enhance this logic
                PrivacyResponse response = new PrivacyResponse();
                response.setScore(new Random().nextInt(100));
                response.setSuggestions(List.of(
                    "Check for third-party trackers.",
                    "SSL not configured properly.",
                    "Site requests clipboard access."
                ));
                return response;
            });
    }

}
