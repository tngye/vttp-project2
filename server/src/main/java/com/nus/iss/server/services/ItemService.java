package com.nus.iss.server.services;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.nus.iss.server.models.Items;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class ItemService {

    @Value("${api.key}")
    private String apiKey;

    final String baseUrl = "https://tih-api.stb.gov.sg/content/v1/";

    public JsonArray getTypes() throws IOException {
        String url = UriComponentsBuilder.fromUriString(baseUrl)
                .path("types")
                .queryParam("language", "en")
                .queryParam("apikey", apiKey)
                .toUriString();

        RequestEntity req = RequestEntity.get(url).build();

        RestTemplate template = new RestTemplate();
        ResponseEntity<String> resp = null;
        try {
            resp = template.exchange(req, String.class);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        JsonArray dataArr = null;

        try (InputStream is = new ByteArrayInputStream(resp.getBody().getBytes())) {
            JsonReader reader = Json.createReader(is);
            JsonObject dataObj = reader.readObject();
            dataArr = dataObj.getJsonArray("data");
            System.out.println("data" + dataArr);
        }

        // List<String> typesList = new ArrayList<String>();

        // for(var c : dataArr){
        // typesList.add(c.toString());
        // }

        return dataArr;

    }

    public JsonObject search(String keyword, String nextToken, String type) throws IOException {
        String url = null;
        if (nextToken.equals("")) {
            url = UriComponentsBuilder.fromUriString(baseUrl)
                    .path(type)
                    .path("/search")
                    .queryParam("language", "en")
                    .queryParam("apikey", apiKey)
                    .queryParam("keyword", keyword)
                    .toUriString();

        } else {
            url = UriComponentsBuilder.fromUriString(baseUrl)
                    .path(type)
                    .path("/search")
                    .queryParam("language", "en")
                    .queryParam("apikey", apiKey)
                    .queryParam("keyword", keyword)
                    .queryParam("nextToken", nextToken)
                    .toUriString();

        }

        System.out.println("test: "+ url);

        RequestEntity req = RequestEntity.get(url).build();

        RestTemplate template = new RestTemplate();
        ResponseEntity<String> resp = null;
        try {
            resp = template.exchange(req, String.class);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        JsonObject dataObj;

        try (InputStream is = new ByteArrayInputStream(resp.getBody().getBytes())) {
            JsonReader reader = Json.createReader(is);
            dataObj = reader.readObject();
            // dataArr = dataObj.getJsonArray("data");
            // attList = Attraction.create(dataArr);
            // System.out.println("data" + dataObj);
        }
        return dataObj;
    }
}
