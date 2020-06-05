import { ScriptRunner } from './services/scriptRunner'; 
import { isNullOrUndefined } from 'util'; 
import { autoinject, Aurelia } from 'aurelia-framework';
import { Router, RouterConfiguration, NavigationInstruction } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Rest, Config } from 'aurelia-api';
import { configure } from './resources';
import { EventAggregator } from 'aurelia-event-aggregator';
import { NotificationService } from './services/notificationService';
import { MessageService } from './services/messageService'; 

import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'mdbootstrap';
import 'velocity-animate';
import 'velocity';
import 'custom-scrollbar';
import 'jquery-visible';
import 'ie10-viewport';  


@autoinject
export class App {
  		
	
  	$ 						: any;
	api 					: Rest; 
	router 					: Router;   
	routerConfig			: RouterConfiguration;

	constructor(private aurelia					: Aurelia, 
				private config					: Config,
				private ea						: EventAggregator, 
				private nService 				: NotificationService ) {  

		this.api = this.config.getEndpoint('csz'); 
	} 
	

	configureRouter(config: RouterConfiguration, router: Router): void {
		
		config = config;
		config.title = 'Derivatives Simulator'; 
		this.router = router;
		this.addRoutes(config, router); 
	}	

	attached() : void { 
		 
		ScriptRunner.runScript(); 
		var other = this; 
	}	

 
    addRoutes(config: RouterConfiguration, router: Router): void {

        config.map([
            { route: '', 		redirect: 'login' },
            { route: 'login', 	name: 'login', moduleId: PLATFORM.moduleName('./views/login') }
			
        ]);

        config.mapUnknownRoutes({ route: 'login' }); 
        config.fallbackRoute('login');
    }

   logout() : void { 
		window.location.assign('/'); 
   }
}
