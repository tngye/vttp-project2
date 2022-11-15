package com.nus.iss.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nus.iss.server.models.Items;
import com.nus.iss.server.models.Response;
import com.nus.iss.server.services.ItemService;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

@RestController
@RequestMapping("/api/accommodation")
public class AccomsRestController {
    @Autowired
    ItemService iSvc;

    @Value("${api.key}")
    private String apiKey;

    // @GetMapping("/types")
    // public ResponseEntity<String> getTypes(){
    // JsonArray typesList = null;
    // try{
    // typesList = attSvc.getTypes();
    // }catch(Exception e){
    // e.printStackTrace();
    // }
    // return ResponseEntity.ok().body(typesList.toString());
    // }

    @GetMapping("/search")
    public ResponseEntity<String> search(@RequestParam String keyword, @RequestParam String nextToken) {
        System.out.println("keyword: " + apiKey);
        Response resp = new Response();
        JsonArrayBuilder ab = Json.createArrayBuilder();
        JsonObject dataObj = null;
        try {
            dataObj = iSvc.search(keyword, nextToken, "accommodation");
        } catch (Exception e) {
            e.printStackTrace();
        }

        // for(var o : dataObj.getJsonArray("data")){
        //     attList.add(o.toJson());
        // }
        Items i = new Items();
        ab = i.create(dataObj.getJsonArray("data"), apiKey);
        
        resp.setCode(dataObj.getJsonObject("status").getInt("code"));
        resp.setMessage("Search successful");
        resp.setData(ab.build().toString());
        resp.setNextToken(dataObj.getString("nextToken"));
        return ResponseEntity.status(HttpStatus.OK)
                .body(resp.toJson().toString());
    }
}
