package com.nus.iss.server.Repository;

public interface Queries {
    
    public static final String SQL_SELECT_USER = 
    "select * from users where email= ?";

    public static final String SQL_INSERT_USER = 
    "insert into users (email, password) values (?, ?)";

    public static final String SQL_INSERT_BLOB = 
    "update users set media_type = ?, pic = ? where email = ?";

    public static final String SQL_INSERT_FAV_ATTRACTION = 
    "insert into usersfavattraction (email, uuid, name, address, imguuid) values (?, ?, ?, ?, ?)";

    public static final String SQL_SELECT_CHECKFAV_ATTRACTION = 
    "select * from usersfavattraction where email=? and uuid= ?";

    public static final String SQL_DELETE_FAV_ATTRACTION = 
    "delete from usersfavattraction where email=? and uuid= ?";

    public static final String SQL_SELECT_ALL_FAV_ATTRACTIONS =
    "select * from usersfavattraction where email = ?";


    public static final String SQL_INSERT_FAV_ACCOMMODATION = 
    "insert into usersfavaccommodation (email, uuid, name, address, imguuid) values (?, ?, ?, ?, ?)";

    public static final String SQL_SELECT_CHECKFAV_ACCOMMODATION = 
    "select * from usersfavaccommodation where email=? and uuid= ?";

    public static final String SQL_DELETE_FAV_ACCOMMODATION = 
    "delete from usersfavaccommodation where email=? and uuid= ?";

    public static final String SQL_SELECT_ALL_FAV_ACCOMMODATIONS =
    "select * from usersfavaccommodation where email = ?";

    public static final String SQL_INSERT_FAV_EVENT = 
    "insert into usersfavevent (email, uuid, name, address, imguuid) values (?, ?, ?, ?, ?)";

    public static final String SQL_SELECT_CHECKFAV_EVENT = 
    "select * from usersfavevent where email=? and uuid= ?";

    public static final String SQL_DELETE_FAV_EVENT = 
    "delete from usersfavevent where email=? and uuid= ?";

    public static final String SQL_SELECT_ALL_FAV_EVENTS =
    "select * from usersfavevent where email = ?";
}
