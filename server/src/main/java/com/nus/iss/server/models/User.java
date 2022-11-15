package com.nus.iss.server.models;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class User {
    private String username;
    private String password;
    private byte[] content;
    private String mediaType;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] b) {
        this.content = b;
    }

    
    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    public static User convert(ResultSet rs) throws SQLException {
        User u = new User();
        u.setUsername(rs.getString("email"));
        u.setPassword(rs.getString("password"));
        u.setContent(rs.getBytes("pic"));
        u.setMediaType(rs.getString("media_type"));
        return u;
    }

    // public JsonObject toJson() {
    //     return Json.createObjectBuilder()
    //         .add("email", username)
    //         .add("content", Base64.encodeBase64String(content))
    //         .build();
    // }


}
