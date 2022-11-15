//Attractions
export interface Attraction {
    uuid: string,
    name: string,
    img: string,
}

export type AttractionDB = {
    [key: string]: Attraction
}

export const attractionDB: AttractionDB = {}

//Accoms
export interface Accommodation {
    uuid: string,
    name: string,
    img: string,
}

export type AccommodationDB = {
    [key: string]: Accommodation
}

export const accommodationDB: AccommodationDB = {}

//Events
export interface Event {
    uuid: string,
    name: string,
    img: string,
}

export type EventDB = {
    [key: string]: Event
}

export const eventDB: EventDB = {}


export interface User {
    username: string,
    password: string
}

export interface Favourite{
    email: string,
    name: string,
    img: string,
    id: number, 
    uuid: string
}