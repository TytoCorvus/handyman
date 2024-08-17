import { StartggService } from "./startgg.service";
import { ConfigService } from "src/config/config.service";
import { HttpService } from "@nestjs/axios";

describe('StartggService', () => {
    let startggService: StartggService;
  
    beforeEach(() => {
        startggService = new StartggService(
            new ConfigService(),
            new HttpService()
        );
    });
  
    describe('query start gg', () => {
      it('should return the event ID', async () => {
        // jest.spyOn(startggService, 'findAll').mockImplementation(() => result);
  
        console.log("Test is running")
        await startggService.queryStart().then((result) => {
            console.log(`Result type: ${typeof result}`)

            expect(result).toBeTruthy()
        })
        
      });
    });
  });