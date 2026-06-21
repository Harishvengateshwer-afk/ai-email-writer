package com.harish.aiemailwriter.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class OpenRouterService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    private final WebClient webClient = WebClient.create();

    public String generateEmail(String prompt) {

        String requestBody = """
        {
        "model": "deepseek/deepseek-chat",
        "messages": [
            {
            "role": "user",
            "content": "%s"
            }
            ]
        }
        """.formatted(prompt.replace("\"", "\\\""));

        try {

            String response = webClient.post()
                    .uri("https://openrouter.ai/api/v1/chat/completions")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .header("HTTP-Referer", "http://localhost:8080")
                    .header("X-Title", "AI Email Writer")
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            ObjectMapper mapper = new ObjectMapper();

            JsonNode root = mapper.readTree(response);

            String generatedEmail =
                    root.path("choices")
                        .get(0)
                        .path("message")
                        .path("content")
                        .asText();

            return generatedEmail;

        } catch (Exception e) {

            e.printStackTrace();

            return "ERROR: " + e.getMessage();
        }
    }
}