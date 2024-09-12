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

        var query = this.buildTournamentsByNameQuery();
        return lastValueFrom(this.httpService.post(
            "https://api.start.gg/gql/alpha", 
            query, 
            { headers: headers }).pipe(tap(
                response => console.log(`Data: ${JSON.stringify(response.data)}`),
                error => console.log(error)
            ), map(response => response.data)));
    }

    buildQuery(): Object {
        return {
            "query": "",
            "varaibles": {}
        }
    }

    buildUserQuery(): Object {
        return {
            "query": "query userQuery($slug:String){user(slug:$slug){id player{id gamerTag prefix}}}",
            "variables": {
                "slug": "user/a72d6f39"
            }
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

    buildTournamentQuery(): Object {
        return {
            "query": "query randomQueryName($slug:String){event(slug:$slug){id name}}",
            "variables": {
                "slug": "tournament/2xko-reno-rumble/event/2xko-double-elim"
            }
        }
    }
// 1685606 Tyto user

    buildTournamentsByOwnerQuery(): Object {
        return {
            "query": "query TournamentsByOwner($perPage:Int!,$ownerId:ID!){tournaments(query:{perPage:$perPage filter:{ownerId:$ownerId}}){nodes{id name publishing startAt slug}}}",
            "variables": {
                "ownerId": 1685606,
                "perPage": 100
            }
        }
    }

    buildTournamentsByNameQuery(): Object {
        return {
            "query": "query tournamentsByName($perPage:Int!,$name:String){tournaments(query:{perPage:$perPage filter:{name:$name}}) {nodes{id name publishing startAt slug}}}",
            "variables": {
                "name": "Tyto Tuesdays",
                "perPage": 100
            }
        }
    }

}