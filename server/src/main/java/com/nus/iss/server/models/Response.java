package com.nus.iss.server.models;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Response {
    private int code = 0;
    private String message = "";
    private String nextToken;
    private String data = "{}";
    public int getCode() {
        return code;
    }
    public void setCode(int code) {
        this.code = code;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getData() {
        return data;
    }
    public void setData(String data) {
        this.data = data;
    }
    public String getNextToken() {
        return nextToken;
    }
    public void setNextToken(String nextToken) {
        this.nextToken = nextToken;
    }
    public JsonObject toJson() {
        return Json.createObjectBuilder()
            .add("code", code)
            .add("message", message)
            .add("data", data)
            .add("nextToken", nextToken)
            .build();
    }
 

    
}
