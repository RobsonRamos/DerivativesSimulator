define('main',["require", "exports", "./environment", "whatwg-fetch", "jquery", "popper.js", "bootstrap", "mdbootstrap", "velocity-animate", "velocity", "custom-scrollbar", "jquery-visible", "ie10-viewport"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources')
            .plugin('aurelia-dialog')
            .plugin('aurelia-validation')
            .plugin("aurelia-animator-css")
            .feature('resources')
            .plugin('aurelia-api', function (config) {
            config.registerEndpoint('csz', environment_1.default.apiAddress);
            config.registerEndpoint('viacep', environment_1.default.viacepAddress);
        });
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});



define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true,
        apiAddress: 'http://localhost:49791/api/',
        viacepAddress: 'viacep.com.br/ws/00000000/json/'
    };
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "./services/scriptRunner", "aurelia-framework", "aurelia-pal", "aurelia-api", "aurelia-event-aggregator", "./services/notificationService", "jquery", "popper.js", "bootstrap", "mdbootstrap", "velocity-animate", "velocity", "custom-scrollbar", "jquery-visible", "ie10-viewport"], function (require, exports, scriptRunner_1, aurelia_framework_1, aurelia_pal_1, aurelia_api_1, aurelia_event_aggregator_1, notificationService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(aurelia, config, ea, nService) {
            this.aurelia = aurelia;
            this.config = config;
            this.ea = ea;
            this.nService = nService;
            this.api = this.config.getEndpoint('csz');
        }
        App.prototype.configureRouter = function (config, router) {
            config = config;
            config.title = 'Derivatives Simulator';
            this.router = router;
            this.addRoutes(config, router);
        };
        App.prototype.attached = function () {
            scriptRunner_1.ScriptRunner.runScript();
            var other = this;
        };
        App.prototype.addRoutes = function (config, router) {
            config.map([
                { route: '', redirect: 'login' },
                { route: 'login', name: 'login', moduleId: aurelia_pal_1.PLATFORM.moduleName('./views/login') }
            ]);
            config.mapUnknownRoutes({ route: 'login' });
            config.fallbackRoute('login');
        };
        App.prototype.logout = function () {
            window.location.assign('/');
        };
        App = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_framework_1.Aurelia,
                aurelia_api_1.Config,
                aurelia_event_aggregator_1.EventAggregator,
                notificationService_1.NotificationService])
        ], App);
        return App;
    }());
    exports.App = App;
});



define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('repositories/simulationRepository',["require", "exports", "aurelia-api", "aurelia-dependency-injection"], function (require, exports, aurelia_api_1, aurelia_dependency_injection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SimulationRepository = (function () {
        function SimulationRepository(config) {
            this.config = config;
            this.api = this.config.getEndpoint('csz');
        }
        SimulationRepository.prototype.simulate = function (input) {
            return this.api
                .post('simulation', input)
                .then(function (result) {
                return result;
            })
                .catch(function (e) {
                console.log(e);
                return Promise.resolve(e.json().then(function (error) {
                    throw error;
                }));
            });
        };
        SimulationRepository = __decorate([
            aurelia_dependency_injection_1.autoinject,
            __metadata("design:paramtypes", [aurelia_api_1.Config])
        ], SimulationRepository);
        return SimulationRepository;
    }());
    exports.SimulationRepository = SimulationRepository;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('views/welcome',["require", "exports", "aurelia-dependency-injection", "../services/scriptRunner", "../services/notificationService", "aurelia-validation", "jquery-visible", "popper.js", "bootstrap", "velocity-animate"], function (require, exports, aurelia_dependency_injection_1, scriptRunner_1, notificationService_1, aurelia_validation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Welcome = (function () {
        function Welcome(validationControllerFactory, notification) {
            this.validationControllerFactory = validationControllerFactory;
            this.notification = notification;
            this.wasCreated = false;
            this.isLoading = false;
        }
        Welcome.prototype.attached = function () {
            window.setTimeout(function () { return scriptRunner_1.ScriptRunner.runScript(); }, 10);
        };
        Welcome.prototype.activate = function (params) {
        };
        Welcome.prototype.save = function () {
        };
        Welcome = __decorate([
            aurelia_dependency_injection_1.autoinject,
            __metadata("design:paramtypes", [aurelia_validation_1.ValidationControllerFactory,
                notificationService_1.NotificationService])
        ], Welcome);
        return Welcome;
    }());
    exports.Welcome = Welcome;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('views/login',["require", "exports", "../services/notificationService", "../services/scriptRunner", "aurelia-framework", "aurelia-router", "aurelia-event-aggregator", "chart.js", "../domain/simulationInput", "../repositories/simulationRepository", "jquery", "popper.js", "bootstrap", "mdbootstrap", "velocity-animate", "velocity", "custom-scrollbar", "jquery-visible", "ie10-viewport"], function (require, exports, notificationService_1, scriptRunner_1, aurelia_framework_1, aurelia_router_1, aurelia_event_aggregator_1, Chart, simulationInput_1, simulationRepository_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Login = (function () {
        function Login(router, ea, repository, nService) {
            this.router = router;
            this.ea = ea;
            this.repository = repository;
            this.nService = nService;
            this.isProcessing = false;
            this.input = new simulationInput_1.SimulationInput();
            this.input.sigma = null;
            this.input.riskFree = 10;
            this.input.lambda = 0.90;
            this.input.timeWindow = 126;
        }
        Login.prototype.attached = function () {
            scriptRunner_1.ScriptRunner.runScript();
        };
        Login.prototype.simulate = function () {
            var _this = this;
            this.isProcessing = true;
            this.output = null;
            this.repository
                .simulate(this.input)
                .then(function (result) {
                _this.output = result;
                _this.showChart();
                _this.showVolChart();
                _this.isProcessing = false;
            })
                .catch(function (e) {
                _this.nService.error(e);
                _this.isProcessing = false;
            });
        };
        Login.prototype.showChart = function () {
            var ctx = document.getElementById('lineChart').getContext('2d');
            var config = new Object();
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
            config.data = new Object();
            config.data.labels = [];
            config.data.datasets = [];
            config.data.datasets[0] = {
                label: 'Preço de Mercado',
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgb(54, 162, 235)',
                data: []
            };
            config.data.datasets[1] = {
                label: 'Preço Black and Scholes',
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: []
            };
            config.data.datasets[2] = {
                label: 'Preço Black76',
                fill: false,
                backgroundColor: 'rgb(255, 159, 64)',
                borderColor: 'rgb(255, 159, 64)',
                data: []
            };
            config.data.datasets[3] = {
                label: 'Preço Black and Scholes (EWMA)',
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgb(75, 192, 192)',
                data: []
            };
            config.data.datasets[4] = {
                label: 'Preço Black76 (EWMA)',
                fill: false,
                backgroundColor: 'rgb(255, 205, 86)',
                borderColor: 'rgb(255, 205, 86)',
                data: []
            };
            this.output.dataSeries.forEach(function (x) {
                config.data.labels.push(x.date.toString().replace('T00:00:00', ''));
                config.data.datasets[0].data.push(x.marketPrice);
                config.data.datasets[1].data.push(x.blackAndScholesPrice);
                config.data.datasets[2].data.push(x.black76Price);
                config.data.datasets[3].data.push(x.blackAndScholesPriceEWMA);
                config.data.datasets[4].data.push(x.black76PriceEWMA);
            });
            this.lineChart = new Chart(ctx, config);
        };
        Login.prototype.showVolChart = function () {
            var ctx = document.getElementById('volChart').getContext('2d');
            var config = new Object();
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
            config.data = new Object();
            config.data.labels = [];
            config.data.datasets = [];
            config.data.datasets[0] = {
                label: 'Volatilidade EWMA',
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgb(54, 162, 235)',
                data: []
            };
            config.data.datasets[1] = {
                label: 'Volatilidade Fixa',
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgb(75, 192, 192)',
                data: []
            };
            this.output.dataSeries.forEach(function (x) {
                config.data.labels.push(x.date.toString().replace('T00:00:00', ''));
                config.data.datasets[0].data.push(x.ewmaVol * 100);
            });
            this.volChart = new Chart(ctx, config);
        };
        Login = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_router_1.Router,
                aurelia_event_aggregator_1.EventAggregator,
                simulationRepository_1.SimulationRepository,
                notificationService_1.NotificationService])
        ], Login);
        return Login;
    }());
    exports.Login = Login;
});



define('domain/simulationDataSerie',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SimulationDataSerie = (function () {
        function SimulationDataSerie() {
        }
        return SimulationDataSerie;
    }());
    exports.SimulationDataSerie = SimulationDataSerie;
});



define('domain/simulationInput',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SimulationInput = (function () {
        function SimulationInput() {
        }
        return SimulationInput;
    }());
    exports.SimulationInput = SimulationInput;
});



define('domain/simulationType',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SimulationType;
    (function (SimulationType) {
        SimulationType[SimulationType["FixedVol"] = 0] = "FixedVol";
        SimulationType[SimulationType["VariableVol"] = 1] = "VariableVol";
    })(SimulationType = exports.SimulationType || (exports.SimulationType = {}));
});



define('domain/simulationOuput',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SimulationOutput = (function () {
        function SimulationOutput() {
        }
        return SimulationOutput;
    }());
    exports.SimulationOutput = SimulationOutput;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('services/messageService',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "aurelia-api"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, aurelia_api_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MessageService = (function () {
        function MessageService(ea, config) {
            this.ea = ea;
            this.config = config;
            this.api = this.config.getEndpoint('csz');
        }
        MessageService = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator, aurelia_api_1.Config])
        ], MessageService);
        return MessageService;
    }());
    exports.MessageService = MessageService;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('services/notificationService',["require", "exports", "toastr", "aurelia-framework", "aurelia-router"], function (require, exports, toastr, aurelia_framework_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NotificationService = (function () {
        function NotificationService(router, aurelia) {
            this.router = router;
            this.aurelia = aurelia;
            toastr.options = {
                closeButton: true,
                showEasing: 'swing',
                hideEasing: 'linear',
                showMethod: 'fadeIn',
                hideMethod: 'fadeOut',
                positionClass: 'toast-bottom-right',
                extendedTimeOut: 0,
                timeOut: 2000
            };
        }
        NotificationService.prototype.error = function (error) {
            var _this = this;
            if (error.message != null) {
                if (Array.isArray(error.message)) {
                    error.message.forEach(function (message) { return _this.presentError(message); });
                }
                else {
                    this.presentError(error.message);
                }
            }
            else
                this.presentError(error);
        };
        NotificationService.prototype.success = function (success) {
            if (success.message != null)
                this.presentSuccess(success.message);
            else
                this.presentSuccess(success);
        };
        NotificationService.prototype.presentError = function (message) {
            toastr.error(message, 'Erro');
        };
        NotificationService.prototype.presentSuccess = function (message) {
            toastr.success(message, 'Sucesso');
        };
        NotificationService = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [aurelia_router_1.Router, aurelia_framework_1.Aurelia])
        ], NotificationService);
        return NotificationService;
    }());
    exports.NotificationService = NotificationService;
});



define('services/scriptRunner',["require", "exports", "velocity"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ScriptRunner = (function () {
        function ScriptRunner() {
        }
        ScriptRunner.runScript = function () {
            $(document).ready(function () {
                var dynamicDuration = 300;
                var dynamicDelay = 0;
                var animateCSSClass = 'fadeInUp';
                var uniqueTimeStamp = new Date().getTime();
                var waitForFinalEvent = (function () {
                    var timers = {};
                    return function (callback, ms, uniqueId) {
                        if (!uniqueId) {
                            uniqueId = 'unique id';
                        }
                        if (timers[uniqueId]) {
                            clearTimeout(timers[uniqueId]);
                        }
                        timers[uniqueId] = setTimeout(callback, ms);
                    };
                })();
                function qp_required_misc() {
                    $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
                        if (!$(this).next().hasClass('show')) {
                            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
                        }
                        var subMenu = $(this).next(".dropdown-menu");
                        subMenu.toggleClass('show');
                        subMenu.prev().toggleClass('show');
                        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
                            $('.dropdown-submenu .show').removeClass("show");
                        });
                        return false;
                    });
                    $('.btn-gradient').each(function () {
                        var thisBtn = $(this);
                        var btnContent = thisBtn.html();
                        var btnContentNew = '<span class="gradient">' + btnContent + '</span>';
                        thisBtn.html(btnContentNew);
                    });
                    qp_add_scrollbar('.card-media-list', 'dark');
                    $('.has-scroll').each(function () {
                        qp_add_scrollbar($(this), 'dark');
                    });
                    $('.card-header').each(function () {
                        var thisHeader = $(this);
                        if (thisHeader.height() > 40) {
                            thisHeader.find('.header-btn-block').css({ 'top': '31px' });
                        }
                    });
                    var parentLink = 'a.nav-parent';
                    if ($(parentLink).length) {
                        $('a.nav-parent').on('click', function (e) {
                            var clickedLink = $(this);
                            if (clickedLink.closest('li').hasClass('open')) {
                                clickedLink.closest('li').removeClass('open');
                                clickedLink.siblings('ul.nav').velocity('slideUp', {
                                    easing: 'easeOutCubic',
                                    duration: dynamicDuration,
                                    delay: dynamicDelay,
                                    complete: function (elements) {
                                        clickedLink.closest('li').find('li').removeClass('open');
                                        clickedLink.closest('li').find('ul.nav').removeAttr('style');
                                    }
                                });
                            }
                            else {
                                clickedLink.closest('li').addClass('open');
                                clickedLink.siblings('ul.nav').velocity('slideDown', {
                                    easing: 'easeOutCubic',
                                    duration: dynamicDuration,
                                    delay: dynamicDelay,
                                    complete: function (elements) {
                                    }
                                });
                                clickedLink.closest('li').siblings('li.nav-item.open').find('ul.nav').velocity('slideUp', {
                                    easing: 'easeOutCubic',
                                    duration: dynamicDuration,
                                    delay: dynamicDelay,
                                    complete: function (elements) {
                                        $(this).removeAttr('style');
                                        $(this).closest('li').removeClass('open');
                                    }
                                });
                                clickedLink.closest('ul').siblings('ul.nav').find('ul.nav').velocity('slideUp', {
                                    easing: 'easeOutCubic',
                                    duration: dynamicDuration,
                                    delay: dynamicDelay,
                                    complete: function (elements) {
                                        $(this).closest('li').removeClass('open');
                                        $(this).closest('li').removeClass('open');
                                    }
                                });
                            }
                            e.preventDefault();
                        });
                    }
                    var sidebarNav = 'nav.sidebar';
                    if ($(sidebarNav).length) {
                        var windowHeight = $(window).height();
                        $(sidebarNav).height(windowHeight);
                        $(sidebarNav).mCustomScrollbar("destroy");
                        qp_add_scrollbar('nav.sidebar', 'light');
                        $('.sidebar > .mCustomScrollBox').before('<button class="hamburger hamburger--slider" type="button" data-target=".sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle Sidebar"><span class="hamburger-box"><span class="hamburger-inner"></span></span></button>');
                        $(window).resize(function () {
                            waitForFinalEvent(function () {
                                var windowHeight = $(window).height();
                                $(sidebarNav).height(windowHeight);
                                $(sidebarNav).mCustomScrollbar("destroy");
                                $('.sidebar .hamburger').remove();
                                qp_add_scrollbar('nav.sidebar', 'light');
                                $('.sidebar > .mCustomScrollBox').before('<button class="hamburger hamburger--slider" type="button" data-target=".sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle Sidebar"><span class="hamburger-box"><span class="hamburger-inner"></span></span></button>');
                            }, 500, 'RandomUniqueString');
                        });
                    }
                    $(document).on('click', 'button.hamburger', function (e) {
                        var mainNavbarHeight = $('.navbar-sidebar-horizontal').outerHeight();
                        $('.sidebar-horizontal.fixed-top').css({ 'top': mainNavbarHeight + 'px' });
                        if ($('.hamburger').hasClass('is-active')) {
                            $('.hamburger').removeClass('is-active');
                            $('#sidebar').removeClass('open');
                            $('.sidebar-horizontal').slideUp().promise().always(function () {
                                $(this).removeAttr('style');
                            });
                        }
                        else {
                            $('.hamburger').addClass('is-active');
                            $('#sidebar').addClass('open');
                            $('.sidebar-horizontal').slideDown();
                        }
                        e.preventDefault();
                    });
                    $('.input-group .form-control').focus(function () {
                        $(this).closest('.input-group').addClass('focus');
                    });
                    $('.input-group .form-control').blur(function () {
                        $(this).closest('.input-group').removeClass('focus');
                    });
                    $('[data-toggle="popover"]').popover();
                    $('[data-toggle="tooltip"]').tooltip();
                    $('[data-qp-link]').on('click', function (e) {
                        window.location = $(this).data('qp-link');
                        e.preventDefault();
                    });
                    var signInLeftColumn = '.signin-left-column';
                    if ($(signInLeftColumn).length) {
                        var windowHeight = $(window).height();
                        if (windowHeight > 630) {
                            $(signInLeftColumn).css({ 'height': windowHeight + 'px' });
                        }
                        $(window).resize(function () {
                            waitForFinalEvent(function () {
                                var windowHeight = $(window).height();
                                if (windowHeight > 630) {
                                    $(signInLeftColumn).css({ 'height': windowHeight + 'px' });
                                }
                            }, 500, 'randomStringForSignupPage');
                        });
                    }
                    var signInRightColumn = '.signin-right-column';
                    if ($(signInRightColumn).length) {
                        if ((typeof ($(signInRightColumn).data('qp-bg-image')) !== 'undefined') && ($(signInRightColumn).data('qp-bg-image') != '')) {
                            var backgroundImage = $(signInRightColumn).data('qp-bg-image');
                            $(signInRightColumn).css({ 'background-image': 'url(assets/img/' + backgroundImage + ')' });
                        }
                    }
                    var placeholder = '.load-ckeditor';
                    if ($(placeholder).length) {
                        $(placeholder).ckeditor();
                    }
                    var customColorControl = $('.custom-color-control.custom-control.custom-radio');
                    if (customColorControl.length) {
                        $('.custom-color-control.custom-control.custom-radio').each(function () {
                            var thisObj = $(this);
                            var color = thisObj.data('qp-color');
                            thisObj.find('.custom-control-indicator').css({ 'background-color': color });
                        });
                    }
                    qp_animate_css();
                    if ($('.dropdown-menu-fullscreen').length) {
                        var rightColumnWidth = $('.right-column').width();
                        $('.dropdown-menu-fullscreen').css({ 'width': rightColumnWidth + 'px' });
                        $('.dropdown-menu-fullscreen').closest('.nav-item').css({ 'position': 'static' });
                        $(window).resize(function () {
                            waitForFinalEvent(function () {
                                var rightColumnWidth = $('.right-column').width();
                                $('.dropdown-menu-fullscreen').css({ 'width': rightColumnWidth + 'px' });
                            }, 500, uniqueTimeStamp);
                        });
                    }
                    var windowWidth = $(window).width();
                    $('.dropdown-toggle').on('click', function () {
                        if ($(window).width() <= 576) {
                            $(this).siblings('.dropdown-menu').each(function () {
                                if (!$(this).hasClass('dropdown-menu-fullscreen')) {
                                    $(this).css({ 'position': 'absolute', 'width': windowWidth + 'px' });
                                    $(this).closest('.dropdown').css({ 'position': 'static' });
                                }
                            });
                        }
                        else {
                            $(this).siblings('.dropdown-menu').each(function () {
                                if (!$(this).hasClass('dropdown-menu-fullscreen')) {
                                    $(this).removeAttr('style');
                                    $(this).closest('.dropdown').removeAttr('style');
                                }
                            });
                        }
                    });
                    $(window).resize(function () {
                        waitForFinalEvent(function () {
                            if ($(window).width() <= 576) {
                                $('.dropdown-toggle').on('click', function () {
                                    var windowWidth = $(window).width();
                                    $(this).siblings('.dropdown-menu').each(function () {
                                        if (!$(this).hasClass('dropdown-menu-fullscreen')) {
                                            $(this).css({ 'position': 'absolute', 'width': windowWidth + 'px' });
                                            $(this).closest('.dropdown').css({ 'position': 'static' });
                                        }
                                    });
                                });
                            }
                            else {
                                if (!$(this).hasClass('dropdown-menu-fullscreen')) {
                                    $(this).siblings('.dropdown-menu').removeAttr('style');
                                    $(this).siblings('.dropdown-menu').closest('.dropdown').removeAttr('style');
                                }
                            }
                        }, 500, 'uniqueTimeStamp+345');
                    });
                    $('[data-toggle=offcanvas]').click(function () {
                        $('.row-offcanvas').toggleClass('active');
                    });
                    $('.no-waves-effect').removeClass('waves-effect');
                }
                function qp_animate_css() {
                    if (!$('body').hasClass('no-animation')) {
                        $('[data-qp-animate-type]').each(function () {
                            var mainElement = $(this);
                            if (mainElement.visible(true) || mainElement.closest('nav').hasClass('sidebar')) {
                                load_animation(mainElement);
                            }
                            $(window).scroll(function () {
                                if (mainElement.visible(true)) {
                                    load_animation(mainElement);
                                }
                            });
                            function load_animation(mainElement) {
                                var animationName = '';
                                if (typeof (mainElement.data('qp-animate-type')) === 'undefined') {
                                    var animationName = 'fadeInDown';
                                }
                                else {
                                    animationName = mainElement.data('qp-animate-type');
                                }
                                if (typeof (mainElement.data('qp-animate-delay')) === 'undefined') {
                                    var timeoutDelay = 0;
                                }
                                else {
                                    timeoutDelay = mainElement.data('qp-animate-delay');
                                }
                                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                                if (mainElement.hasClass('invisible')) {
                                    setTimeout(function () {
                                        mainElement.removeClass('invisible').addClass('animated ' + animationName).one(animationEnd, function () {
                                            $(this).removeClass(animationName);
                                            $(this).removeClass('animated');
                                            $(this).removeClass('infinite');
                                        });
                                    }, timeoutDelay);
                                }
                                if (mainElement.hasClass('invisible-children')) {
                                    mainElement.children().each(function () {
                                        var thisElement = $(this);
                                        setTimeout(function () {
                                            thisElement.addClass('animated ' + animationName).one(animationEnd, function () {
                                            });
                                        }, timeoutDelay);
                                        timeoutDelay += 75;
                                    });
                                }
                                if (mainElement.hasClass('invisible-children-with-scrollbar')) {
                                    mainElement.children('.mCustomScrollBox').find('.mCSB_container').children().each(function () {
                                        var thisElement = $(this);
                                        setTimeout(function () {
                                            thisElement.addClass('animated ' + animationName).one(animationEnd, function () {
                                            });
                                        }, timeoutDelay);
                                        timeoutDelay += 75;
                                    });
                                }
                            }
                        });
                    }
                }
                function qp_hexToRgbA(hex, alpha) {
                    var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
                    if (alpha) {
                        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
                    }
                    else {
                        return "rgb(" + r + ", " + g + ", " + b + ")";
                    }
                }
                function qp_add_scrollbar(scrollContainer, scrollBarTheme) {
                    var colorPresetGlobal = $('body').data('color-preset');
                    $(scrollContainer).mCustomScrollbar({
                        autoHideScrollbar: true,
                        scrollbarPosition: 'inside',
                        theme: scrollBarTheme,
                        mouseWheel: {
                            preventDefault: true
                        }
                    });
                }
                function qp_chart_sizes(chartID) {
                    var chartWidth;
                    var chartHeight;
                    chartWidth = $(chartID).parent().width();
                    if (typeof ($(chartID).closest('.card-chart').data('chart-height')) === 'undefined') {
                        chartHeight = 281;
                    }
                    else {
                        if (chartWidth < 300) {
                            chartHeight = 281;
                        }
                        else {
                            chartHeight = $(chartID).closest('.card-chart').data('chart-height');
                        }
                    }
                    var chartSizes = [chartWidth, chartHeight];
                    return chartSizes;
                }
                function qp_timeline() {
                    var timelineContainer = '.timeline';
                    if ($(timelineContainer).length) {
                        $(timelineContainer).each(function () {
                            $(this).timelify({
                                animRight: "fadeInRight",
                                animLeft: "fadeInLeft",
                                animCenter: "fadeInUp"
                            });
                        });
                    }
                }
                function qp_calendar() {
                    var calendarContainer = '#calendar';
                    if ($(calendarContainer).length) {
                        $(calendarContainer).closest(".card-body").find(".calendar-controls .create-event .dropdown-menu .legend-block-item .legend-block-color-box, .calendar-controls .available-events .fc-event .legend-block-item .legend-block-color-box").each(function () {
                            var eventColor = $(this).data("event-color");
                            var highlightColor = "highlight-color-" + eventColor;
                            var bgColor = "highlight-color-" + eventColor;
                            $(this).addClass(bgColor);
                        });
                        $("#add-available-event").on("click", function () {
                            var eventColorActive = $(this).siblings(".dropdown-menu").find(".legend-block-item.active .legend-block-color-box").data("event-color");
                            var eventName = $(this).parent().siblings("#input-new-event").val().trim();
                            $(this).parent().siblings("#input-new-event").val("");
                            if (eventName != "") {
                                var newEventContent = "<div class='fc-event' style='opacity:0;'><div class='legend-block-item'><div class='legend-block-color'><div class='legend-block-color-box highlight-color-" + eventColorActive + "' data-event-color='" + eventColorActive + "'><i class='batch-icon batch-icon-droplet'></i></div></div><div class='legend-block-text'>" + eventName + "</div></div></div>";
                                $(this).closest(".calendar-controls").find(".available-events .event-list").prepend(newEventContent);
                                $(this).closest(".calendar-controls").find(".available-events .fc-event").first().delay(200).animate({ "opacity": "1" }, 300);
                                $(this).closest(".card-body").find('.calendar-controls .fc-event').each(function () {
                                    var thisEventColor = $(this).find(".legend-block-color-box").data("event-color");
                                    var eventObject = {
                                        title: $.trim($(this).text()),
                                        className: "highlight-color-" + thisEventColor,
                                    };
                                    $(this).data('event', eventObject);
                                    $(this).draggable({
                                        zIndex: 999,
                                        revert: true,
                                        revertDuration: 0
                                    });
                                });
                            }
                            else {
                                $("#input-new-event").focus();
                            }
                        });
                        getActiveColor();
                        var getActiveColor = function () {
                            var eventColorActive = $(calendarContainer).closest(".card-body").find(".calendar-controls .create-event .dropdown-menu .legend-block-item.active .legend-block-color-box").data("event-color");
                            var theButton = $(calendarContainer).closest(".card-body").find(".calendar-controls .create-event .dropdown-toggle");
                            var colorIndicator = theButton.closest('.input-group-btn').siblings('.input-group-addon');
                            theButton.addClass("highlight-color-" + eventColorActive);
                            colorIndicator.addClass("highlight-color-" + eventColorActive);
                            var listItem = $(calendarContainer).closest(".card-body").find(".calendar-controls .create-event .dropdown-menu .legend-block-item");
                            listItem.on("click", function () {
                                var newEventColor = $(this).find(".legend-block-color-box").data("event-color");
                                var regex = new RegExp('\\b' + 'highlight-color-' + '.+?\\b', 'g');
                                theButton[0].className = theButton[0].className.replace(regex, '');
                                theButton.addClass("highlight-color-" + newEventColor);
                                colorIndicator.removeAttr('class').addClass("input-group-addon highlight-color-" + newEventColor);
                                $(this).siblings().removeClass("active");
                                $(this).addClass('active');
                                $("#input-new-event").focus();
                            });
                        };
                        $(calendarContainer).closest(".card-body").find('.calendar-controls .fc-event').each(function () {
                            var thisEventColor = $(this).find(".legend-block-color-box").data("event-color");
                            $(this).data('event', {
                                title: $.trim($(this).text()),
                                className: "highlight-color-" + thisEventColor,
                                stick: true
                            });
                            $(this).draggable({
                                zIndex: 999,
                                revert: true,
                                revertDuration: 0
                            });
                        });
                        $(calendarContainer).fullCalendar({
                            header: {
                                left: 'prev,next today',
                                center: 'title',
                                right: 'month,agendaWeek,agendaDay'
                            },
                            themeSystem: 'bootstrap3',
                            defaultDate: '2017-11-12',
                            editable: true,
                            droppable: true,
                            eventLimit: true,
                            events: [
                                {
                                    title: 'All Day Event',
                                    start: '2017-11-01',
                                    className: "highlight-color-red"
                                },
                                {
                                    title: 'Long Event',
                                    start: '2017-11-07',
                                    end: '2017-11-10',
                                    className: "highlight-color-yellow"
                                },
                                {
                                    id: 999,
                                    title: 'Repeating Event',
                                    start: '2017-11-09T16:00:00',
                                    color: "#ff0097"
                                },
                                {
                                    id: 999,
                                    title: 'Repeating Event',
                                    start: '2017-11-16T16:00:00',
                                    className: "highlight-color-purple"
                                },
                                {
                                    title: 'Conference',
                                    start: '2017-11-11',
                                    end: '2017-11-13',
                                    className: "highlight-color-green"
                                },
                                {
                                    title: 'Meeting',
                                    start: '2017-11-12T10:30:00',
                                    end: '2017-11-12T12:30:00',
                                    className: "highlight-color-green"
                                },
                                {
                                    title: 'Lunch',
                                    start: '2017-11-12T12:00:00',
                                    color: "#6ec06e"
                                },
                                {
                                    title: 'Meeting',
                                    start: '2017-11-12T14:30:00',
                                    className: "highlight-color-red"
                                },
                                {
                                    title: 'Happy Hour',
                                    start: '2017-11-12T17:30:00',
                                    className: "highlight-color-red"
                                },
                                {
                                    title: 'Dinner',
                                    start: '2017-11-12T20:00:00',
                                    className: "highlight-color-blue"
                                },
                                {
                                    title: 'Birthday Party',
                                    start: '2017-11-13T07:00:00'
                                },
                                {
                                    title: 'Click for Google',
                                    url: 'https://base5builder.com/',
                                    start: '2017-11-28'
                                }
                            ],
                            drop: function () {
                                $(this).remove();
                            },
                            eventAfterAllRender: function () {
                                $(calendarContainer).find('.glyphicon.glyphicon-chevron-right').removeAttr('class').addClass('batch-icon batch-icon-arrow-right');
                                $(calendarContainer).find('.glyphicon.glyphicon-chevron-left').removeAttr('class').addClass('batch-icon batch-icon-arrow-left');
                            }
                        });
                    }
                }
                function qp_mailbox_list() {
                    var placeholder = '.mailbox-email-list';
                    if ($(placeholder).length) {
                        $(placeholder + ' .email-item-checkbox .custom-control-input').removeAttr('checked');
                        var selectAll = $(placeholder + ' .email-select-all .custom-checkbox');
                        selectAll.on('click', function () {
                            if ($(this).hasClass('active')) {
                                $(this).find('.custom-control-input').removeAttr('checked');
                                $(placeholder + ' .email-item-checkbox .custom-control-input').removeAttr('checked');
                                $(this).removeClass('active');
                                $(placeholder + ' .mailbox-control-group .btn').addClass('disabled');
                                $(placeholder + ' tr').removeClass("highlighted");
                            }
                            else {
                                $(this).find('.custom-control-input').attr('checked', 'checked');
                                $(placeholder + ' .email-item-checkbox .custom-control-input').attr('checked', 'checked');
                                $(this).addClass('active');
                                $(placeholder + ' .mailbox-control-group .btn').removeClass('disabled');
                                $(placeholder + ' tr').addClass("highlighted");
                            }
                            return false;
                        });
                        $(placeholder + ' .email-item-checkbox').on('click', function () {
                            var thisCheckbox = $(this);
                            var checkedCount = 0;
                            if (thisCheckbox.find('.custom-control-input').is(':checked')) {
                                thisCheckbox.find('.custom-control-input').removeAttr('checked');
                                thisCheckbox.closest('tr').removeClass("highlighted");
                                thisCheckbox.closest('tr').siblings('tr').each(function () {
                                    if ($(this).find('.custom-control-input').is(':checked')) {
                                        checkedCount++;
                                    }
                                });
                                if (checkedCount < 1) {
                                    $(placeholder + ' .mailbox-control-group .btn').addClass('disabled');
                                }
                            }
                            else {
                                thisCheckbox.find('.custom-control-input').attr('checked', 'checked');
                                thisCheckbox.closest('tr').addClass("highlighted");
                                $(placeholder + ' .mailbox-control-group .btn').removeClass('disabled');
                            }
                            return false;
                        });
                        $(".email-refresh").on("click", function (e) {
                            location.reload();
                            e.preventDefault();
                        });
                        $(".email-mark-read").on("click", function (e) {
                            $(".mailbox-email-list tr").each(function () {
                                if ($(this).hasClass('email-status-unread') && $(this).find('.email-checkbox .custom-control-input').is(':checked')) {
                                    $(this).removeClass("email-status-unread");
                                }
                                else if (!$(this).hasClass('email-status-unread') && $(this).find('.email-checkbox .custom-control-input').is(':checked')) {
                                    $(this).addClass("email-status-unread");
                                }
                            });
                            e.preventDefault();
                        });
                        $(".email-delete").on("click", function (e) {
                            $(".mailbox-email-list tr").each(function () {
                                if ($(this).find('.email-checkbox .custom-control-input').is(':checked')) {
                                    $(this).velocity('slideUp', {
                                        easing: 'easeOutCubic',
                                        duration: dynamicDuration,
                                        delay: dynamicDelay,
                                        complete: function (elements) {
                                            $(this).remove();
                                        }
                                    });
                                }
                            });
                            $(".alert").remove();
                            var messageDeleteText = '<strong>Deleted!</strong> Email(s) deleted.';
                            var messageDelete = '<div class="alert alert-success alert-dismissable" style="opacity:0;"><button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' + messageDeleteText + '</div>';
                            $(".mailbox-controls").after(messageDelete);
                            $(".alert").animate({ "opacity": 1 }, 300);
                            $(".email-mark-read, .email-mark-important, .email-mark-junk, .email-delete").addClass("disabled");
                            selectAll.find('.custom-control-input').removeAttr('checked');
                            e.preventDefault();
                        });
                        $(".email-mark-junk").on("click", function (e) {
                            $(".mailbox-email-list tr").each(function () {
                                if ($(this).find('.email-checkbox .custom-control-input').is(':checked')) {
                                    $(this).velocity('slideUp', {
                                        easing: 'easeOutCubic',
                                        duration: dynamicDuration,
                                        delay: dynamicDelay,
                                        complete: function (elements) {
                                            $(this).remove();
                                        }
                                    });
                                }
                            });
                            $(".alert").remove();
                            var messageJunkText = '<strong>Moved!</strong> Email(s) have been moved to the Junk Folder.';
                            var messageJunk = '<div class="alert alert-success alert-dismissable" style="opacity:0;"><button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' + messageJunkText + '</div>';
                            $(".mailbox-controls").after(messageJunk);
                            $(".alert").animate({ "opacity": 1 }, 300);
                            $(".email-mark-read, .email-mark-important, .email-mark-junk, .email-delete").addClass("disabled");
                            selectAll.find('.custom-control-input').removeAttr('checked');
                            e.preventDefault();
                        });
                        $(".mailbox-email-list tr").each(function () {
                            $(this).find(".email-star").on("click", function () {
                                $(this).find(".email-star-status").toggleClass("checked");
                            });
                            var emailURL = $(this).data("email-url");
                            $(this).find(".email-sender, .email-subject, .email-datetime").on("click", function () {
                                window.location.href = emailURL;
                            });
                        });
                    }
                }
                function qp_mailbox_message_view() {
                    if ($("#show-others").length) {
                        $("#show-others").on("click", function (e) {
                            $(".message-recepient-others").slideToggle(300);
                            e.preventDefault();
                        });
                    }
                }
                function qp_datatables() {
                    var placeholder = '.table-datatable';
                    if ($(placeholder).length) {
                        $(placeholder).each(function () {
                            $(this).DataTable();
                        });
                    }
                }
                function qp_task_list() {
                    var taskList = '.card-task-list';
                    if ($(taskList).length) {
                        if ($(taskList).closest('.card').hasClass('card-xs') || $(taskList).closest('.card').hasClass('card-sm') || $(taskList).closest('.card').hasClass('card-md') || $(taskList).closest('.card').hasClass('card-lg')) {
                            qp_add_scrollbar(taskList, 'dark');
                        }
                        var taskListItem = $(taskList + ' .task-list-item .custom-checkbox');
                        var taskCount = function (addCount) {
                            if (typeof (addCount) === 'undefined') {
                                addCount = 0;
                            }
                            var tasksCompleted = taskListItem.closest('.card-task-list').find("label.active").length + addCount;
                            var tasksTotal = taskListItem.closest('.card-task-list').find(".task-list-item").length;
                            taskListItem.closest('.card').find(".card-header .task-list-stats .task-list-completed").text(tasksCompleted);
                            taskListItem.closest('.card').find(".card-header .task-list-stats .task-list-total").text(tasksTotal);
                            var completionPercentage = (tasksCompleted / tasksTotal) * 100;
                            var progressBar = taskListItem.closest('.card').find(".card-header .progress-bar");
                            progressBar.css({ "width": completionPercentage + "%" }).attr("aria-valuenow", completionPercentage);
                        };
                        taskListItem.on('click', function () {
                            $(this).button('toggle');
                            taskCount(undefined);
                            if ($(taskList).hasClass('no-strike-out')) {
                                $(this).addClass('anti-active');
                            }
                        });
                        if (!$(taskList).hasClass('no-strike-out')) {
                            taskListItem.each(function () {
                                var checkedStatus = $(this).find('.custom-control-input').is(':checked');
                                if (checkedStatus) {
                                    $(this).addClass('active');
                                }
                            });
                        }
                        taskCount(undefined);
                        $(taskList).find(".task-item-controls .show-task").on("click", function (e) {
                            $(this).closest(".task-list-item").find(".task-item-details").slideToggle(300);
                            e.preventDefault();
                        });
                    }
                }
                qp_required_misc();
                $(window).resize(function () {
                    waitForFinalEvent(function () {
                    }, 500, 'thisstringisunsdsaique');
                });
                qp_task_list();
                qp_timeline();
                qp_calendar();
                qp_mailbox_list();
                qp_mailbox_message_view();
                qp_datatables();
            });
        };
        return ScriptRunner;
    }());
    exports.ScriptRunner = ScriptRunner;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('views/components/attributes/inscricaoEstadualMask',["require", "exports", "aurelia-framework", "jquery-mask-plugin"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InscricaoEstadualMask = (function () {
        function InscricaoEstadualMask(element) {
            this.element = element;
        }
        InscricaoEstadualMask.prototype.attached = function () {
            $(this.element).mask('000.000.000.000');
        };
        InscricaoEstadualMask = __decorate([
            aurelia_framework_1.customAttribute('inscricaoEstadual'),
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [Element])
        ], InscricaoEstadualMask);
        return InscricaoEstadualMask;
    }());
    exports.InscricaoEstadualMask = InscricaoEstadualMask;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('views/components/attributes/numberMask',["require", "exports", "aurelia-framework", "jquery-mask-plugin"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NumberMask = (function () {
        function NumberMask(element) {
            this.element = element;
        }
        NumberMask.prototype.attached = function () {
            $(this.element).mask('00');
        };
        NumberMask = __decorate([
            aurelia_framework_1.customAttribute('number'),
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [Element])
        ], NumberMask);
        return NumberMask;
    }());
    exports.NumberMask = NumberMask;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('views/components/attributes/datepicker',["require", "exports", "aurelia-framework", "jquery-datetimepicker"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DatePicker = (function () {
        function DatePicker(element) {
            this.element = element;
        }
        DatePicker.prototype.attached = function () {
            $(this.element).datetimepicker({
                onGenerate: function (ct) {
                },
                format: 'd/m/Y',
                timepicker: false,
                mask: true,
            })
                .on('blur', function (e) { return fireEvent(e.target, 'change'); });
        };
        DatePicker.prototype.detached = function () {
        };
        DatePicker = __decorate([
            aurelia_framework_1.customAttribute('datepicker'),
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [Element])
        ], DatePicker);
        return DatePicker;
    }());
    exports.DatePicker = DatePicker;
    function fireEvent(element, name) {
        var event = document.createEvent('Event');
        event.initEvent(name, true, true);
        element.dispatchEvent(event);
    }
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('views/components/attributes/timeMask',["require", "exports", "aurelia-framework", "jquery-mask-plugin"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TimeMask = (function () {
        function TimeMask(element) {
            this.element = element;
        }
        TimeMask.prototype.attached = function () {
            $(this.element).mask('00:00');
            var other = this;
        };
        TimeMask = __decorate([
            aurelia_framework_1.customAttribute('time'),
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [Element])
        ], TimeMask);
        return TimeMask;
    }());
    exports.TimeMask = TimeMask;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('views/components/attributes/cellPhoneWithDDDMask',["require", "exports", "aurelia-framework", "jquery-mask-plugin"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CellPhoneWithDDDMask = (function () {
        function CellPhoneWithDDDMask(element) {
            this.element = element;
        }
        CellPhoneWithDDDMask.prototype.attached = function () {
            $(this.element).mask('(00) 00000-0000');
        };
        CellPhoneWithDDDMask = __decorate([
            aurelia_framework_1.customAttribute('cell-phone-with-ddd'),
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [Element])
        ], CellPhoneWithDDDMask);
        return CellPhoneWithDDDMask;
    }());
    exports.CellPhoneWithDDDMask = CellPhoneWithDDDMask;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('views/components/attributes/moneyMask',["require", "exports", "aurelia-framework", "jquery-mask-plugin"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MoneyMask = (function () {
        function MoneyMask(element) {
            this.element = element;
        }
        MoneyMask.prototype.attached = function () {
            $(this.element).mask('000.000.000.000.000,00', { reverse: true });
        };
        MoneyMask = __decorate([
            aurelia_framework_1.customAttribute('money'),
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [Element])
        ], MoneyMask);
        return MoneyMask;
    }());
    exports.MoneyMask = MoneyMask;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('views/components/attributes/cepMask',["require", "exports", "aurelia-framework", "jquery-mask-plugin"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CEPMask = (function () {
        function CEPMask(element) {
            this.element = element;
        }
        CEPMask.prototype.attached = function () {
            $(this.element).mask('00000-000');
        };
        CEPMask = __decorate([
            aurelia_framework_1.customAttribute('cep'),
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [Element])
        ], CEPMask);
        return CEPMask;
    }());
    exports.CEPMask = CEPMask;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('views/components/attributes/cnpjMask',["require", "exports", "aurelia-framework", "jquery-mask-plugin"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CNPJMask = (function () {
        function CNPJMask(element) {
            this.element = element;
        }
        CNPJMask.prototype.attached = function () {
            $(this.element).mask('00.000.000/0000-00');
        };
        CNPJMask = __decorate([
            aurelia_framework_1.customAttribute('cnpj'),
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [Element])
        ], CNPJMask);
        return CNPJMask;
    }());
    exports.CNPJMask = CNPJMask;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('views/components/attributes/phoneWithDDDMask',["require", "exports", "aurelia-framework", "jquery-mask-plugin"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PhoneWithDDDMask = (function () {
        function PhoneWithDDDMask(element) {
            this.element = element;
        }
        PhoneWithDDDMask.prototype.attached = function () {
            $(this.element).mask('(00) 0000-0000');
        };
        PhoneWithDDDMask = __decorate([
            aurelia_framework_1.customAttribute('phone-with-ddd'),
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [Element])
        ], PhoneWithDDDMask);
        return PhoneWithDDDMask;
    }());
    exports.PhoneWithDDDMask = PhoneWithDDDMask;
});



define('views/components/valueConverters/numberValueConverter',["require", "exports", "jquery-mask-plugin"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NumberValueConverter = (function () {
        function NumberValueConverter() {
        }
        NumberValueConverter.prototype.toView = function (value) {
            return value;
        };
        NumberValueConverter.prototype.fromView = function (value) {
            return value;
        };
        return NumberValueConverter;
    }());
    exports.NumberValueConverter = NumberValueConverter;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('views/components/valueConverters/timeValueConverter',["require", "exports", "aurelia-framework", "jquery-mask-plugin"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TimeValueConverter = (function () {
        function TimeValueConverter() {
        }
        TimeValueConverter.prototype.toView = function (value) {
            if (value != null) {
                if (isNaN(value)) {
                    return '';
                }
                value = value + '';
                if (value.length == 1) {
                    if (Number.parseInt(value) < 10 && Number.parseInt(value) > 2) {
                        return '0' + value + ':00';
                    }
                    if (Number.parseInt(value) <= 2) {
                        return value;
                    }
                    return value + ':00';
                }
                if (value.length == 2) {
                    if (Number.parseInt(value) > 24) {
                        return '0' + value + '0';
                    }
                    else {
                        return value + ':00';
                    }
                }
                if (value.length == 3) {
                    var a = ('' + value).substr(0, 2);
                    var b = ('' + value).substr(2, 1);
                    if (value == '') {
                        return null;
                    }
                    if (Number.parseInt(a) > 24) {
                        var b = ('' + value).substr(1, 2);
                        if (Number.parseInt(b) > 59) {
                            b = '00';
                        }
                        return '0' + (value).substr(0, 1) + ':' + b;
                    }
                    if (Number.parseInt(b) > 5) {
                        b = '00';
                    }
                    return a + ':' + b;
                }
                else {
                    var a = ('' + value).substr(0, 2);
                    var b = ('' + value).substr(2, 2);
                    if (value == '') {
                        return null;
                    }
                    if (Number.parseInt(a) >= 24) {
                        return '';
                    }
                    if (b.substr(0, 1) == "0")
                        b = ((Number.parseInt(b) * 10) / 10).toString();
                    if (Number.parseInt(b) > 59) {
                        b = '00';
                    }
                    if (b.length < 2) {
                        b += '0';
                    }
                    return a + ':' + b;
                }
            }
        };
        TimeValueConverter.prototype.fromView = function (value) {
            return ('' + value).replace(":", "");
        };
        TimeValueConverter = __decorate([
            aurelia_framework_1.autoinject
        ], TimeValueConverter);
        return TimeValueConverter;
    }());
    exports.TimeValueConverter = TimeValueConverter;
});



define('views/components/valueConverters/dateAndTimeFormatValueConverter',["require", "exports", "moment"], function (require, exports, moment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DateAndTimeFormatValueConverter = (function () {
        function DateAndTimeFormatValueConverter() {
        }
        DateAndTimeFormatValueConverter.prototype.toView = function (value) {
            moment.locale('pt-BR');
            if (value == null || value == '')
                return '';
            return moment(value).format("DD/MM/YYYY HH:mm:ss");
        };
        DateAndTimeFormatValueConverter.prototype.fromView = function (value) {
            moment.locale('pt-BR');
            return moment(value, 'DD/MM/YYYY').utc().format("YYYY-MM-DD HH:mm:ssZ");
        };
        return DateAndTimeFormatValueConverter;
    }());
    exports.DateAndTimeFormatValueConverter = DateAndTimeFormatValueConverter;
});



define('views/components/valueConverters/moneyValueConverter',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MoneyValueConverter = (function () {
        function MoneyValueConverter() {
        }
        MoneyValueConverter.prototype.toView = function (value) {
            if (value != null) {
                var numero = value.toFixed(2).split('.');
                numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
                return numero.join(',');
            }
            return value;
        };
        MoneyValueConverter.prototype.fromView = function (value) {
            if (value != null) {
                return (value.split(".").join("").replace(",", "")) / 100;
            }
            return null;
        };
        return MoneyValueConverter;
    }());
    exports.MoneyValueConverter = MoneyValueConverter;
});



define('views/components/valueConverters/inscricaoEstadualValueConverter',["require", "exports", "jquery-mask-plugin"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InscricaoEstadualValueConverter = (function () {
        function InscricaoEstadualValueConverter() {
        }
        InscricaoEstadualValueConverter.prototype.toView = function (value) {
            if (value != null) {
                value = '' + value;
                var a = value.substr(0, 3);
                var b = value.substr(3, 3);
                var c = value.substr(6, 3);
                var d = value.substr(9, 3);
                return a + '.' + b + '.' + c + '.' + d;
            }
            return value;
        };
        InscricaoEstadualValueConverter.prototype.fromView = function (value) {
            if (value != null)
                return value.replace('.', '').replace('.', '').replace('.', '');
            return null;
        };
        return InscricaoEstadualValueConverter;
    }());
    exports.InscricaoEstadualValueConverter = InscricaoEstadualValueConverter;
});



define('views/components/valueConverters/dateFormatValueConverter',["require", "exports", "moment"], function (require, exports, moment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DateFormatValueConverter = (function () {
        function DateFormatValueConverter() {
        }
        DateFormatValueConverter.prototype.toView = function (value) {
            moment.locale('pt-BR');
            if (value == null || value == '')
                return null;
            return moment(value).format("DD/MM/YYYY");
        };
        DateFormatValueConverter.prototype.fromView = function (value) {
            moment.locale('pt-BR');
            if (value == null || value == '')
                return null;
            return moment(value, 'DD/MM/YYYY').utc().format("YYYY-MM-DD HH:mm:ssZ");
        };
        return DateFormatValueConverter;
    }());
    exports.DateFormatValueConverter = DateFormatValueConverter;
});



define('views/components/valueConverters/phoneWithDDDValueConverter',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PhoneWithDDDValueConverter = (function () {
        function PhoneWithDDDValueConverter() {
        }
        PhoneWithDDDValueConverter.prototype.toView = function (value) {
            if (value != null) {
                value = '' + value;
                var ddd = value.substr(0, 2);
                var firstPart = value.substr(2, 4);
                var lastPart = value.substr(6, 4);
                return '(' + ddd + ')' + ' ' + firstPart + '-' + lastPart;
            }
            return value;
        };
        PhoneWithDDDValueConverter.prototype.fromView = function (value) {
            if (value != null)
                return value.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');
            return null;
        };
        return PhoneWithDDDValueConverter;
    }());
    exports.PhoneWithDDDValueConverter = PhoneWithDDDValueConverter;
});



define('views/components/valueConverters/cepValueConverter',["require", "exports", "jquery-mask-plugin"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CepValueConverter = (function () {
        function CepValueConverter() {
        }
        CepValueConverter.prototype.toView = function (value) {
            if (value != null) {
                value = '' + value;
                var a = value.substr(0, 5);
                var b = value.substr(5, 3);
                return a + '-' + b;
            }
            return value;
        };
        CepValueConverter.prototype.fromView = function (value) {
            if (value != null) {
                return value.replace('-', '');
            }
            return null;
        };
        return CepValueConverter;
    }());
    exports.CepValueConverter = CepValueConverter;
});



define('views/components/valueConverters/cellPhoneWithDDDValueConverter',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CellPhoneWithDDDValueConverter = (function () {
        function CellPhoneWithDDDValueConverter() {
        }
        CellPhoneWithDDDValueConverter.prototype.toView = function (value) {
            if (value != null) {
                value = '' + value;
                var ddd = value.substr(0, 2);
                var firstPart = value.substr(2, 5);
                var lastPart = value.substr(7, 4);
                return '(' + ddd + ')' + ' ' + firstPart + '-' + lastPart;
            }
            return value;
        };
        CellPhoneWithDDDValueConverter.prototype.fromView = function (value) {
            if (value != null)
                return value.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');
            return null;
        };
        return CellPhoneWithDDDValueConverter;
    }());
    exports.CellPhoneWithDDDValueConverter = CellPhoneWithDDDValueConverter;
});



define('views/components/valueConverters/cnpjValueConverter',["require", "exports", "jquery-mask-plugin"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CnpjValueConverter = (function () {
        function CnpjValueConverter() {
        }
        CnpjValueConverter.prototype.toView = function (value) {
            if (value != null) {
                value = '' + value;
                var a = value.substr(0, 2);
                var b = value.substr(2, 3);
                var c = value.substr(5, 3);
                var d = value.substr(8, 4);
                var e = value.substr(12, 2);
                return a + '.' + b + '.' + c + '/' + d + '-' + e;
            }
            return value;
        };
        CnpjValueConverter.prototype.fromView = function (value) {
            if (value != null)
                return value.replace('.', '').replace('.', '').replace('/', '').replace('-', '');
            return null;
        };
        return CnpjValueConverter;
    }());
    exports.CnpjValueConverter = CnpjValueConverter;
});



define('text!app.html', ['module'], function(module) { module.exports = "<template><div class=\"container-fluid\"><router-view containerless></router-view></div></template>"; });
define('text!views/login.html', ['module'], function(module) { module.exports = "<template><require from=\"./components/valueConverters/phoneWithDDDValueConverter\"></require><require from=\"./components/valueConverters/cellPhoneWithDDDValueConverter\"></require><require from=\"./components/valueConverters/cnpjValueConverter\"></require><require from=\"./components/valueConverters/cepValueConverter\"></require><require from=\"./components/valueConverters/numberValueConverter\"></require><require from=\"./components/valueConverters/moneyValueConverter\"></require><require from=\"./components/valueConverters/dateFormatValueConverter\"></require><require from=\"./components/valueConverters/inscricaoEstadualValueConverter\"></require><require from=\"./components/attributes/cnpjMask\"></require><require from=\"./components/attributes/cepMask\"></require><require from=\"./components/attributes/inscricaoEstadualMask\"></require><require from=\"./components/attributes/numberMask\"></require><require from=\"./components/attributes/moneyMask\"></require><div><div class=\"row\"><nav id=\"sidebar\" class=\"px-0 bg-dark bg-gradient sidebar\"><ul class=\"nav nav-pills flex-column\"><li class=\"logo-nav-item\"><a class=\"navbar-brand\"><img src=\"assets/img/logo-white.png\" width=\"145\" height=\"32.3\" alt=\"QuillPro\" class=\"mCS_img_loaded\" style=\"width:150px;height:85px;margin-left:5px\"></a></li><li><h6 class=\"nav-header\">Geral</h6></li><li class=\"nav-item\"><a class=\"nav-link\" href=\"/#/csz/dashboard\"><i class=\"batch-icon batch-icon-browser-alt\"></i> Dashboard <span class=\"sr-only\">(current)</span></a></li></ul></nav><div class=\"right-column\"><nav class=\"navbar navbar-expand-lg navbar-light bg-white\"><button class=\"hamburger hamburger--slider\" type=\"button\" data-target=\".sidebar\" aria-controls=\"sidebar\" aria-expanded=\"false\" aria-label=\"Toggle Sidebar\"><span class=\"hamburger-box\"><span class=\"hamburger-inner\"></span></span></button><div class=\"navbar-collapse\" id=\"navbar-header-content\"><ul class=\"navbar-nav navbar-language-translation mr-auto\"></ul><ul class=\"navbar-nav navbar-notifications float-right\"><li class=\"nav-item dropdown\"><ul class=\"dropdown-menu dropdown-menu-fullscreen\" aria-labelledby=\"navbar-notification-search\"><li><form class=\"form-inline my-2 my-lg-0 no-waves-effect\"><div class=\"input-group\"><input type=\"text\" class=\"form-control\" placeholder=\"Search for...\"> <span class=\"input-group-btn\"><button class=\"btn btn-primary btn-gradient waves-effect waves-light\" type=\"button\">Search</button></span></div></form></li></ul></li><li class=\"nav-item dropdown\"><a class=\"nav-link dropdown-toggle no-waves-effect\" id=\"navbar-notification-misc\" click.trigger=\"updateNotifications()\" data-toggle=\"dropdown\" data-flip=\"false\" aria-haspopup=\"true\" aria-expanded=\"false\"><i class=\"batch-icon batch-icon-bell\"></i> <span class=\"notification-number\" if.bind=\"unSeenCount > 0\">${unSeenCount}</span></a><ul class=\"dropdown-menu dropdown-menu-right dropdown-menu-md\" aria-labelledby=\"navbar-notification-misc\"><li class=\"media\" repeat.for=\"notification of notifications\"><a><i class=\"batch-icon batch-icon-bell batch-icon-xl d-flex mr-3\"></i><div class=\"media-body\"><h6 class=\"mt-0 mb-1 notification-heading\">${notification.title}</h6><div class=\"notification-text\"> ${notification.message} </div></div></a></li></ul></li></ul><ul class=\"navbar-nav ml-5 navbar-profile\"><li class=\"nav-item dropdown\"><a class=\"nav-link dropdown-toggle\" id=\"navbar-dropdown-navbar-profile\" data-toggle=\"dropdown\" data-flip=\"false\" aria-haspopup=\"true\" aria-expanded=\"false\"><div class=\"profile-name\"> ${identity.name} </div><div class=\"profile-picture bg-gradient bg-primary has-message float-right\"><img src=\"assets/img/profile-pic.jpg\" width=\"44\" height=\"44\"></div></a><ul class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"navbar-dropdown-navbar-profile\"><li><a class=\"dropdown-item\" href=\"#\" click.trigger=\"logout()\">Logout</a></li></ul></li></ul></div></nav><div><main class=\"main-content p-5\" role=\"main\"><div class=\"row mb-5 task-manager au-animate\"><div class=\"col-lg-12\"><div class=\"card\"><div class=\"card-header\">Simulador</div><div class=\"card-body\"><h4>Dados básicos</h4><div class=\"row mt-4\"><div class=\"col-md-3\"><div class=\"form-group\"><label class=\"control-label\">Risk Free (%)<span class=\"text-danger ml-1 bold\">*</span></label> <input type=\"text\" class=\"form-control\" money value.bind=\"input.riskFree | money\"></div></div><div class=\"col-md-3\"><div class=\"form-group\"><label class=\"control-label\">Volatilidade (%)<span class=\"text-danger ml-1 bold\">*</span></label> <input type=\"text\" class=\"form-control\" money value.bind=\"input.sigma | money\"></div></div></div><div class=\"row mt-4\"><div class=\"col-md-3\"><div class=\"form-group\"><label class=\"control-label\">Lambda<span class=\"text-danger ml-1 bold\">*</span></label> <input type=\"text\" class=\"form-control\" money value.bind=\"input.lambda | money\"></div></div><div class=\"col-md-3\"><div class=\"form-group\"><label class=\"control-label\">Qtde de observações<span class=\"text-danger ml-1 bold\">*</span></label> <input type=\"text\" class=\"form-control\" money value.bind=\"input.timeWindow | money\"></div></div></div><div class=\"fa-4x text-center\" if.bind=\"isProcessing\"><i class=\"fa fa-refresh fa-spin\"></i></div><div class=\"row mt-5 mb-5 mx-auto\" if.bind=\"! isProcessing\"><button type=\"button\" class=\"btn btn-success btn-gradient waves-effect waves-light\" click.trigger=\"simulate()\"><span class=\"gradient\">Simular</span></button> <button type=\"button\" class=\"btn btn-secondary ml-2 waves-effect waves-light\" click.trigger=\"cancel()\">Cancelar</button></div><div class=\"row mt-4\"><h4>Resultados</h4><table class=\"table table-hover mt-4\"><thead><tr><th>Data</th><th class=\"text-center\">Preço de Mercado</th><th class=\"text-center\">Preço Black and Scholes</th><th class=\"text-center\">Preço Black76</th><th class=\"text-center\">Volatilidade EWMA</th><th class=\"text-center\">Preço Black and Scholes (EWMA)</th><th class=\"text-center\">Preço Black76 (EWMA)</th><th class=\"text-center\">Underlying Price</th></tr></thead><tbody><tr repeat.for=\"x of output.dataSeries\"><td>${x.date  | dateFormat}</td><td class=\"text-center\">${x.marketPrice | money}</td><td class=\"text-center\">${x.blackAndScholesPrice | money}</td><td class=\"text-center\">${x.black76Price | money}</td><td class=\"text-center\">${x.ewmaVol  * 100 | money}%</td><td class=\"text-center\">${x.blackAndScholesPriceEWMA | money}</td><td class=\"text-center\">${x.black76PriceEWMA | money}</td><td class=\"text-center\">${x.underlyingPrice | money}</td></tr></tbody></table><canvas id=\"lineChart\" class=\"mt-4\"></canvas><canvas id=\"volChart\" class=\"mt-4\"></canvas><div></div></div></div></div></div></div></main></div></div></div></div></template>"; });
define('text!views/welcome.html', ['module'], function(module) { module.exports = "<template><require from=\"./components/attributes/cnpjMask\"></require><require from=\"./components/attributes/cepMask\"></require><require from=\"./components/attributes/phoneWithDDDMask\"></require><require from=\"./components/attributes/cellPhoneWithDDDMask\"></require><require from=\"./components/valueConverters/cnpjValueConverter\"></require><require from=\"./components/valueConverters/cepValueConverter\"></require><require from=\"./components/valueConverters/phoneWithDDDValueConverter\"></require><require from=\"./components/valueConverters/cellPhoneWithDDDValueConverter\"></require><div class=\"row\"><div class=\"right-column sisu\"><div class=\"row mx-0\"><div class=\"col-md-7 order-md-2 signin-right-column px-5 bg-dark\"><a class=\"signin-logo d-sm-block d-md-none\" href=\"#\"><img src=\"assets/img/logo-white.png\" width=\"145\" height=\"32.3\" alt=\"QuillPro\"></a><h1 class=\"display-4\">CSZ Compras Inteligentes</h1><p class=\"lead mb-5\">Olá, seja bem-vindo</p></div><div class=\"col-md-5 order-md-1 signin-left-column bg-white px-5\"><div if.bind=\"wasCreated\"><h2>Obrigado!</h2><p class=\"mt-4\">Um e-mail foi enviado para ${user.email} com as instruções para acesso!</p></div><form if.bind=\"! wasCreated\"><h4 class=\"text-center\">Dados de Cadastro</h4><p>Preencha os dados abaixo para sabermos mais sobre você</p><div class=\"form-group\"><label class=\"control-label active\">Nome<span class=\"text-danger ml-1 bold\">*</span></label> <input type=\"text\" class=\"form-control\" value.bind=\"user.contactName  & validate\"></div><div class=\"form-group\"><label class=\"control-label active\">E-mail<span class=\"text-danger ml-1 bold\">*</span></label> <input type=\"email\" class=\"form-control\" value.bind=\"user.email  & validate\"></div><div class=\"form-group\"><label class=\"control-label active\">Razão Social<span class=\"text-danger ml-1 bold\">*</span></label> <input type=\"text\" class=\"form-control\" value.bind=\"user.companyName  & validate\"></div><div class=\"form-group\"><label class=\"control-label active\">Telefone</label> <input type=\"text\" class=\"form-control\" phone-with-ddd value.bind=\"user.commercialPhone | phoneWithDDD  & validate\" id=\"exampleInputEmail1\" value.bind=\"credential.email\"></div><div class=\"form-group\"><label class=\"control-label active\">Telefone Celular</label> <input type=\"text\" class=\"form-control\" cell-phone-with-ddd value.bind=\"user.mobilePhone | cellPhoneWithDDD  & validate\" id=\"exampleInputEmail1\" value.bind=\"credential.email\"></div><div class=\"form-group text-center mt-4\"><div class=\"form-check form-check-inline mt-3\"><input class=\"form-check-input\" type=\"radio\" name=\"inlineRadioOptions\" value=\"1\" checked.bind=\"user.selectedType\"> <label class=\"form-check-label\" for=\"inlineRadio2\">Food service</label></div><div class=\"form-check form-check-inline ml-5 mt-3\"><input class=\"form-check-input\" type=\"radio\" name=\"inlineRadioOptions\" value=\"0\" checked.bind=\"user.selectedType\"> <label class=\"form-check-label\" for=\"inlineRadio1\">Fornecedor</label></div></div><button type=\"submit\" if.bind=\"! isLoading\" class=\"btn btn-primary btn-gradient btn-block waves-effect waves-light mt-4\" click.delegate=\"save()\" if.bind=\"! isloading\"><i class=\"batch-icon batch-icon-mail\"></i> Salvar</button><div class=\"fa-2x text-center\" if.bind=\"isLoading\"><i class=\"fa fa-refresh fa-spin\"></i></div></form></div></div></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map