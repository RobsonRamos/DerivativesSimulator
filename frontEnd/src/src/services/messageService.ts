 
import { autoinject, Aurelia } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Rest, Config } from 'aurelia-api';

@autoinject
export class MessageService{

	api: Rest;

    constructor(private ea: EventAggregator, private config: Config){
		this.api = this.config.getEndpoint('csz');
    } 
}