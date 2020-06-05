import 'jquery-visible';
import 'popper.js';
import 'bootstrap';
import 'velocity-animate'; 
import { autoinject } from 'aurelia-dependency-injection';   
import { ScriptRunner } from '../services/scriptRunner';
import { NotificationService } from '../services/notificationService'; 
import { ValidationControllerFactory, ValidationController, validateTrigger, ValidationRules, ControllerValidateResult } from 'aurelia-validation';

@autoinject
export class Welcome{

    validationController                    : ValidationController;
    wasCreated                              : boolean;
    isLoading                               : boolean;
    
    constructor( 
        private validationControllerFactory : ValidationControllerFactory, 
        private notification                : NotificationService ) {  
        this.wasCreated = false;
        this.isLoading = false;
 
    } 

    attached(){
        
        window.setTimeout(() => ScriptRunner.runScript(), 10);
    }

    activate(params){ 
    }


    save(){

          
    }

}