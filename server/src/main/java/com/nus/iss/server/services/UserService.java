package com.nus.iss.server.services;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nus.iss.server.Repository.UserRepository;
import com.nus.iss.server.models.Favourites;
import com.nus.iss.server.models.User;

import jakarta.json.JsonObject;

@Service
public class UserService {

    @Autowired 
    private UserRepository uRepo;

    public User findByUsername(String username) {
        return uRepo.findByUsername(username);
    }

    public int upload(MultipartFile myfile, String username) throws DataAccessException, IOException{
        return uRepo.upload(myfile, username);
    }

    public boolean addtofav(JsonObject body) {
        return uRepo.addToFav(body);
    }
    public boolean checkFav(String username, String uuid, String type) {
        return uRepo.checkFav(username, uuid, type);
    }
    public JsonObject getFav(String username) {
        return uRepo.getFav(username);
    }


}
