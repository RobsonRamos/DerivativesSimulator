import { SimulationType } from "./simulationType";
import { SimulationDataSerie } from "./simulationDataSerie";

export class SimulationOutput{

    riskFree        : number;
    sigma           : number;
    lambda          : number;
    type            : SimulationType;
    dataSeries      : SimulationDataSerie[];
}