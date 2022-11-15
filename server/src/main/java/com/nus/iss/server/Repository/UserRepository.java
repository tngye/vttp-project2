package com.nus.iss.server.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.nus.iss.server.models.Favourites;
import com.nus.iss.server.models.User;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

import static com.nus.iss.server.Repository.Queries.*;

import java.io.IOException;
import java.sql.ResultSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {
    @Autowired
    private JdbcTemplate template;

    @Value("${api.key}")
    private String apiKey;

    public User findByUsername(String email) {
        // ResultSet rs = template.query(SQL_SELECT_USER, email);

        // if (rs.next()){
        // return User.convert(rs);
        // }else{
        // return null;
        // }

        return template.query(SQL_SELECT_USER,
                (ResultSet rs) -> {
                    if (!rs.next())
                        return null;
                    return User.convert(rs);
                },
                email);
    }

    public boolean save(User newUser) {
        int added = template.update(SQL_INSERT_USER, newUser.getUsername(), newUser.getPassword());
        return added > 0;
    }

    public Integer upload(MultipartFile myfile, String username) throws DataAccessException, IOException {
        int updated = template.update(SQL_INSERT_BLOB, myfile.getContentType(), myfile.getInputStream(), username);
        return updated;
    }

    public boolean addToFav(JsonObject body) {

        System.out.println("body: " + body);
        if (body.getString("type").equalsIgnoreCase("Attractions")) {
            JsonObject obj = body.getJsonObject("item");

            if (!checkFav(body.getString("username"), obj.getString("uuid"), body.getString("type"))) {
                int added = template.update(SQL_INSERT_FAV_ATTRACTION, body.getString("username"),
                        obj.getString("uuid"), obj.getString("name"), obj.getString("address"), obj.getString("img").substring(50, 85));
                return true;
            } else {
                int deleted = template.update(SQL_DELETE_FAV_ATTRACTION, body.getString("username"),
                        obj.getString("uuid"));
                return false;
            }
        } else if (body.getString("type").equalsIgnoreCase("Accommodations")) {
            JsonObject obj = body.getJsonObject("item");

            if (!checkFav(body.getString("username"), obj.getString("uuid"), body.getString("type"))) {
                int added = template.update(SQL_INSERT_FAV_ACCOMMODATION, body.getString("username"),
                        obj.getString("uuid"), obj.getString("name"), obj.getString("address"), obj.getString("img").substring(50, 85));
                return true;
            } else {
                int deleted = template.update(SQL_DELETE_FAV_ACCOMMODATION, body.getString("username"),
                        obj.getString("uuid"));
                return false;
            }
        } else {
            JsonObject obj = body.getJsonObject("item");

            if (!checkFav(body.getString("username"), obj.getString("uuid"), body.getString("type"))) {
                int added = template.update(SQL_INSERT_FAV_EVENT, body.getString("username"), obj.getString("uuid"),
                        obj.getString("name"), obj.getString("address"), obj.getString("img").substring(50, 85));
                return true;
            } else {
                int deleted = template.update(SQL_DELETE_FAV_EVENT, body.getString("username"), obj.getString("uuid"));
                return false;
            }
        }

    }

    public boolean checkFav(String username, String uuid, String type) {
        if (type.equals("Attractions")) {
            SqlRowSet rs = template.queryForRowSet(SQL_SELECT_CHECKFAV_ATTRACTION, username, uuid);
            while (rs.next()) {
                return true;
            }
            return false;
        } else if (type.equals("Accommodations")) {
            SqlRowSet rs = template.queryForRowSet(SQL_SELECT_CHECKFAV_ACCOMMODATION, username, uuid);
            while (rs.next()) {
                return true;
            }
            return false;
        } else {
            SqlRowSet rs = template.queryForRowSet(SQL_SELECT_CHECKFAV_EVENT, username, uuid);
            while (rs.next()) {
                return true;
            }
            return false;
        }

    }

    public JsonObject getFav(String username) {

        JsonArray attArr = getFavAttractions(username);
        JsonArray accArr = getFavAccommodations(username);
        JsonArray evArr = getFavEvents(username);

        JsonObject total = Json.createObjectBuilder()
                .add("attractions", attArr)
                .add("accommodations", accArr)
                .add("events", evArr)
                .build();
        return total;
    }

    public JsonArray getFavAttractions(String username) {
        SqlRowSet rs = template.queryForRowSet(SQL_SELECT_ALL_FAV_ATTRACTIONS, username);
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        while (rs.next()) {
            JsonObject obj = Favourites.createJsonArr(rs, apiKey);
            arrBuilder.add(obj);
        }
        return arrBuilder.build();
    }

    public JsonArray getFavAccommodations(String username) {
        SqlRowSet rs = template.queryForRowSet(SQL_SELECT_ALL_FAV_ACCOMMODATIONS, username);
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        while (rs.next()) {
            JsonObject obj = Favourites.createJsonArr(rs, apiKey);
            arrBuilder.add(obj);
        }
        return arrBuilder.build();
    }
    
    public JsonArray getFavEvents(String username) {
        SqlRowSet rs = template.queryForRowSet(SQL_SELECT_ALL_FAV_EVENTS, username);
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        while (rs.next()) {
            JsonObject obj = Favourites.createJsonArr(rs, apiKey);
            arrBuilder.add(obj);
        }
        return arrBuilder.build();
    }
}
