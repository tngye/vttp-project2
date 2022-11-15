package com.nus.iss.server.models;

import java.util.LinkedList;
import java.util.List;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

public class Favourites {
    private Integer id;
    private String email;
    private String uuid;
    private String name;
    private String img;
    
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getUuid() {
        return uuid;
    }
    public void setUuid(String uuid) {
        this.uuid = uuid;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getImg() {
        return img;
    }
    public void setImg(String img) {
        this.img = img;
    }
    public static JsonObject createJsonArr(SqlRowSet rs, String apiKey) {
        final String imgUrl = "https://tih-api.stb.gov.sg/media/v1/download/uuid/";
        JsonObject obj = Json.createObjectBuilder()
        .add("id", rs.getInt("id"))
        .add("email", rs.getString("email"))
        .add("uuid", rs.getString("uuid"))
        .add("name", rs.getString("name"))
        .add("address", rs.getString("address"))
        .add("img", imgUrl + rs.getString("imgUUID") + "?apikey=" + apiKey + "&fileType=Default")
        .build();
        
        return obj;
    }

    
}
