"use strict";
/*
	This class implements interaction with UDF-compatible datafeed.

	See UDF protocol reference at
	https://github.com/tradingview/charting_library/wiki/UDF
*/
import axios from 'axios';
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
	callback(new Date().getTime())
	console.log(new Date().getTime())
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

console.log("========rangeStartDate"+rangeStartDate+"---------------rangeEndDate"+rangeEndDate)
	//	timestamp sample: 1399939200
	if (rangeStartDate > 0 && (rangeStartDate + "").length > 10) {
		throw ["Got a JS time instead of Unix one.", rangeStartDate, rangeEndDate];
	}

	var that = this;
	console.log(that)

	var requestStartTime = Date.now();
	console.log(rangeStartDate,rangeEndDate)
	let ss = new Date(rangeStartDate*1000);
	let aa = new Date(rangeEndDate*1000);
	axios({
		method:"post",
		url:"/trade/tps/pbklin.do",
		data:{
			coin :that.data_info.jichubizhong,//币种
			tradecoin:that.data_info.jijiabizhong,//交易币种
			//klinetime: "1",
			timetype:that.data_info.timetype,
			starttime:ss.getFullYear()+'-'+(ss.getMonth()+1)+'-'+ss.getDate()+" "+ss.getHours()+':'+ss.getMinutes()+':'+ss.getSeconds(),
			endtime:aa.getFullYear()+'-'+(aa.getMonth()+1)+'-'+aa.getDate()+" "+aa.getHours()+':'+aa.getMinutes()+':'+aa.getSeconds(),
		}
	})
	.then((data)=>{
		console.log(data)
		var nodata="";
		if(data && data.data && data.data.err_code){
			console.log("-----")
			if(data.data.err_code != "1"){
				nodata = false ;
			}else{
				if( !data.data.kline || data.data.kline.lenght == 0){
					nodata = true;
				}
			}
			
			console.log(nodata)
			if (data.data.err_code != "1" && !nodata) {
				if (!!onErrorCallback) {
					onErrorCallback(data.data.err_code != "1"?"no_date":"ok");
				}
				return;
			}

			var bars = [];
			var barsCount = nodata ? 0 : data.data.kline.length;
			console.log(barsCount)
			// var volumePresent = typeof data.v != "undefined";
			// var ohlPresent = typeof data.o != "undefined";
			
			for (var i = 0; i < barsCount; ++i) {
				
				var barValue = {
					// time: data.data.kline[i].klinetime,
					time: Number(data.data.kline[i].klinetime),
					close: Number(data.data.kline[i].close),
					open : Number(data.data.kline[i].open),
					high : Number(data.data.kline[i].high),
					low : Number(data.data.kline[i].low),
					volume : Number(data.data.kline[i].volume)
				};

				// if (ohlPresent) {
				// 	barValue.open = data.o[i];
				// 	barValue.high = data.h[i];
				// 	barValue.low = data.l[i];
				// }
				// else {
				// 	barValue.open = barValue.high = barValue.low = barValue.close;
				// }

				// if (volumePresent) {
				// 	barValue.volume = data.v[i];
				// }

				bars.push(barValue);
			}
			console.log(bars)
			
		}else{
			nodata = true;
		}
		onDataCallback(bars, {version: that._protocolVersion, noData: nodata});
	})
	.catch((arg)=>{
		console.warn(["getBars(): HTTP error", arg]);
		if (!!onErrorCallback) {
			onErrorCallback("network error: " + JSON.stringify(arg));
		}
	})
	// this._send(this._datafeedURL + this._historyURL, {
	// 		symbol: symbolInfo.ticker.toUpperCase(),
	// 		resolution: resolution,
	// 		from: rangeStartDate,
	// 		to: rangeEndDate
	// })
	// .done(function (response) {

					// var nodata = data.s == "no_data";

					// if (data.s != "ok" && !nodata) {
					// 	if (!!onErrorCallback) {
					// 		onErrorCallback(data.s);
					// 	}
					// 	return;
					// }

					// var bars = [];

					// //	data is JSON having format {s: "status" (ok, no_data, error),
					// //  v: [volumes], t: [times], o: [opens], h: [highs], l: [lows], c:[closes], nb: "optional_unixtime_if_no_data"}
					// var barsCount = nodata ? 0 : data.t.length;

					// var volumePresent = typeof data.v != "undefined";
					// var ohlPresent = typeof data.o != "undefined";

					// for (var i = 0; i < barsCount; ++i) {

					// 	var barValue = {
					// 		time: data.t[i] * 1000,
					// 		close: data.c[i]
					// 	};

					// 	if (ohlPresent) {
					// 		barValue.open = data.o[i];
					// 		barValue.high = data.h[i];
					// 		barValue.low = data.l[i];
					// 	}
					// 	else {
					// 		barValue.open = barValue.high = barValue.low = barValue.close;
					// 	}

					// 	if (volumePresent) {
					// 		barValue.volume = data.v[i];
					// 	}

					// 	bars.push(barValue);
					// }
					// console.log(bars)
					
					// onDataCallback(bars, {version: that._protocolVersion, noData: nodata, nextTime: data.nb || data.nextTime});
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