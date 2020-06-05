import { NotificationService } from '../services/notificationService';
import { ScriptRunner } from '../services/scriptRunner';  
import { autoinject, Aurelia } from 'aurelia-framework';
import { Router} from 'aurelia-router';  
import { EventAggregator } from 'aurelia-event-aggregator'; 
import * as Chart from 'chart.js';
import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'mdbootstrap';
import 'velocity-animate';
import 'velocity';
import 'custom-scrollbar';
import 'jquery-visible';
import 'ie10-viewport';
import { SimulationInput } from '../domain/simulationInput';
import { SimulationRepository } from '../repositories/simulationRepository';
import { SimulationOutput } from '../domain/simulationOuput';



@autoinject
export class Login {
 
    isProcessing  = false;
    input                       : SimulationInput;
    output                      : SimulationOutput; 
	lineChart   				: Chart;
	volChart       				: Chart;
     
    constructor(
        private router          : Router,  
        private ea              : EventAggregator ,
        private repository      : SimulationRepository,
        private nService        : NotificationService ) {

        this.input = new SimulationInput();
        this.input.sigma = null;
        this.input.riskFree = 10;
        this.input.lambda = 0.90;
        this.input.timeWindow = 126;
    }  
	  
   	attached(): void { 
        ScriptRunner.runScript();   
    } 
    
    simulate(){

        this.isProcessing = true;
        this.output = null;

        this.repository
            .simulate(this.input)
            .then( result => {                
                this.output = result;
                this.showChart();
                this.showVolChart();
                this.isProcessing = false;
            }) 
            .catch( e => {
                this.nService.error(e);
                this.isProcessing = false;
            });
    }

    showChart(){

        var ctx = ( <any> document.getElementById('lineChart')).getContext('2d');
        var config  = <any> new Object();
        config.type = 'line',
        config.options = {
            responsive: true,
            title: {
                display: true,
                text: 'Preço de mercado x Preço teórico'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Data'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Preços'
                    }
                }]
            }
        };

        config.data = <any> new Object();
        config.data.labels = [];
        config.data.datasets = [];

        config.data.datasets[0] = {
            label : 'Preço de Mercado',
            fill: false,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor:  'rgb(54, 162, 235)',
            data : []
        };

        config.data.datasets[1] = {
            label : 'Preço Black and Scholes',
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor:  'rgb(255, 99, 132)',
            data : []
        };

        config.data.datasets[2] = {
            label : 'Preço Black76',
            fill: false,
            backgroundColor: 'rgb(255, 159, 64)',
            borderColor:  'rgb(255, 159, 64)',
            data : []
        }; 

        config.data.datasets[3] = {
            label : 'Preço Black and Scholes (EWMA)',
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgb(75, 192, 192)',
            data : []
        };

        config.data.datasets[4] = {
            label : 'Preço Black76 (EWMA)',
            fill: false,
            backgroundColor: 'rgb(255, 205, 86)',
            borderColor:  'rgb(255, 205, 86)',
            data : []
        };

        this.output.dataSeries.forEach( x =>{
            config.data.labels.push(x.date.toString().replace('T00:00:00',''));
            config.data.datasets[0].data.push(x.marketPrice);
            config.data.datasets[1].data.push(x.blackAndScholesPrice);
            config.data.datasets[2].data.push(x.black76Price);
            config.data.datasets[3].data.push(x.blackAndScholesPriceEWMA);
            config.data.datasets[4].data.push(x.black76PriceEWMA);
        });

        this.lineChart = new Chart(ctx, config);
    }

    showVolChart(){

        var ctx = ( <any> document.getElementById('volChart')).getContext('2d');
        var config  = <any> new Object();
        config.type = 'line',

        config.options = {
            responsive: true,
            title: {
                display: true,
                text: 'Volatilidade EWMA'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Data'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Preços'
                    }
                }]
            }
        };

        config.data = <any> new Object();
        config.data.labels = [];
        config.data.datasets = [];

        config.data.datasets[0] = {
            label : 'Volatilidade EWMA',
            fill: false,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor:  'rgb(54, 162, 235)',
            data : []
        }; 

        config.data.datasets[1] = {
            label : 'Volatilidade Fixa',
            fill: false,
            backgroundColor:  'rgb(75, 192, 192)',
            borderColor:   'rgb(75, 192, 192)',
            data : []
        }; 

        this.output.dataSeries.forEach( x =>{
            config.data.labels.push(x.date.toString().replace('T00:00:00',''));
            config.data.datasets[0].data.push(x.ewmaVol * 100); 
         //   config.data.datasets[1].data.push(x.volatility * 100); 
        });

        this.volChart = new Chart(ctx, config);


    }

}