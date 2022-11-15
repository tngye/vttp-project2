package com.nus.iss.server.models;

public class Review {
    
    private String text;
    private Float rating;
    private String authorname;
    private String profilepic;
    
    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    public Float getRating() {
        return rating;
    }
    public void setRating(Float rating) {
        this.rating = rating;
    }
    public String getAuthorname() {
        return authorname;
    }
    public void setAuthorname(String authorname) {
        this.authorname = authorname;
    }
    public String getProfilepic() {
        return profilepic;
    }
    public void setProfilepic(String profilepic) {
        this.profilepic = profilepic;
    }


    
}
