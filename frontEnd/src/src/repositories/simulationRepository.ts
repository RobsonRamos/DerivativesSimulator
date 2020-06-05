import { Rest, Config } from "aurelia-api"; 
import { autoinject } from "aurelia-dependency-injection";
import { SimulationInput } from "../domain/simulationInput";
import { SimulationOutput } from "../domain/simulationOuput";

@autoinject
export class SimulationRepository{

    api: Rest;

    constructor(private config: Config) {
        this.api = this.config.getEndpoint('csz');
    }

    simulate(input : SimulationInput) : Promise<SimulationOutput>  {

        return this.api
                    .post('simulation', input)
                    .then( (result : Promise<SimulationOutput>) => {                 
                        return result;
                    })
                    .catch( (e) => {
                        console.log(e);
                        return Promise.resolve(e.json().then( error => {
                            throw error;
                        }));
                    });
    }
}