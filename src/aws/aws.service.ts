import { Injectable } from "@nestjs/common";
import { ConfigService } from "src/config/config.service";
import { SES, SendEmailCommand, SendEmailCommandInput } from "@aws-sdk/client-ses"
import { IEmailParams } from "./email.model";


@Injectable()
export class AwsService {

    client: any; 

    constructor(private configService: ConfigService) {}

    async sendEmail(params: IEmailParams): Promise<string> {
        const client = new SES({ 
            region: this.configService.config.aws.region, 
            credentials: { 
                accessKeyId: this.configService.config.aws.accessKeyId, 
                secretAccessKey: this.configService.config.aws.secretAccessKey 
            } });

        const sendCommand: SendEmailCommand = new SendEmailCommand(
            {
                Source: 'Inquiries@brycecollins.net',
                Destination: {
                    ToAddresses: ['me@brycecollins.net']
                    // CcAddresses: [params.from],
                },
                Message: {
                    Subject: {
                        Data: params.subject,
                    },
                    Body: {
                        Text: {
                            Data: params.message,
                        },
                    },
                },
            }
        );
        const sendResult: any = await client.send(sendCommand);

        if(sendResult['$metadata'].httpStatusCode < 400) {
            // We're good - return a success message
            return 'success'
        } else {
            // We're not good - return an error message
            return 'failure'
        }
    }
}