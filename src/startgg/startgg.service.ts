import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { lastValueFrom, map, tap } from "rxjs";
import { IConfig } from "src/config/config.model";
import { ConfigService } from "src/config/config.service";


@Injectable()
export class StartggService {
    public config: IConfig;

    constructor(private configService: ConfigService, private readonly httpService: HttpService) {

    }

    async getUpcomingTournaments(): Promise<any> {

    } 

    async queryStart(): Promise<any> {
        var headers = {
            "Authorization": "Bearer " + this.configService.config.startgg.apiKey,
            "Content-Type": "application/json"
        }
        console.log(`Auth: ${headers.Authorization}`)

        var query = this.buildTestQuery();
        return lastValueFrom(this.httpService.post(
            "https://api.start.gg/gql/alpha", 
            query, 
            { headers: headers }).pipe(tap(
                response => console.log(response.data),
                error => console.log(error)
            ), map(response => response.data)));
    }

    buildQuery(): Object {
        return {
            "query": "",
            "varaibles": {}
        }
    }

    buildTestQuery(): Object {
        return {
            "query": "query getEventId($slug:String){event(slug:$slug){id name}}",
            "variables": {
                "slug": "tournament/2xko-reno-rumble/event/2xko-double-elim"
            }
        }
    }
}