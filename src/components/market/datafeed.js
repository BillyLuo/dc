"use strict";
/*
	This class implements interaction with UDF-compatible datafeed.

	See UDF protocol reference at
	https://github.com/tradingview/charting_library/wiki/UDF
*/

var Datafeeds = {};

Datafeeds.UDFCompatibleDatafeed = function(datafeedURL,data_info, updateFrequency, protocolVersion) {
	
	this._datafeedURL = datafeedURL;
	this._configuration = undefined;

	this._symbolSearch = null;
	this._symbolsStorage = null;
	this._barsPulseUpdater = new Datafeeds.DataPulseUpdater(this, updateFrequency || 10 * 1000);
	this._quotesPulseUpdater = new Datafeeds.QuotesPulseUpdater(this);
	this._protocolVersion = protocolVersion || 2;

	this._enableLogging = false;
	this._initializationFinished = false;
	this._callbacks = {};
	this.data_info = data_info;
	this._initialize();
};

Datafeeds.UDFCompatibleDatafeed.prototype.defaultConfiguration = function() {
	return {
		supports_search: false,
		supports_group_request: false,
		supported_resolutions: ['1','5','15', '30', '60', '120','240','360','720', '1D','1W', '1M'],
		supports_marks: false,
		supports_timescale_marks: false,
		exchanges: ['COODEX'],
		supports_time:false
	};
};

Datafeeds.UDFCompatibleDatafeed.prototype.getServerTime = function(callback) {
	// if (this._configuration.supports_time) {
	// 	this._send(this._datafeedURL + "/time", {})
	// 		.done(function (response) {
	// 			callback(+response);
	// 		})
	// 		.fail(function() {

	// 		});
	// }
};

Datafeeds.UDFCompatibleDatafeed.prototype.on = function (event, callback) {

	if (!this._callbacks.hasOwnProperty(event)) {
		this._callbacks[event] = [];
	}

	this._callbacks[event].push(callback);
	return this;
};


Datafeeds.UDFCompatibleDatafeed.prototype._fireEvent = function(event, argument) {
	if (this._callbacks.hasOwnProperty(event)) {
		var callbacksChain = this._callbacks[event];
		for (var i = 0; i < callbacksChain.length; ++i) {
			callbacksChain[i](argument);
		}
		this._callbacks[event] = [];
	}
};

Datafeeds.UDFCompatibleDatafeed.prototype.onInitialized = function() {
	this._initializationFinished = true;
	this._fireEvent("initialized");
};



Datafeeds.UDFCompatibleDatafeed.prototype._logMessage = function(message) {
	if (this._enableLogging) {
		var now = new Date();
		console.log(now.toLocaleTimeString() + "." + now.getMilliseconds() + "> " + message);
	}
};


Datafeeds.UDFCompatibleDatafeed.prototype._send = function(url, params) {
	var request = url;
	if (params) {
		for (var i = 0; i < Object.keys(params).length; ++i) {
			var key = Object.keys(params)[i];
			var value = encodeURIComponent(params[key]);
			request += (i === 0 ? "?" : "&") + key + "=" + value;
		}
	}

	this._logMessage("New request: " + request);

	return $.ajax({
		type: 'GET',
		url: request,
		contentType: 'text/plain'
	});
};

Datafeeds.UDFCompatibleDatafeed.prototype._initialize = function() {

	var that = this;
	that._setupWithConfiguration(
		{"supports_search":true,
		"supports_group_request":false,
		"supports_marks":false,
		"supports_timescale_marks":false,
		"supports_time":true,
		"exchanges":[],
		"supportedResolutions":['1','5','15', '30', '60', '120','240','360','720', '1D','1W', '1M']}
	);
	// this._send(this._datafeedURL + "/config")
	// 	.done(function(response) {
	// 		var configurationData = JSON.parse(response);
	// 		that._setupWithConfiguration(configurationData);
	// 	})
	// 	.fail(function(reason) {
	// 		that._setupWithConfiguration(that.defaultConfiguration());
	// 	});
};


Datafeeds.UDFCompatibleDatafeed.prototype.onReady = function(callback) {
	
	if (this._configuration) {
		let taht = this;
		setTimeout(function(){
			callback(taht._configuration);
		},0)
	}
	else {
		var that = this;
		this.on("configuration_ready", function() {
			setTimeout(function(){
				callback(taht._configuration);
			},0)
		});
	}
};

Datafeeds.UDFCompatibleDatafeed.prototype._setupWithConfiguration = function(configurationData) {
	this._configuration = configurationData;

	if (!configurationData.exchanges) {
		configurationData.exchanges = [];
	}

	//	@obsolete; remove in 1.5
	var supportedResolutions = configurationData.supported_resolutions || configurationData.supportedResolutions;
	configurationData.supported_resolutions = supportedResolutions;

	//	@obsolete; remove in 1.5
	var symbolsTypes = configurationData.symbols_types || configurationData.symbolsTypes;
	configurationData.symbols_types = symbolsTypes;

	if (!configurationData.supports_search && !configurationData.supports_group_request) {
		throw "Unsupported datafeed configuration. Must either support search, or support group request";
	}

	if (!configurationData.supports_search) {
		this._symbolSearch = new Datafeeds.SymbolSearchComponent(this);
	}

	if (configurationData.supports_group_request) {
		//	this component will call onInitialized() by itself
		this._symbolsStorage = new Datafeeds.SymbolsStorage(this);
	}
	else {
		this.onInitialized();
	}

	this._fireEvent("configuration_ready");
	this._logMessage("Initialized with " + JSON.stringify(configurationData));
};


//	===============================================================================================================================
//	The functions set below is the implementation of JavaScript API.

Datafeeds.UDFCompatibleDatafeed.prototype.getMarks = function (symbolInfo, rangeStart, rangeEnd, onDataCallback, resolution) {
	if (this._configuration.supports_marks) {
		// onDataCallback({"id":[0,1,2,3,4,5],
		// "time":[1455148800,1455235200,1454976000,1454976000,1454284800,1452988800],
		// "color":["red","blue","green","red","blue","green"],
		// "text":["今天1",
		//   "测试2",
		//   "测试3",
		//   "测试4",
		//   "测试5",
		//   "测试6"],
		//   "label":["A",
		// 	"B",
		// 	"CORE",
		// 	"D",
		// 	"EURO",
		// 	"F"],
		// 	"labelFontColor":["white",
		// 	  "white",
		// 	  "red",
		// 	  "#FFFFFF",
		// 	  "white",
		// 	  "#000"],
		// 	  "minSize":[14,28,7,40,7,14]})
		// this._send(this._datafeedURL + "/marks", {
		// 		symbol: symbolInfo.ticker.toUpperCase(),
		// 		from : rangeStart,
		// 		to: rangeEnd,
		// 		resolution: resolution
		// 	})
		// 	.done(function (response) {
		// 		onDataCallback(JSON.parse(response));
		// 	})
		// 	.fail(function() {
		// 		onDataCallback([]);
		// 	});
	}
};

Datafeeds.UDFCompatibleDatafeed.prototype.getTimescaleMarks = function (symbolInfo, rangeStart, rangeEnd, onDataCallback, resolution) {
	if (this._configuration.supports_timescale_marks) {
		// onDataCallback([{"id":"tsm1",
		// "time":1455580800,
		// "color":"red",
		// "label":"A",
		// "tooltip":""},
		// {"id":"tsm2",
		//   "time":1455235200,
		//   "color":"blue",
		//   "label":"D",
		//   "tooltip":["Dividends: $0.56","Date: Fri Feb 12 2016这是测试数据"]},
		//   {"id":"tsm3",
		// 	"time":1454976000,
		// 	"color":"green",
		// 	"label":"D",
		// 	"tooltip":["Dividends: $3.46","Date: Tue Feb 09 2016"]},
		// 	{"id":"tsm4",
		// 	  "time":1454284800,
		// 	  "color":"#999999",
		// 	  "label":"E",
		// 	  "tooltip":["Earnings: $3.44","Estimate: $3.60"]},
		// 	  {"id":"tsm7",
		// 		"time":1452988800,
		// 		"color":"red",
		// 		"label":"E",
		// 		"tooltip":["Earnings: $5.40","Estimate: $5.00"]}])
		// this._send(this._datafeedURL + "/timescale_marks", {
		// 	symbol: symbolInfo.ticker.toUpperCase(),
		// 	from : rangeStart,
		// 	to: rangeEnd,
		// 	resolution: resolution
		// })
		// 	.done(function (response) {
		// 		onDataCallback(JSON.parse(response));
		// 	})
		// 	.fail(function() {
		// 		onDataCallback([]);
		// 	});
	}
};

Datafeeds.UDFCompatibleDatafeed.prototype.searchSymbolsByName = function(ticker, exchange, type, onResultReadyCallback) {
	var MAX_SEARCH_RESULTS = 30;

	if (!this._configuration) {
		onResultReadyCallback([]);
		return;
	}

	if (this._configuration.supports_search) {

		this._send(this._datafeedURL + "/search", {
				limit: MAX_SEARCH_RESULTS,
				query: ticker.toUpperCase(),
				type: type,
				exchange: exchange
			})
			.done(function (response) {
				var data = JSON.parse(response);

				for (var i = 0; i < data.length; ++i) {
					if (!data[i].params) {
						data[i].params = [];
					}
				}

				if (typeof data.s == "undefined" || data.s != "error") {
					onResultReadyCallback(data);
				}
				else {
					onResultReadyCallback([]);
				}

			})
			.fail(function(reason) {
				onResultReadyCallback([]);
			});
	}
	else {

		if (!this._symbolSearch) {
			throw "Datafeed error: inconsistent configuration (symbol search)";
		}

		var searchArgument = {
			ticker: ticker,
			exchange: exchange,
			type: type,
			onResultReadyCallback: onResultReadyCallback
		};

		if (this._initializationFinished) {
			this._symbolSearch.searchSymbolsByName(searchArgument, MAX_SEARCH_RESULTS);
		}
		else {

			var that = this;

			this.on("initialized", function() {
				that._symbolSearch.searchSymbolsByName(searchArgument, MAX_SEARCH_RESULTS);
			});
		}
	}
};


Datafeeds.UDFCompatibleDatafeed.prototype._symbolResolveURL = "/symbols";


//	BEWARE: this function does not consider symbol's exchange
Datafeeds.UDFCompatibleDatafeed.prototype.resolveSymbol = function(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
	console.log(symbolName)
	var that = this;
	setTimeout(function(){
		if (!that._initializationFinished) {
			thithats.on("initialized", function() {
				that.resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback);
			});

			return;
		}

		var resolveRequestStartTime = Date.now();
		that._logMessage("Resolve requested");

		function onResultReady(data) {
			var postProcessedData = data;
			if (that.postProcessSymbolInfo) {
				postProcessedData = that.postProcessSymbolInfo(postProcessedData);
			}

			that._logMessage("Symbol resolved: " + (Date.now() - resolveRequestStartTime));

			onSymbolResolvedCallback(postProcessedData);
		}

		if (!that._configuration.supports_group_request) {
			
			onResultReady({
				"name":that.data_info.jichubizhong + that.data_info.jijiabizhong,
				"exchange-traded":"COODEX",
				"exchange-listed":"COODEX",
				"timezone":"Asia/Shanghai",
				"minmov":1,
				"minmov2":0,
				"pricescale":10000,
				"pointvalue":1,
				"session": "24x7",
				"has_intraday":true,
				"has_no_volume":false,
				"has_weekly_and_monthly": true,
				"ticker":"COODEX",
				"description":that.data_info.jichubizhong + that.data_info.jijiabizhong,
				"type":"stock",
				"regular_session": "24x7",
				"supported_resolutions":['1','5','15', '30', '60', '120','240','360','720', '1D','1W', '1M']}
		);
			// this._send(this._datafeedURL + this._symbolResolveURL, {
			// 		symbol: symbolName ? symbolName.toUpperCase() : ""
			// 	})
			// 	.done(function (response) {
			// 		var data = JSON.parse(response);

			// 		if (data.s && data.s != "ok") {
			// 			onResolveErrorCallback("unknown_symbol");
			// 		}
			// 		else {
			// 			onResultReady(data);
			// 		}
			// 	})
			// 	.fail(function(reason) {
			// 		that._logMessage("Error resolving symbol: " + JSON.stringify([reason]));
			// 		onResolveErrorCallback("unknown_symbol");
			// 	});
		}
		else {
			if (that._initializationFinished) {
				that._symbolsStorage.resolveSymbol(symbolName, onResultReady, onResolveErrorCallback);
			}
			else {
				that.on("initialized", function() {
					that._symbolsStorage.resolveSymbol(symbolName, onResultReady, onResolveErrorCallback);
				});
			}
		}
	},0)
	
};


Datafeeds.UDFCompatibleDatafeed.prototype._historyURL = "/history";

Datafeeds.UDFCompatibleDatafeed.prototype.getBars = function(symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback) {


	//	timestamp sample: 1399939200
	if (rangeStartDate > 0 && (rangeStartDate + "").length > 10) {
		throw ["Got a JS time instead of Unix one.", rangeStartDate, rangeEndDate];
	}

	var that = this;
	console.log(that)

	var requestStartTime = Date.now();
	console.log(rangeStartDate,rangeEndDate)
	// this._send(this._datafeedURL + this._historyURL, {
	// 		symbol: symbolInfo.ticker.toUpperCase(),
	// 		resolution: resolution,
	// 		from: rangeStartDate,
	// 		to: rangeEndDate
	// })
	// .done(function (response) {

		var data = {
			"t": [
				1494288000,
				1494374400,
				1494460800,
				1494547200,
				1494806400,
				1494892800,
				1494979200,
				1495065600,
				1495152000,
				1495411200,
				1495497600,
				1495584000,
				1495670400,
				1495756800,
				1496102400,
				1496188800,
				1496275200,
				1496361600,
				1496620800,
				1496707200,
				1496793600,
				1496880000,
				1496966400,
				1497225600,
				1497312000,
				1497398400,
				1497484800,
				1497571200,
				1497830400,
				1497916800,
				1498003200,
				1498089600,
				1498176000,
				1498435200,
				1498521600,
				1498608000,
				1498694400,
				1498780800,
				1499040000,
				1499212800,
				1499299200,
				1499385600,
				1499644800,
				1499731200,
				1499817600,
				1499904000,
				1499990400,
				1500249600,
				1500336000,
				1500422400,
				1500508800,
				1500595200,
				1500854400,
				1500940800,
				1501027200,
				1501113600,
				1501200000,
				1501459200,
				1501545600,
				1501632000,
				1501718400,
				1501804800,
				1502064000,
				1502150400,
				1502236800,
				1502323200,
				1502409600,
				1502668800,
				1502755200,
				1502841600,
				1502928000,
				1503014400,
				1503273600,
				1503360000,
				1503446400,
				1503532800,
				1503619200,
				1503878400,
				1503964800,
				1504051200,
				1504137600,
				1504224000,
				1504569600,
				1504656000,
				1504742400,
				1504828800,
				1505088000,
				1505174400,
				1505260800,
				1505347200,
				1505433600,
				1505692800,
				1505779200,
				1505865600,
				1505952000,
				1506038400,
				1506297600,
				1506384000,
				1506470400,
				1506556800,
				1506643200,
				1506902400,
				1506988800,
				1507075200,
				1507161600,
				1507248000,
				1507507200,
				1507593600,
				1507680000,
				1507766400,
				1507852800,
				1508112000,
				1508198400,
				1508284800,
				1508371200,
				1508457600,
				1508716800,
				1508803200,
				1508889600,
				1508976000,
				1509062400,
				1509321600,
				1509408000,
				1509494400,
				1509580800,
				1509667200,
				1509926400,
				1510012800,
				1510185600,
				1510272000,
				1510531200,
				1510617600,
				1510704000,
				1510790400,
				1510876800,
				1511136000,
				1511222400,
				1511308800,
				1511481600,
				1511740800,
				1511827200,
				1511913600,
				1512000000,
				1512086400,
				1512345600,
				1512432000,
				1512518400,
				1512604800,
				1512691200,
				1512950400,
				1513036800,
				1513123200,
				1513209600,
				1513296000,
				1513555200,
				1513641600,
				1513728000,
				1513814400,
				1513900800,
				1514246400,
				1514332800,
				1514419200,
				1514505600,
				1514851200,
				1514937600,
				1515024000,
				1515110400,
				1515369600,
				1515456000,
				1515542400,
				1515628800,
				1515715200,
				1516060800,
				1516147200,
				1516233600,
				1516320000,
				1516579200,
				1516665600,
				1516752000,
				1516838400,
				1516924800,
				1517184000,
				1517270400,
				1517356800,
				1517443200,
				1517529600,
				1517788800,
				1517875200,
				1517961600,
				1518048000,
				1518134400,
				1518393600,
				1518480000,
				1518566400,
				1518652800,
				1518739200,
				1519084800,
				1519171200,
				1519257600,
				1519344000,
				1519603200,
				1519689600,
				1519776000,
				1519862400,
				1519948800,
				1520208000,
				1520294400,
				1520380800,
				1520467200,
				1520553600,
				1520812800,
				1520899200,
				1520985600,
				1521072000,
				1521158400,
				1521417600,
				1521504000,
				1521590400,
				1521676800,
				1521763200,
				1522022400,
				1522108800
			],
			"o": [
				31.22,
				30.95,
				31.23,
				31,
				32.17,
				32.1,
				31.88,
				31.45,
				32.16,
				32.65,
				32.98,
				33.27,
				33.68,
				32.87,
				33.03,
				32.88,
				32.84,
				32.39,
				32.65,
				33.11,
				33.15,
				32.6,
				33.64,
				32.82,
				31.97,
				32.57,
				31.12,
				30.8,
				30.37,
				30.69,
				30.59,
				29.81,
				30.13,
				31.19,
				31.6,
				32.1,
				33.11,
				33.16,
				32.94,
				34.17,
				33.61,
				34,
				33.91,
				34.22,
				35.25,
				35.45,
				36.2,
				36.44,
				36.4,
				36.61,
				35.95,
				36.55,
				36.59,
				37.07,
				37.42,
				36.84,
				36.17,
				35.97,
				36.46,
				36.27,
				37.28,
				37.34,
				38,
				38.5,
				39.21,
				38.12,
				37.21,
				38.11,
				37.3,
				37.96,
				39,
				37.88,
				38.19,
				38.74,
				39.56,
				40.88,
				41.68,
				41.43,
				41.66,
				43.23,
				43.67,
				44.21,
				45.08,
				44.4,
				44.16,
				44.37,
				43.25,
				44.59,
				44.61,
				44.48,
				44.76,
				44.8,
				45.22,
				46.98,
				47.11,
				45.31,
				45.33,
				45.11,
				45.28,
				45.07,
				46.45,
				46.43,
				47.97,
				48.27,
				48.08,
				47.89,
				47.63,
				47.28,
				46.72,
				46.95,
				48.32,
				48,
				48.65,
				47.38,
				46.5,
				47.13,
				48.04,
				48.13,
				49.73,
				49.52,
				47.835,
				47.75,
				47.15,
				48.91,
				47.68,
				47.25,
				47.2,
				47.11,
				44.71,
				42.93,
				42.7,
				42.9,
				41.27,
				42.68,
				42,
				42.29,
				42.73,
				41.84,
				42.8,
				42.15,
				41.81,
				42.19,
				41.5,
				41.82,
				41.87,
				41.37,
				40.8,
				41.13,
				41,
				41.54,
				42.39,
				42.45,
				42.05,
				42.85,
				42.775,
				44.77,
				48.191,
				49.57,
				49.15,
				49.98,
				50.55,
				52.05,
				54,
				54.06,
				54.92,
				54.81,
				54.65,
				53.96,
				55,
				54.37,
				56.6,
				57.05,
				56.09,
				56.03,
				53.67,
				52.86,
				52.8,
				52.34,
				52.9,
				53.74,
				53.55,
				53.89,
				53.67,
				52.75,
				51.41,
				52,
				48.61,
				47.44,
				49.23,
				47.81,
				46.54,
				46.05,
				46.39,
				46.71,
				48.99,
				47.5,
				46.84,
				48.21,
				48.01,
				48.06,
				47.42,
				46.5,
				46.25,
				45.93,
				44.72,
				45.18,
				46.19,
				46.6,
				47.88,
				48.05,
				48.01,
				48.43,
				49.09,
				46.45,
				46.8,
				47.03,
				46.37,
				46.42,
				47.4,
				45.17,
				45.26,
				46.25
			],
			"h": [
				31.24,
				31.46,
				31.31,
				32.13,
				32.5,
				32.4,
				32.22,
				32.17,
				32.88,
				33.2,
				33.36,
				33.92,
				34.09,
				33.36,
				33.16,
				33.05,
				33.45,
				33,
				33.58,
				33.49,
				33.17,
				33.65,
				34,
				33.21,
				32.548,
				32.68,
				31.45,
				30.8625,
				31.3,
				31.095,
				30.59,
				30.25,
				31.43,
				31.295,
				32.5,
				33,
				33.34,
				33.45,
				34.3,
				34.255,
				35.38,
				34.37,
				34.45,
				35.08,
				35.47,
				36.38,
				36.44,
				36.69,
				36.48,
				36.62,
				37.31,
				36.8585,
				36.88,
				37.38,
				37.61,
				37.07,
				36.32,
				36.44,
				36.74,
				37.33,
				37.6,
				37.5,
				38.47,
				40.3621,
				39.45,
				38.78,
				37.91,
				38.1584,
				37.98,
				39.33,
				39,
				38.21,
				38.66,
				40.1299,
				41.44,
				41.55,
				41.8,
				42.26,
				43.18,
				44.1,
				44,
				45.22,
				45.12,
				44.5,
				44.9,
				44.37,
				44.49,
				45.2,
				45.07,
				45,
				45.09,
				45.09,
				46.44,
				47.95,
				47.25,
				45.78,
				45.7,
				45.52,
				45.56,
				46.46,
				47,
				48.03,
				48.33,
				49.3,
				48.7293,
				47.89,
				47.72,
				47.45,
				47,
				47.77,
				48.6299,
				48.93,
				48.72,
				47.84,
				47.74,
				48.13,
				48.56,
				50.31,
				49.8799,
				49.73,
				48.25,
				48.38,
				48.07,
				49.27,
				47.7671,
				47.43,
				47.68,
				47.2042,
				44.71,
				44.46,
				43.87,
				42.9,
				42.37,
				43.08,
				43.6,
				42.55,
				42.73,
				42.68,
				42.9,
				42.42,
				43.75,
				42.32,
				42.16,
				42.3,
				42.6,
				41.86,
				41.49,
				41.19,
				41.77,
				42.98,
				42.88,
				42.57,
				42.375,
				43.14,
				44.69,
				46.54,
				49.67,
				49.68,
				50.04,
				50.5,
				51.93,
				54.2,
				54.61,
				55.22,
				55.15,
				55.43,
				54.66,
				56.15,
				55.08,
				56.26,
				57.13,
				57.5,
				57.04,
				57.0399,
				53.87,
				53.68,
				53.9,
				52.9,
				53.8525,
				53.89,
				54.4,
				54.6299,
				53.97,
				53.36,
				52.5,
				52,
				50.75,
				50.2,
				49.42,
				48.24,
				47.06,
				47.13,
				47.98,
				48.65,
				48.99,
				50.18,
				48.7399,
				48.95,
				48.4,
				48.14,
				47.58,
				47.17,
				46.84,
				46.44,
				46.18,
				46.46,
				47.52,
				48.26,
				48.73,
				48.59,
				48.6799,
				49.85,
				49.43,
				47.13,
				47.9186,
				47.68,
				47.06,
				48.0615,
				48.089,
				46,
				46.53,
				46.49
			],
			"l": [
				30.46,
				30.7,
				30.45,
				30.96,
				31.97,
				31.75,
				31.58,
				31.1,
				32.1,
				32.47,
				32.56,
				33.045,
				33.03,
				32.87,
				32.53,
				31.76,
				32.45,
				32.35,
				32.65,
				32.78,
				32.4,
				32.59,
				32.85,
				31.63,
				31.55,
				31.21,
				30.61,
				29.55,
				30.16,
				30.41,
				29.6346,
				29.66,
				29.79,
				30.65,
				31.49,
				31.93,
				32.61,
				32.535,
				32.915,
				33.57,
				33.6,
				33.265,
				33.68,
				33.99,
				34.44,
				35.43,
				35.98,
				36.205,
				35.8,
				36.07,
				35.95,
				36.5055,
				36.51,
				36.865,
				36.56,
				36.085,
				35.54,
				35.665,
				35.91,
				36.2,
				36.94,
				36.73,
				37.61,
				38.36,
				38.4,
				37.715,
				36.93,
				37.1247,
				37.14,
				37.9101,
				37.75,
				37.34,
				38.05,
				38.73,
				39.45,
				40.56,
				40.84,
				41.05,
				41.38,
				42.991,
				43.18,
				44.13,
				43.7,
				43.3,
				44.0401,
				42.24,
				43.13,
				44.33,
				44.36,
				43.75,
				44.22,
				44.66,
				44.86,
				46.53,
				45.97,
				44.67,
				44.62,
				44.72,
				44.48,
				44.81,
				45.9,
				46.41,
				47.44,
				47.75,
				47.65,
				47.3,
				46.58,
				46.58,
				46.21,
				46.8,
				47.6,
				47.48,
				47.42,
				46.51,
				46.01,
				47.06,
				47.83,
				48.06,
				48.51,
				48.52,
				47.01,
				47.37,
				46.38,
				47.45,
				47.07,
				46.71,
				46.53,
				46.54,
				43.11,
				42.75,
				42.55,
				40.62,
				40.73,
				42.06,
				42,
				41.75,
				40.22,
				41.775,
				42.09,
				41.49,
				41.2099,
				40.8,
				41.13,
				40.521,
				41.5,
				40.95,
				40.3,
				40.27,
				40.9,
				41.54,
				42.185,
				41.715,
				41.96,
				42.28,
				42.76,
				44.66,
				47.6287,
				48.77,
				48.81,
				49.21,
				50.2,
				52.021,
				53.52,
				53.91,
				52.96,
				54.075,
				53.41,
				53.66,
				54,
				54.23,
				55.87,
				56.11,
				55.46,
				55.58,
				51.72,
				52.55,
				52.261,
				51.73,
				52.39,
				52.72,
				53.28,
				53.52,
				52.52,
				51.25,
				51.27,
				49,
				47.8,
				47.28,
				47.67,
				45.53,
				44.15,
				45.77,
				46.12,
				46.52,
				46.1901,
				46.52,
				46.76,
				47.23,
				46.83,
				46.5841,
				46.14,
				45.657,
				44.94,
				44.58,
				44.14,
				44.85,
				46.03,
				46.4006,
				46.545,
				47.23,
				47.91,
				48.43,
				46.21,
				45.71,
				46.74,
				45.76,
				46.05,
				46.31,
				44.86,
				44.6,
				44.2698,
				44.635
			],
			"c": [
				30.82,
				31.08,
				31.16,
				31.79,
				32.03,
				32.16,
				31.63,
				31.92,
				32.29,
				32.96,
				33.26,
				33.51,
				33.09,
				33.27,
				32.99,
				32.94,
				32.94,
				32.86,
				33.32,
				32.94,
				32.82,
				33.5,
				33.01,
				31.78,
				32.48,
				31.54,
				30.74,
				30,
				30.89,
				30.45,
				29.69,
				29.8,
				31.09,
				31.18,
				31.63,
				32.95,
				33.18,
				32.65,
				34.02,
				33.77,
				33.89,
				34.19,
				34.14,
				35,
				34.6,
				36.01,
				36.32,
				36.4,
				36.43,
				36.5,
				36.72,
				36.62,
				36.69,
				37.3,
				36.63,
				36.36,
				35.64,
				36.4,
				36.38,
				37.28,
				37.09,
				37.42,
				37.99,
				39.58,
				38.62,
				37.78,
				37.78,
				37.19,
				37.5,
				39.23,
				37.8,
				37.76,
				38.47,
				39.77,
				41.06,
				41.34,
				41.21,
				42.17,
				43,
				43.09,
				43.88,
				45.04,
				44.42,
				44.43,
				44.73,
				42.61,
				43.6,
				45,
				44.91,
				44.8,
				44.65,
				44.91,
				46.2,
				47.5,
				46.25,
				45.38,
				45.29,
				44.74,
				45.07,
				46.08,
				46.62,
				47.65,
				48.31,
				47.91,
				48.25,
				47.49,
				47.07,
				46.89,
				46.94,
				47.53,
				47.71,
				48.24,
				47.77,
				47.75,
				46.54,
				47.93,
				47.93,
				50.08,
				49.55,
				49.15,
				47.91,
				47.42,
				47.78,
				47.7,
				47.46,
				47.12,
				47.29,
				46.97,
				43.33,
				43.01,
				43.13,
				41.87,
				42.21,
				42.3,
				43.4,
				42.21,
				41.39,
				42.64,
				42.21,
				42.04,
				43.3,
				41.24,
				41.51,
				41.64,
				41.79,
				41.18,
				41.31,
				40.6,
				41.4,
				42.24,
				42.4,
				41.86,
				42.35,
				42.61,
				44.57,
				46.52,
				49.26,
				48.99,
				49.99,
				50.38,
				51.84,
				54.14,
				53.87,
				55.17,
				54.5,
				54.7,
				54.09,
				55,
				54.2,
				56.17,
				56.91,
				56.76,
				56.24,
				56.99,
				53,
				53.1,
				52.94,
				52.49,
				53.3,
				53.11,
				54,
				54.49,
				52.52,
				52.02,
				52.42,
				49.09,
				48.46,
				49.43,
				47.7,
				45.98,
				45.92,
				46.65,
				47.3,
				48.54,
				47.57,
				47.36,
				48.07,
				47.55,
				48.01,
				46.7,
				46.68,
				46.22,
				44.97,
				45.07,
				45.54,
				45.65,
				46.99,
				47.88,
				47.47,
				47.86,
				48.36,
				48.59,
				46.57,
				46.93,
				47.23,
				46.36,
				46.47,
				47.95,
				44.92,
				44.71,
				45.77,
				44.9
			],
			"v": [
				3413988,
				3486451,
				4109259,
				3379716,
				2383950,
				2993409,
				3707349,
				2394271,
				2606084,
				3402047,
				2949100,
				3338172,
				2321565,
				2369666,
				3215090,
				4491991,
				2372191,
				2633226,
				2604958,
				2295347,
				3329688,
				3274208,
				3063086,
				4709295,
				2995123,
				3714380,
				3224303,
				4741975,
				3909102,
				2566746,
				3485500,
				2906662,
				6287723,
				2935982,
				5463485,
				3764296,
				3730077,
				3014777,
				3112086,
				4006069,
				6220940,
				3772263,
				3036347,
				4244142,
				4134442,
				5277848,
				3966487,
				3453010,
				3049846,
				4431844,
				4745762,
				2449086,
				2244773,
				3403471,
				3390179,
				2044059,
				2851126,
				2137320,
				1918688,
				2962758,
				2884558,
				2285810,
				4914994,
				8674921,
				3692522,
				3515585,
				2936153,
				2129458,
				1826477,
				4295678,
				3272834,
				2028802,
				2331799,
				3867097,
				4820314,
				3103742,
				2729842,
				2678449,
				3890419,
				5502878,
				4088495,
				3374580,
				5222978,
				3419529,
				3326446,
				7296016,
				4173996,
				4826286,
				3351512,
				4449460,
				5385078,
				3224767,
				4854097,
				5852935,
				3687387,
				3089145,
				3071243,
				4539017,
				2391140,
				5281047,
				3822240,
				4037598,
				3305104,
				4124236,
				3191480,
				3963440,
				2235611,
				3578552,
				2727964,
				2847149,
				3275773,
				4674758,
				3955418,
				4606081,
				5876010,
				4204274,
				4019535,
				6692106,
				3108193,
				3463408,
				3854884,
				2068082,
				2717532,
				3174620,
				2057632,
				1837775,
				1725268,
				2163621,
				7661245,
				4441527,
				3162683,
				8095739,
				4726434,
				3328098,
				3569042,
				4844213,
				6257368,
				3252334,
				1306136,
				3091740,
				6890455,
				4938497,
				4371334,
				3750919,
				2709750,
				2852505,
				5437502,
				3423427,
				3696876,
				4053037,
				3421527,
				4146231,
				3683921,
				4516172,
				3149371,
				5960166,
				7158759,
				3046872,
				2427508,
				2750631,
				2959469,
				5696354,
				5170353,
				2928905,
				4097542,
				3555120,
				3370371,
				5028059,
				3532952,
				5004005,
				2725478,
				4191608,
				3824593,
				7635962,
				19419475,
				5753662,
				4174194,
				4883081,
				2520675,
				3744040,
				2745616,
				4630861,
				3612659,
				4470149,
				3175232,
				6057643,
				3861760,
				3140711,
				3175247,
				3896943,
				4569076,
				3495865,
				2805323,
				2427324,
				5101632,
				8372208,
				4581817,
				3185582,
				4217919,
				3083368,
				3553755,
				3223727,
				2829506,
				6501728,
				3707749,
				4587974,
				4430024,
				3654749,
				3105316,
				2761992,
				1489039,
				2738974,
				3696049,
				2998802,
				2815649,
				2498132,
				1506443,
				2104409,
				4312329,
				3221848,
				5152476,
				2889304
			],
			"s": "ok"
		};

		var nodata = data.s == "no_data";

		if (data.s != "ok" && !nodata) {
			if (!!onErrorCallback) {
				onErrorCallback(data.s);
			}
			return;
		}

		var bars = [];

		//	data is JSON having format {s: "status" (ok, no_data, error),
		//  v: [volumes], t: [times], o: [opens], h: [highs], l: [lows], c:[closes], nb: "optional_unixtime_if_no_data"}
		var barsCount = nodata ? 0 : data.t.length;

		var volumePresent = typeof data.v != "undefined";
		var ohlPresent = typeof data.o != "undefined";

		for (var i = 0; i < barsCount; ++i) {

			var barValue = {
				time: data.t[i] * 1000,
				close: data.c[i]
			};

			if (ohlPresent) {
				barValue.open = data.o[i];
				barValue.high = data.h[i];
				barValue.low = data.l[i];
			}
			else {
				barValue.open = barValue.high = barValue.low = barValue.close;
			}

			if (volumePresent) {
				barValue.volume = data.v[i];
			}

			bars.push(barValue);
		}
		console.log(bars)
		
		onDataCallback(bars, {version: that._protocolVersion, noData: nodata, nextTime: data.nb || data.nextTime});
	// })
	// .fail(function (arg) {
	// 	console.warn(["getBars(): HTTP error", arg]);

	// 	if (!!onErrorCallback) {
	// 		onErrorCallback("network error: " + JSON.stringify(arg));
	// 	}
	// });
};


Datafeeds.UDFCompatibleDatafeed.prototype.subscribeBars = function(symbolInfo, resolution, onRealtimeCallback, listenerGUID) {
	this._barsPulseUpdater.subscribeDataListener(symbolInfo, resolution, onRealtimeCallback, listenerGUID);
};

Datafeeds.UDFCompatibleDatafeed.prototype.unsubscribeBars = function(listenerGUID) {
	this._barsPulseUpdater.unsubscribeDataListener(listenerGUID);
};

Datafeeds.UDFCompatibleDatafeed.prototype.calculateHistoryDepth = function(period, resolutionBack, intervalBack) {
};

Datafeeds.UDFCompatibleDatafeed.prototype.getQuotes = function(symbols, onDataCallback, onErrorCallback) {
	this._send(this._datafeedURL + "/quotes", { symbols: symbols })
		.done(function (response) {
			var data = JSON.parse(response);
			if (data.s == "ok") {
				//	JSON format is {s: "status", [{s: "symbol_status", n: "symbol_name", v: {"field1": "value1", "field2": "value2", ..., "fieldN": "valueN"}}]}
				if (onDataCallback) {
					onDataCallback(data.d);
				}
			} else {
				if (onErrorCallback) {
					onErrorCallback(data.errmsg);
				}
			}
		})
		.fail(function (arg) {
			if (onErrorCallback) {
				onErrorCallback("network error: " + arg);
			}
		});
};

Datafeeds.UDFCompatibleDatafeed.prototype.subscribeQuotes = function(symbols, fastSymbols, onRealtimeCallback, listenerGUID) {
	this._quotesPulseUpdater.subscribeDataListener(symbols, fastSymbols, onRealtimeCallback, listenerGUID);
};

Datafeeds.UDFCompatibleDatafeed.prototype.unsubscribeQuotes = function(listenerGUID) {
	this._quotesPulseUpdater.unsubscribeDataListener(listenerGUID);
};

//	==================================================================================================================================================
//	==================================================================================================================================================
//	==================================================================================================================================================

/*
	It's a symbol storage component for ExternalDatafeed. This component can
	  * interact to UDF-compatible datafeed which supports whole group info requesting
	  * do symbol resolving -- return symbol info by its name
*/
Datafeeds.SymbolsStorage = function(datafeed) {
	this._datafeed = datafeed;

	this._exchangesList = ["NYSE", "FOREX", "AMEX"];
	this._exchangesWaitingForData = {};
	this._exchangesDataCache = {};

	this._symbolsInfo = {};
	this._symbolsList = [];

	this._requestFullSymbolsList();
};



Datafeeds.SymbolsStorage.prototype._requestFullSymbolsList = function() {

	var that = this;
	var datafeed = this._datafeed;

	for (var i = 0; i < this._exchangesList.length; ++i) {

		var exchange = this._exchangesList[i];

		if (this._exchangesDataCache.hasOwnProperty(exchange)) {
			continue;
		}

		this._exchangesDataCache[exchange] = true;

		this._exchangesWaitingForData[exchange] = "waiting_for_data";

		this._datafeed._send(this._datafeed._datafeedURL + "/symbol_info", {
				group: exchange
			})
			.done(function(exchange) {
				return function(response) {
					that._onExchangeDataReceived(exchange, JSON.parse(response));
					that._onAnyExchangeResponseReceived(exchange);
				};
			}(exchange)) //jshint ignore:line
			.fail(function(exchange) {
				return function (reason) {
					that._onAnyExchangeResponseReceived(exchange);
				};
			}(exchange)); //jshint ignore:line
	}
};



Datafeeds.SymbolsStorage.prototype._onExchangeDataReceived = function(exchangeName, data) {

	function tableField(data, name, index) {
		return data[name] instanceof Array ?
			data[name][index] :
			data[name];
	}

	try
	{
		for (var symbolIndex = 0; symbolIndex < data.symbol.length; ++symbolIndex) {

			var symbolName = data.symbol[symbolIndex];
			var listedExchange = tableField(data, "exchange-listed", symbolIndex);
			var tradedExchange = tableField(data, "exchange-traded", symbolIndex);
			var fullName = tradedExchange + ":" + symbolName;

			//	This feature support is not implemented yet
			//	var hasDWM = tableField(data, "has-dwm", symbolIndex);

			var hasIntraday = tableField(data, "has-intraday", symbolIndex);

			var tickerPresent = typeof data.ticker != "undefined";

			var symbolInfo = {
				name: symbolName,
				base_name: [listedExchange + ":" + symbolName],
				description: tableField(data, "description", symbolIndex),
				full_name: fullName,
				legs: [fullName],
				has_intraday: hasIntraday,
				has_no_volume: tableField(data, "has-no-volume", symbolIndex),
				listed_exchange: listedExchange,
				exchange: tradedExchange,
				minmov: tableField(data, "minmovement", symbolIndex) || tableField(data, "minmov", symbolIndex) ,
				minmove2: tableField(data, "minmove2", symbolIndex) || tableField(data, "minmov2", symbolIndex) ,
				fractional: tableField(data, "fractional", symbolIndex),
				pointvalue: tableField(data, "pointvalue", symbolIndex),
				pricescale: tableField(data, "pricescale", symbolIndex),
				type: tableField(data, "type", symbolIndex),
				session: tableField(data, "session-regular", symbolIndex),
				ticker: tickerPresent ? tableField(data, "ticker", symbolIndex) : symbolName,
				timezone: tableField(data, "timezone", symbolIndex),
				supported_resolutions: tableField(data, "supported-resolutions", symbolIndex) || this._datafeed.defaultConfiguration().supported_resolutions,
				force_session_rebuild: tableField(data, "force-session-rebuild", symbolIndex) || false,
				has_daily: tableField(data, "has-daily", symbolIndex) || true,
				intraday_multipliers: tableField(data, "intraday-multipliers", symbolIndex) || ['1','5','15', '30', '60', '120','240','360','720', '1D','1W', '1M'],
				has_fractional_volume: tableField(data, "has-fractional-volume", symbolIndex) || false,
				has_weekly_and_monthly: tableField(data, "has-weekly-and-monthly", symbolIndex) || false,
				has_empty_bars: tableField(data, "has-empty-bars", symbolIndex) || false,
				volume_precision: tableField(data, "volume-precision", symbolIndex) || 0
			};

			this._symbolsInfo[symbolInfo.ticker] = this._symbolsInfo[symbolName] = this._symbolsInfo[fullName] = symbolInfo;
			this._symbolsList.push(symbolName);
		}
	}
	catch (error) {
		throw "API error when processing exchange `" + exchangeName + "` symbol #" + symbolIndex + ": " + error;
	}
};


Datafeeds.SymbolsStorage.prototype._onAnyExchangeResponseReceived = function(exchangeName) {

	delete this._exchangesWaitingForData[exchangeName];

	var allDataReady = Object.keys(this._exchangesWaitingForData).length === 0;

	if (allDataReady) {
		this._symbolsList.sort();
		this._datafeed._logMessage("All exchanges data ready");
		this._datafeed.onInitialized();
	}
};


//	BEWARE: this function does not consider symbol's exchange
Datafeeds.SymbolsStorage.prototype.resolveSymbol = function(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {

	if (!this._symbolsInfo.hasOwnProperty(symbolName)) {
		onResolveErrorCallback("invalid symbol");
	}
	else {
		onSymbolResolvedCallback(this._symbolsInfo[symbolName]);
	}

};


//	==================================================================================================================================================
//	==================================================================================================================================================
//	==================================================================================================================================================

/*
	It's a symbol search component for ExternalDatafeed. This component can do symbol search only.
	This component strongly depends on SymbolsDataStorage and cannot work without it. Maybe, it would be
	better to merge it to SymbolsDataStorage.
*/

Datafeeds.SymbolSearchComponent = function(datafeed) {
	this._datafeed = datafeed;
};



//	searchArgument = { ticker, onResultReadyCallback}
Datafeeds.SymbolSearchComponent.prototype.searchSymbolsByName = function(searchArgument, maxSearchResults) {

	if (!this._datafeed._symbolsStorage) {
		throw "Cannot use local symbol search when no groups information is available";
	}

	var symbolsStorage = this._datafeed._symbolsStorage;

	var results = [];
	var queryIsEmpty = !searchArgument.ticker || searchArgument.ticker.length === 0;

	for (var i = 0; i < symbolsStorage._symbolsList.length; ++i) {
		var symbolName = symbolsStorage._symbolsList[i];
		var item = symbolsStorage._symbolsInfo[symbolName];

		if (searchArgument.type && searchArgument.type.length > 0 && item.type != searchArgument.type) {
			continue;
		}
		if (searchArgument.exchange && searchArgument.exchange.length > 0 && item.exchange != searchArgument.exchange) {
			continue;
		}
		if (queryIsEmpty || item.name.indexOf(searchArgument.ticker) === 0) {
			results.push({
				symbol: item.name,
				full_name: item.full_name,
				description: item.description,
				exchange: item.exchange,
				params: [],
				type: item.type,
				ticker: item.name
			});
		}

		if (results.length >= maxSearchResults) {
			break;
		}
	}

	searchArgument.onResultReadyCallback(results);
};



//	==================================================================================================================================================
//	==================================================================================================================================================
//	==================================================================================================================================================

/*
	This is a pulse updating components for ExternalDatafeed. They emulates realtime updates with periodic requests.
*/

Datafeeds.DataPulseUpdater = function(datafeed, updateFrequency) {
	this._datafeed = datafeed;
	this._subscribers = {};

	this._requestsPending = 0;
	var that = this;

	var update = function() {
		if (that._requestsPending > 0) {
			return;
		}

		for (var listenerGUID in that._subscribers) {
			var subscriptionRecord = that._subscribers[listenerGUID];
			var resolution = subscriptionRecord.resolution;

			var datesRangeRight = parseInt((new Date().valueOf()) / 1000);

			//	BEWARE: please note we really need 2 bars, not the only last one
			//	see the explanation below. `10` is the `large enough` value to work around holidays
			var datesRangeLeft = datesRangeRight - that.periodLengthSeconds(resolution, 10);

			that._requestsPending++;

			(function(_subscriptionRecord) {

				that._datafeed.getBars(_subscriptionRecord.symbolInfo, resolution, datesRangeLeft, datesRangeRight, function(bars) {
					that._requestsPending--;

					//	means the subscription was cancelled while waiting for data
					if (!that._subscribers.hasOwnProperty(listenerGUID)) {
						return;
					}

					if (bars.length === 0) {
						return;
					}

					var lastBar = bars[bars.length - 1];
					if (!isNaN(_subscriptionRecord.lastBarTime) && lastBar.time < _subscriptionRecord.lastBarTime) {
						return;
					}

					var subscribers = _subscriptionRecord.listeners;

					//	BEWARE: this one isn't working when first update comes and this update makes a new bar. In this case
					//	_subscriptionRecord.lastBarTime = NaN
					var isNewBar = !isNaN(_subscriptionRecord.lastBarTime) && lastBar.time > _subscriptionRecord.lastBarTime;

					//	Pulse updating may miss some trades data (ie, if pulse period = 10 secods and new bar is started 5 seconds later after the last update, the
					//	old bar's last 5 seconds trades will be lost). Thus, at fist we should broadcast old bar updates when it's ready.
					if (isNewBar) {

						if (bars.length < 2) {
							throw "Not enough bars in history for proper pulse update. Need at least 2.";
						}

						var previousBar = bars[bars.length - 2];
						for (var i =0; i < subscribers.length; ++i) {
							subscribers[i](previousBar);
						}
					}

					_subscriptionRecord.lastBarTime = lastBar.time;

					for (var i =0; i < subscribers.length; ++i) {
						subscribers[i](lastBar);
					}
				},

				//	on error
				function() {
					that._requestsPending--;
				});
			})(subscriptionRecord); //jshint ignore:line

		}
	};

	if (typeof updateFrequency != "undefined" && updateFrequency > 0) {
		setInterval(update, updateFrequency);
	}
};


Datafeeds.DataPulseUpdater.prototype.unsubscribeDataListener = function(listenerGUID) {
	this._datafeed._logMessage("Unsubscribing " + listenerGUID);
	delete this._subscribers[listenerGUID];
};


Datafeeds.DataPulseUpdater.prototype.subscribeDataListener = function(symbolInfo, resolution, newDataCallback, listenerGUID) {

	this._datafeed._logMessage("Subscribing " + listenerGUID);

	var key = symbolInfo.name + ", " + resolution;

	if (!this._subscribers.hasOwnProperty(listenerGUID)) {

		this._subscribers[listenerGUID] = {
			symbolInfo: symbolInfo,
			resolution: resolution,
			lastBarTime: NaN,
			listeners: []
		};
	}

	this._subscribers[listenerGUID].listeners.push(newDataCallback);
};


Datafeeds.DataPulseUpdater.prototype.periodLengthSeconds = function(resolution, requiredPeriodsCount) {
	var daysCount = 0;

	if (resolution == "D") {
		daysCount = requiredPeriodsCount;
	}
	else if (resolution == "M") {
		daysCount = 31 * requiredPeriodsCount;
	}
	else if (resolution == "W") {
		daysCount = 7 * requiredPeriodsCount;
	}
	else {
		daysCount = requiredPeriodsCount * resolution / (24 * 60);
	}

	return daysCount * 24 * 60 * 60;
};


Datafeeds.QuotesPulseUpdater = function(datafeed) {
	this._datafeed = datafeed;
	this._subscribers = {};
	this._updateInterval = 60 * 1000;
	this._fastUpdateInterval = 10 * 1000;
	this._requestsPending = 0;

	var that = this;

	setInterval(function() {
		that._updateQuotes(function(subscriptionRecord) { return subscriptionRecord.symbols; });
	}, this._updateInterval);

	setInterval(function() {
		that._updateQuotes(function(subscriptionRecord) { return subscriptionRecord.fastSymbols.length > 0 ? subscriptionRecord.fastSymbols : subscriptionRecord.symbols; });
	}, this._fastUpdateInterval);
};

Datafeeds.QuotesPulseUpdater.prototype.subscribeDataListener = function(symbols, fastSymbols, newDataCallback, listenerGUID) {
	if (!this._subscribers.hasOwnProperty(listenerGUID)) {
		this._subscribers[listenerGUID] = {
			symbols: symbols,
			fastSymbols: fastSymbols,
			listeners: []
		};
	}
	this._subscribers[listenerGUID].listeners.push(newDataCallback);
};

Datafeeds.QuotesPulseUpdater.prototype.unsubscribeDataListener = function(listenerGUID) {
	delete this._subscribers[listenerGUID];
};

Datafeeds.QuotesPulseUpdater.prototype._updateQuotes = function(symbolsGetter) {
	if (this._requestsPending > 0) {
		return;
	}

	var that = this;
	for (var listenerGUID in this._subscribers) {
		this._requestsPending++;

		var subscriptionRecord = this._subscribers[listenerGUID];
		this._datafeed.getQuotes(symbolsGetter(subscriptionRecord),
			// onDataCallback
			function(subscribers, guid) {
				return function(data) {
					that._requestsPending--;

					// means the subscription was cancelled while waiting for data
					if (!that._subscribers.hasOwnProperty(guid)) {
						return;
					}

					for (var i =0; i < subscribers.length; ++i) {
						subscribers[i](data);
					}
				};
			}(subscriptionRecord.listeners, listenerGUID), //jshint ignore:line
			// onErrorCallback
			function (error) {
				that._requestsPending--;
			}); //jshint ignore:line
	}
};

export default Datafeeds;