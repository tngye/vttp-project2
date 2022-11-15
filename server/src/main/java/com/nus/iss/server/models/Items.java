package com.nus.iss.server.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

public class Items {

    private String uuid;
    private String name;
    private String img;
    private String company;
    private Float rating;
    private String description;
    private Review[] reviews;

    private String nextToken;

    public JsonArrayBuilder create(JsonArray dataArr, String apiKey) {
        final String imgUrl = "https://tih-api.stb.gov.sg/media/v1/download/uuid/";
        JsonArrayBuilder ab = Json.createArrayBuilder();

        for (var o : dataArr) {
            String imgUUID = null;
            JsonArrayBuilder imgListBuilder = Json.createArrayBuilder();
            try {
                imgUUID = o.asJsonObject().getJsonArray("thumbnails").getJsonObject(0).getString("uuid");
            } catch (Exception e) {
                imgUUID = null;
            }
            JsonArray imgs = o.asJsonObject().getJsonArray("images");
            try {
                for (Integer i = 0; i <imgs.size(); i++) {
                    System.out.println("i: " + i);
                    System.out.println("hi: " + imgs.getJsonObject(i).getString("uuid"));
                    imgListBuilder.add(Json.createObjectBuilder()
                            .add("img", imgUrl + imgs.getJsonObject(i).getString("uuid") + "?apikey=" + apiKey
                                    + "&fileType=Default"));
                }
            } catch (Exception e) {
                imgListBuilder = null;
            }
            String address;
            try{
                JsonObject add = o.asJsonObject().getJsonObject("address");
                address = add.getString("buildingName") + " " + add.getString("block") + " " + add.getString("streetName") + " Singapore " + add.getString("postalCode");
            }catch(Exception e){
                address = null;
            }
          if(o.asJsonObject().containsKey("reviews")){
            ab.add(Json.createObjectBuilder()
                    .add("uuid", o.asJsonObject().getString("uuid"))
                    .add("name", o.asJsonObject().getString("name"))
                    .add("company", o.asJsonObject().getString("companyDisplayName"))
                    .add("rating", o.asJsonObject().getInt("rating"))
                    .add("description", o.asJsonObject().getString("body"))
                    .add("reviews",  o.asJsonObject().getJsonArray("reviews"))
                    .add("address", address)
                    .add("img", imgUrl + imgUUID + "?apikey=" + apiKey + "&fileType=Default")
                    .add("imgList", imgListBuilder.build()));
          }else{
            ab.add(Json.createObjectBuilder()
            .add("uuid", o.asJsonObject().getString("uuid"))
            .add("name", o.asJsonObject().getString("name"))
            .add("company", o.asJsonObject().getString("companyDisplayName"))
            .add("rating", o.asJsonObject().getInt("rating"))
            .add("description", o.asJsonObject().getString("body"))
            // .add("reviews",  o.asJsonObject().getJsonArray("reviews"))
            .add("address", address)
            .add("img", imgUrl + imgUUID + "?apikey=" + apiKey + "&fileType=Default")
            .add("imgList", imgListBuilder.build()));
          }
        }
        return ab;
    }
}
