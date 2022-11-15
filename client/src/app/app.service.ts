import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { R3SelectorScopeMode } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { firstValueFrom, map, Observable, Observer, Subject } from "rxjs";
import { Accommodation, Attraction, attractionDB, User, Event } from "./models";
import * as XLSX from 'xlsx';
import { ResolveEnd } from "@angular/router";



const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable()

export class AppService {
    httpOptions = {
        headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + this.getToken())
    };

    uploadhttp = {
        headers: new HttpHeaders()
            .set('Authorization', 'Bearer ' + this.getToken())
    };

    nextTokenEvent: string = ""
    nextTokenAtt: string = ""
    nextTokenAcc: string = ""
    currentUser = new Subject<any>()
    dataUrl = new Subject<string>()

    constructor(private http: HttpClient) { }

    // getAttractionsTypes() : Promise<string>{

    //     const params = new HttpParams()
    //         .set('api_key', "l2ZmFMzUZc9Vw7wT6rRz0ANMXJZCWEbA")

    //     return firstValueFrom(
    //         this.http.get<any>('/api/attractions/types', {params})
    //         .pipe(
    //             map(result => {
    //                 // const data = JSON.parse(result.data)
    //                 return result.map((v: any) => v as string)
    //             })
    //         )
    //     )
    // }

    getAttractionBySearch(keyword: string, bool: boolean) {
        if(bool){
            this.nextTokenAtt = ""
        }
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('nextToken', this.nextTokenAtt)

        return firstValueFrom(
            this.http.get<any>('/api/attractions/search', { params })
                .pipe(
                    map(result => {
                        this.nextTokenAtt = result.nextToken

                        console.log(result)
                        const data = JSON.parse(result.data)
                        return data.map((v: any) => v as Attraction)
                    })
                )
        )
    }

    getAccomsBySearch(keyword: string, bool: boolean) {
        if(bool){
            this.nextTokenAcc = ""
        }
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('nextToken', this.nextTokenAcc)

        return firstValueFrom(
            this.http.get<any>('/api/accommodation/search', { params })
                .pipe(
                    map(result => {
                        this.nextTokenAcc = result.nextToken

                        console.log(result)
                        const data = JSON.parse(result.data)
                        return data.map((v: any) => v as Accommodation)
                    })
                )
        )
    }

    getEventsBySearch(keyword: string, bool: boolean): Promise<any> {
        if(bool){
            this.nextTokenAcc = ""
        }
        if(keyword == "" && this.nextTokenEvent == ""){
            return Promise.reject(null)
        }
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('nextToken', this.nextTokenEvent)
        
        return firstValueFrom(
            this.http.get<any>('/api/events/search', { params })
                .pipe(
                    map(result => {
                        this.nextTokenEvent = result.nextToken

                        console.log(result)
                        const data = JSON.parse(result.data)
                        return data.map((v: any) => v as Event)
                    })
                )
        )
    }

    addtofavatt(a: Attraction, authuser: string): Promise<any> {

        const params = new HttpParams()
            .set('username', authuser)
            .set('attraction', JSON.stringify(a))

        return firstValueFrom(
            this.http.post<any>('/user/addtofav', { username: authuser, attraction: a }, this.httpOptions)
        )
    }

    addtofavacc(a: Accommodation, authuser: string): Promise<any> {

        const params = new HttpParams()
            .set('username', authuser)
            .set('attraction', JSON.stringify(a))

        return firstValueFrom(
            this.http.post<any>('/user/addtofav', { username: authuser, accommodation: a }, this.httpOptions)
        )
    }

    addtofavev(a: Event, authuser: string): Promise<any> {

        const params = new HttpParams()
            .set('username', authuser)
            .set('attraction', JSON.stringify(a))

        return firstValueFrom(
            this.http.post<any>('/user/addtofav', { username: authuser, event: a }, this.httpOptions)
        )
    }

    
    addtofav(a: any, authuser: string, type: string): Promise<any> {

        const params = new HttpParams()
            .set('username', authuser)
            .set('attraction', JSON.stringify(a))

        return firstValueFrom(
            this.http.put<any>('/user/addtofav', { username: authuser, item: a , type: type}, this.httpOptions)
        )
    }

    checkfav(uuid: string, authuser: string, type: string) {
        const params = new HttpParams()
            .set('username', authuser)
            .set('uuid', uuid)
            .set('type', type)

        const httpOps = new HttpHeaders()
            .set('Authorization', 'Bearer ' + this.getToken())

        return firstValueFrom(
            this.http.get<any>('/user/checkfav', { params: params, headers: httpOps })
        )
    }

    getFavs() {
        const authuser = this.getUser().replace(/"/g, '')
        const params = new HttpParams()
            .set('username', authuser)

        const httpOps = new HttpHeaders()
            .set('Authorization', 'Bearer ' + this.getToken())

        return firstValueFrom(
            this.http.get<any>('/user/getfav', { params: params, headers: httpOps })
        )

    }


    authenticate(user: User): Promise<any> {
        const params = new HttpParams()
            .set('username', user.username)
            .set('password', user.password)

        // return firstValueFrom(
        //     this.http.post<any>('/authenticate', { user })
        // )

        return firstValueFrom(
            this.http.post<any>('/authenticate', { username: user.username, password: user.password })
            // .pipe(
            //     map(result => {
            //         return result as string
            //     })))

        )
    }

    register(user: User) {
        const params = new HttpParams()
            .set('username', user.username)
            .set('password', user.password)

        // return firstValueFrom(
        //     this.http.post<any>('/authenticate', { user })
        // )

        return firstValueFrom(
            this.http.post<any>('/register', { username: user.username, password: user.password, headers: this.httpOptions })
        )

    }

    upload(file: File | Blob) {
        const data = new FormData()
        data.set('myfile', file)
        return firstValueFrom(
            this.http.post<any>('/user/upload', data, this.uploadhttp)
        )
    }

    getPhoto(authuser: string): Promise<any> {
        const params = new HttpParams()
            .set('username', authuser)

        const httpOps = new HttpHeaders()
            .set('Authorization', 'Bearer ' + this.getToken())
            .set('Accept', 'image/png')


        return firstValueFrom(
            this.http.get<any>('/user/getphoto', { params: params, headers: httpOps, responseType: 'blob' as 'json' })
           
            .pipe(
                    map(result => {
                        console.log("res", result)
                        this.readAsDataURL(result)
                        
                        .subscribe((dataUrl: string) => {
                            this.dataUrl.next(dataUrl)
                            // console.log(`dataUrl : ${this.dataUrl}`)
                          })
                    }))
                    
        )
    }

    readAsDataURL(blob: Blob): Observable<string> {
        return new Observable((obs: Observer<string>) => {
          const reader: FileReader = new FileReader();
    
          reader.onerror = err => obs.error(err);
          reader.onabort = err => obs.error(err);
          reader.onload = () => obs.next(reader.result as string);
          reader.onloadend = () => obs.complete();
    
          return reader.readAsDataURL(blob);
        });
      }
      
    send(workbook: Blob) {
        // const params = new HttpParams()
        //     .set('workbook', workbook)


        //     return firstValueFrom(
        //         this.http.post<any>('/user/send', { workbook: workbook, username: this.getUser() }, this.httpOptions )
        // )

        const data = new FormData()
        data.set('myfile', workbook)
        return firstValueFrom(
            this.http.post<any>('/user/send', data, this.uploadhttp)
        )
    }

    //token
    signOut(): void {
        window.sessionStorage.clear();
    }

    public saveToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): any {
        return sessionStorage.getItem(TOKEN_KEY);
    }

    public saveUser(user: string): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): any {
        this.currentUser.next(sessionStorage.getItem(USER_KEY))
        return sessionStorage.getItem(USER_KEY);
    }

}