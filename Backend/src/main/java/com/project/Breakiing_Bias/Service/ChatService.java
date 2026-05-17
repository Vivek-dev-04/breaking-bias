package com.project.Breakiing_Bias.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.Breakiing_Bias.DTO.Article;
import com.project.Breakiing_Bias.DTO.ChatResponse;
import com.project.Breakiing_Bias.DTO.NewsResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {
    @Autowired
    private NewsService newsService;
    private ChatClient client;

    public ChatService(ChatClient.Builder builder) {
        this.client = builder.build();
    }

    public String analyze(String newsText) {
        NewsResponse response = newsService.fetchNews(newsText);

        // ← handle empty articles
        if (response.getArticles() == null || response.getArticles().isEmpty()) {
            System.out.println("=== NO ARTICLES FOUND, using general knowledge ===");
            return analyzeWithoutArticles(newsText);
        }

        ObjectMapper mapper = new ObjectMapper();
        List<Map<String, String>> list = new ArrayList<>();
        for (Article a : response.getArticles()) {
            Map<String, String> m = new HashMap<>();
            m.put("title", safe(a.getTitle()));
            m.put("description", safe(a.getDescription()));
            m.put("content", safe(a.getContent()));
            m.put("author", safe(a.getAuthor()));
            m.put("source", a.getSource() != null ? safe(a.getSource().getName()) : "");
            m.put("publishedAt", safe(a.getPublishedAt()));
            m.put("url", safe(a.getUrl()));
            list.add(m);
        }

        String json = "";
        try {
            json = mapper.writeValueAsString(list);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        System.out.println(json);

        return client.prompt(
                        "You are a STRICT news fact-checking AI. Your ONLY job is to verify if the claim is TRUE or FALSE.\n\n" +
                                "CLAIM TO VERIFY: " + newsText + "\n\n" +
                                "CURRENT NEWS ARTICLES FOR CONTEXT:\n" + json + "\n\n" +
                                "STRICT RULES - FOLLOW EXACTLY:\n" +
                                "1. NEVER assume a claim is true just because it is stated confidently\n" +
                                "2. ALWAYS cross-check names, positions, titles, dates, and numbers\n" +
                                "3. If a person is claimed to hold a position (CM, PM, CEO, President etc.) " +
                                "verify if they ACTUALLY hold that position\n" +
                                "4. If articles CONTRADICT the claim → FAKE or MISLEADING\n" +
                                "5. If articles SUPPORT the claim → REAL\n" +
                                "6. If articles are UNRELATED → use your own verified knowledge\n" +
                                "7. Scientific facts, historical facts, geographical facts must be verified strictly\n" +
                                "8. Statistical claims (percentages, numbers) must be checked against known data\n" +
                                "9. If a claim mixes true and false information → PARTIALLY_TRUE\n" +
                                "10. Only use UNCERTAIN if you genuinely cannot verify with any available information\n\n" +
                                "VERIFICATION CHECKLIST:\n" +
                                "- Is the person real? ✓\n" +
                                "- Does the person hold the claimed position? ✓\n" +
                                "- Is the event/fact described accurate? ✓\n" +
                                "- Are the numbers/dates/statistics correct? ✓\n" +
                                "- Does any evidence contradict the claim? ✓\n\n" +
                                "Return ONLY valid JSON with no markdown:\n" +
                                "{\n" +
                                "  \"classification\": \"REAL | FAKE | PARTIALLY_TRUE | UNCERTAIN | MISLEADING\",\n" +
                                "  \"confidence\": 0-100,\n" +
                                "  \"facts\": [\"verified facts that support or contradict the claim\"],\n" +
                                "  \"reason\": \"clear explanation of why the claim is true or false\",\n" +
                                "  \"indicators\": [\"specific evidence or red flags supporting the verdict\"]\n" +
                                "}\n"
                )
                .call()
                .content()
                .replace("```json", "")
                .replace("```", "")
                .trim();
    }

    // ← fallback when no articles found

        private String analyzeWithoutArticles(String newsText) {
            return client.prompt(
                            "You are a STRICT news fact-checking AI. Your ONLY job is to verify if the claim is TRUE or FALSE.\n\n" +
                                    "CLAIM TO VERIFY: " + newsText + "\n\n" +
                                    "No news articles found. Use your training knowledge strictly.\n\n" +
                                    "STRICT RULES - FOLLOW EXACTLY:\n" +
                                    "1. NEVER assume a claim is true just because it is stated confidently\n" +
                                    "2. ALWAYS cross-check names, positions, titles, dates and numbers\n" +
                                    "3. If a person is claimed to hold a position (CM, PM, CEO, President etc.) " +
                                    "verify if they ACTUALLY hold that position right now\n" +
                                    "4. Scientific facts, historical facts must be verified strictly\n" +
                                    "5. Statistical claims must be checked against known data\n" +
                                    "6. If a claim mixes true and false information → PARTIALLY_TRUE\n" +
                                    "7. Only use UNCERTAIN if you genuinely cannot verify\n\n" +
                                    "VERIFICATION CHECKLIST:\n" +
                                    "- Is the person real? ✓\n" +
                                    "- Does the person actually hold the claimed position? ✓\n" +
                                    "- Is the event/fact described accurate? ✓\n" +
                                    "- Are numbers/dates/statistics correct? ✓\n" +
                                    "- Does any known fact contradict the claim? ✓\n\n" +
                                    "Return ONLY valid JSON with no markdown:\n" +
                                    "{\n" +
                                    "  \"classification\": \"REAL | FAKE | PARTIALLY_TRUE | UNCERTAIN | MISLEADING\",\n" +
                                    "  \"confidence\": 0-100,\n" +
                                    "  \"facts\": [\"key verified facts about the claim\"],\n" +
                                    "  \"reason\": \"clear explanation of why the claim is true or false\",\n" +
                                    "  \"indicators\": [\"specific evidence supporting the verdict\"]\n" +
                                    "}\n"
                    )
                    .call()
                    .content()
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();
        }
    private String safe(String s) {
        return s != null ? s : "";
    }
}