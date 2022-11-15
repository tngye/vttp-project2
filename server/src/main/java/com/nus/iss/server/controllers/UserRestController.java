package com.nus.iss.server.controllers;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nus.iss.server.models.User;
import com.nus.iss.server.security.JwtRequest;
import com.nus.iss.server.services.AuthenticationService;
import com.nus.iss.server.services.EmailService;
import com.nus.iss.server.services.UserService;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@RestController
@RequestMapping("/user")
public class UserRestController {

    @Autowired
    private UserService uSvc;

    @Autowired
    private AuthenticationService aSvc;

    @Autowired
    private EmailService eSvc;

    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> postUpload(@RequestPart MultipartFile myfile, HttpServletRequest request) {

        try {
            String username = aSvc.getUsername(request);
            int updated = uSvc.upload(myfile, username);

            System.out.printf("updated: %d\n", updated);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        JsonObject data = Json.createObjectBuilder()
                .add("content-type", myfile.getContentType())
                .add("name", myfile.getName())
                .add("original_name", myfile.getOriginalFilename())
                .add("size", myfile.getSize())
                .build();

        return ResponseEntity.ok(data.toString());
    }

    @GetMapping(path = "/getphoto")
    public ResponseEntity<byte[]> getPhoto(@RequestParam String username) {
        User u = new User();
        try {
            u = uSvc.findByUsername(username);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("tesdt:" + u.getMediaType());

        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.parseMediaType(u.getMediaType()))
                .body(u.getContent());
    }

    @PutMapping(path = "/addtofav", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addToFav(@RequestBody String payload) {
        JsonObject body;
        try (InputStream is = new ByteArrayInputStream(payload.getBytes())) {
            JsonReader reader = Json.createReader(is);
            body = reader.readObject();
        } catch (Exception ex) {
            body = Json.createObjectBuilder().add("error", ex.getMessage()).build();
            return ResponseEntity.internalServerError().body(body.toString());
        }

        System.out.println(">>>>>> body:" + body);

        Boolean addOrDelete = uSvc.addtofav(body);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(addOrDelete.toString());
    }

    @GetMapping(path = "/checkfav")
    public ResponseEntity<String> checkfav(@RequestParam String username, @RequestParam String uuid,
            @RequestParam String type) {

        System.out.println(">>>>>> body:" + username);
        Boolean checkfav = uSvc.checkFav(username, uuid, type);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(checkfav.toString());
    }

    @GetMapping(path = "/getfav")
    public ResponseEntity<String> getfav(@RequestParam String username) {

        System.out.println(">>>>>> body:" + username);
        JsonObject obj = uSvc.getFav(username);
        System.out.println(">>>>>> obj3:" + obj);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(obj.toString());

    }

    // @PostMapping(path = "/send")
    // public ResponseEntity<String> sendEmail(@RequestBody String payload) throws
    // IOException, MessagingException {

    // JsonObject body;
    // try (InputStream is = new ByteArrayInputStream(payload.getBytes())) {
    // JsonReader reader = Json.createReader(is);
    // body = reader.readObject();
    // } catch (Exception ex) {
    // body = Json.createObjectBuilder().add("error", ex.getMessage()).build();
    // return ResponseEntity.internalServerError().body(body.toString());
    // }

    // System.out.println(">>>>>> body:" + body);
    // // JSONArray test = body.getJsonArray("attractions").toString();
    // File file = new File("fromJSON.csv");
    // String csv =
    // body.getJsonObject("workbook").getJsonArray("attractions").toString();
    // ;
    // FileUtils.writeStringToFile(file, csv);
    // System.out.println("file" + file.toString());

    // MimeMessage message = emailSender.createMimeMessage();

    // MimeMessageHelper helper = new MimeMessageHelper(message, true);

    // helper.setFrom("noreply@baeldung.com");
    // helper.setTo("tngyeefong@gmail.com");
    // helper.setSubject("test");
    // helper.setText("test");

    // FileSystemResource filetosend = new FileSystemResource(file);
    // helper.addAttachment("Favourites", file);

    // emailSender.send(message);
    // return null;
    // }

    @PostMapping(path = "/send")
    public ResponseEntity<String> sendEmail(@RequestPart MultipartFile myfile, HttpServletRequest request)
            throws IOException, MessagingException {

        String email = aSvc.getUsername(request);
        // JsonObject body;
        // try (InputStream is = new ByteArrayInputStream(payload.getBytes())) {
        // JsonReader reader = Json.createReader(is);
        // body = reader.readObject();
        // } catch (Exception ex) {
        // body = Json.createObjectBuilder().add("error", ex.getMessage()).build();
        // return ResponseEntity.internalServerError().body(body.toString());
        // }
        File convFile = new File("Favourites.pdf");
        convFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(myfile.getBytes());
        // System.out.println(">>>>>> body:" + body);
        // // JSONArray test = body.getJsonArray("attractions").toString();
        File file = new File("Favourites.pdf");
        // String csv =
        // body.getJsonObject("workbook").getJsonArray("attractions").toString();
        // ;
        // FileUtils.writeStringToFile(file, csv);
        // System.out.println("file" + file.toString());
        myfile.transferTo(file);

        try {
            Boolean send = eSvc.send(convFile, email);

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(send.toString());
        } catch (Exception e) {
            return null;
        }
    }

}
