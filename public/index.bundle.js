webpackJsonp([1],{

/***/ 1218:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(26);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = __webpack_require__(234);

var _reactRedux = __webpack_require__(122);

var _index = __webpack_require__(1219);

var _index2 = _interopRequireDefault(_index);

var _reduxSaga = __webpack_require__(236);

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _index3 = __webpack_require__(1221);

var _reduxLocalstorage = __webpack_require__(380);

var _reduxLocalstorage2 = _interopRequireDefault(_reduxLocalstorage);

var _TweetsViewer = __webpack_require__(1224);

var _TweetsViewer2 = _interopRequireDefault(_TweetsViewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sagaMiddleware = (0, _reduxSaga2.default)();

//App Components


//Redux

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
var persistStateMiddleware = (0, _reduxLocalstorage2.default)("controls");
var store = (0, _redux.createStore)(_index2.default, composeEnhancers((0, _redux.applyMiddleware)(sagaMiddleware), persistStateMiddleware));
sagaMiddleware.run(_index3.sagas);

_reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_TweetsViewer2.default, null)
), document.getElementById('app_container'));

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\index.js"); } } })();

/***/ }),

/***/ 1219:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reducers;

var _tweetGrouper = __webpack_require__(1220);

var _tweetGrouper2 = _interopRequireDefault(_tweetGrouper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTweetsStartDate() {
    var today = new Date();
    today.setMonth(today.getMonth() - 3);
    return today.toISOString().substr(0, 10);
}

function reducers() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        controls: {
            theme: 'light',
            tweetsAmount: 30,
            amountTweetsPerColumn: 10,
            screenName: "appdirect",
            amountOfColumns: 3,
            startDate: getTweetsStartDate()
        }
    };
    var action = arguments[1];

    var new_state = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case "FETCH_TWEETS_SUCCESS":
            new_state.tweets = action.tweets;
            return new_state;

        case "REDRAW_TWEETS":
            new_state.sortedTweets = (0, _tweetGrouper2.default)(new_state.tweets, new Date(new_state.controls.startDate), new_state.controls.amountTweetsPerColumn, new_state.controls.amountOfColumns);
            return new_state;

        case "SET_THEME":
            new_state.controls.theme = action.theme;
            return new_state;

        case "SET_COLUMN_AMOUNT":
            new_state.controls.amountTweetsPerColumn = action.amount;
            return new_state;

        case "SET_TWEETS_START_DATE":
            new_state.controls.startDate = action.date;
            return new_state;

        default:
            return state;

    }
}

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\reducers\\index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\reducers\\index.js"); } } })();

/***/ }),

/***/ 1220:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = groupTweets;
function groupTweets(tweets, startDate, chunkSize, cols) {
    var sortedTweets = tweets.sort(function (a, b) {
        return new Date(b["created_at"]) - new Date(a["created_at"]);
    }).filter(function (tweet) {
        return new Date(tweet["created_at"]) > startDate;
    });

    var colCount = 0;
    return [].concat.apply([], sortedTweets.map(function (elem, i) {
        function divide() {
            colCount++;
            return [sortedTweets.slice(i, i + chunkSize)];
        }

        return i % chunkSize || colCount > cols ? [] : divide();
    }));
}

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\reducers\\tweetGrouper.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\reducers\\tweetGrouper.js"); } } })();

/***/ }),

/***/ 1221:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sagas = sagas;

var _reduxSaga = __webpack_require__(236);

var _effects = __webpack_require__(238);

var _tweets = __webpack_require__(1222);

var _marked = /*#__PURE__*/regeneratorRuntime.mark(sagas);

function sagas() {
    return regeneratorRuntime.wrap(function sagas$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return [(0, _effects.fork)(_reduxSaga.takeLatest, 'FETCH_TWEETS', _tweets.fetchTweets)];

                case 2:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\sagas\\index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\sagas\\index.js"); } } })();

/***/ }),

/***/ 1222:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchTweets = fetchTweets;

var _effects = __webpack_require__(238);

var _api = __webpack_require__(1223);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(fetchTweets);

function fetchTweets(action) {
    var _action$controls, screenName, tweetsAmount, tweets;

    return regeneratorRuntime.wrap(function fetchTweets$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _action$controls = action.controls, screenName = _action$controls.screenName, tweetsAmount = _action$controls.tweetsAmount;
                    _context.next = 3;
                    return (0, _effects.call)(_api2.default.getList, { screenName: screenName, tweetsAmount: tweetsAmount });

                case 3:
                    tweets = _context.sent;
                    _context.next = 6;
                    return (0, _effects.put)({ type: 'FETCH_TWEETS_SUCCESS', tweets: tweets.data });

                case 6:
                    _context.next = 8;
                    return (0, _effects.put)({ type: 'REDRAW_TWEETS' });

                case 8:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\sagas\\tweets.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\sagas\\tweets.js"); } } })();

/***/ }),

/***/ 1223:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = __webpack_require__(439);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TwitterApi = function () {
    function TwitterApi() {
        _classCallCheck(this, TwitterApi);
    }

    _createClass(TwitterApi, null, [{
        key: "getList",
        value: function getList(params) {
            var screenName = params.screenName,
                startDate = params.startDate,
                tweetsAmount = params.tweetsAmount;

            return _axios2.default.get("/tweets/" + screenName + "?count=" + tweetsAmount);
        }
    }]);

    return TwitterApi;
}();

exports.default = TwitterApi;

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\api\\index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\api\\index.js"); } } })();

/***/ }),

/***/ 1224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _TweetsFetcher = __webpack_require__(1225);

var _TweetsFetcher2 = _interopRequireDefault(_TweetsFetcher);

var _styles = __webpack_require__(287);

var _controls = __webpack_require__(1233);

var _controls2 = _interopRequireDefault(_controls);

var _reactRedux = __webpack_require__(122);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var themes = {
    dark: (0, _styles.createMuiTheme)({
        palette: {
            type: 'dark'
        }
    }),
    light: (0, _styles.createMuiTheme)({
        palette: {
            type: 'light'
        }
    })
};

var TweetsViewer = function (_React$Component) {
    _inherits(TweetsViewer, _React$Component);

    function TweetsViewer(props) {
        _classCallCheck(this, TweetsViewer);

        var _this = _possibleConstructorReturn(this, (TweetsViewer.__proto__ || Object.getPrototypeOf(TweetsViewer)).call(this, props));

        _this.getActiveTheme = _this.getActiveTheme.bind(_this);
        _this.getPrimaryColor = _this.getPrimaryColor.bind(_this);
        return _this;
    }

    _createClass(TweetsViewer, [{
        key: 'getActiveTheme',
        value: function getActiveTheme() {
            return themes[this.props.theme];
        }
    }, {
        key: 'getPrimaryColor',
        value: function getPrimaryColor() {
            return themes[this.props.theme].palette.background.appBar;
        }
    }, {
        key: 'render',
        value: function render(props) {

            var rootStyle = {
                backgroundColor: this.getPrimaryColor(),
                height: '100%',
                width: '100%',
                position: 'absolute'
            };

            return _react2.default.createElement(
                _styles.MuiThemeProvider,
                { theme: this.getActiveTheme() },
                _react2.default.createElement(
                    'section',
                    { style: rootStyle },
                    _react2.default.createElement(
                        'header',
                        null,
                        _react2.default.createElement(_controls2.default, null)
                    ),
                    _react2.default.createElement(
                        'content',
                        null,
                        _react2.default.createElement(_TweetsFetcher2.default, null)
                    )
                )
            );
        }
    }]);

    return TweetsViewer;
}(_react2.default.Component);

function mapEditStateToProps(state) {
    return {
        theme: state.controls.theme
    };
}

exports.default = (0, _reactRedux.connect)(mapEditStateToProps)(TweetsViewer);

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\components\\TweetsViewer\\index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\components\\TweetsViewer\\index.js"); } } })();

/***/ }),

/***/ 1225:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(122);

var _TweetsColumns = __webpack_require__(1226);

var _TweetsColumns2 = _interopRequireDefault(_TweetsColumns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TweetsFetcher = function (_React$Component) {
    _inherits(TweetsFetcher, _React$Component);

    function TweetsFetcher(props) {
        _classCallCheck(this, TweetsFetcher);

        var _this = _possibleConstructorReturn(this, (TweetsFetcher.__proto__ || Object.getPrototypeOf(TweetsFetcher)).call(this, props));

        _this.props.dispatch({
            type: "FETCH_TWEETS", controls: _this.props.controls
        });
        return _this;
    }

    _createClass(TweetsFetcher, [{
        key: 'render',
        value: function render() {
            return this.props.tweets ? _react2.default.createElement(_TweetsColumns2.default, { tweets: this.props.tweets,
                columnCount: this.props.controls.amountOfColumns }) : _react2.default.createElement('div', null);
        }
    }]);

    return TweetsFetcher;
}(_react2.default.Component);

function mapStateToProps(state) {
    return {
        tweets: state.sortedTweets,
        controls: state.controls
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(TweetsFetcher);

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\components\\TweetsFetcher\\index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\components\\TweetsFetcher\\index.js"); } } })();

/***/ }),

/***/ 1226:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSortableHoc = __webpack_require__(397);

var _TweetsColumn = __webpack_require__(1227);

var _TweetsColumn2 = _interopRequireDefault(_TweetsColumn);

var _handle = __webpack_require__(1232);

var _handle2 = _interopRequireDefault(_handle);

var _reactJss = __webpack_require__(105);

var _reactJss2 = _interopRequireDefault(_reactJss);

var _styles = __webpack_require__(480);

var _styles2 = _interopRequireDefault(_styles);

var _Grid = __webpack_require__(285);

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragHandle = (0, _reactSortableHoc.SortableHandle)(_handle2.default);
var SortableItem = (0, _reactSortableHoc.SortableElement)(function (props) {
    return _react2.default.createElement(
        'div',
        { className: props.className },
        _react2.default.createElement(_TweetsColumn2.default, { handle: DragHandle, value: props.value,
            tweets: props.tweets })
    );
});

var SortableList = (0, _reactSortableHoc.SortableContainer)(function (_ref) {
    var items = _ref.items,
        classes = _ref.classes,
        tweets = _ref.tweets;
    return _react2.default.createElement(
        _Grid2.default,
        { container: true, className: classes.container, spacing: 16 },
        items.map(function (value, index) {
            return _react2.default.createElement(SortableItem, { tweets: tweets[value],
                className: classes.column,
                key: 'item-' + value,
                index: index,
                value: value });
        })
    );
});

var TweetsColumns = function (_React$Component) {
    _inherits(TweetsColumns, _React$Component);

    function TweetsColumns(props) {
        _classCallCheck(this, TweetsColumns);

        var _this = _possibleConstructorReturn(this, (TweetsColumns.__proto__ || Object.getPrototypeOf(TweetsColumns)).call(this, props));

        _this.onSortEnd = function (_ref2) {
            var oldIndex = _ref2.oldIndex,
                newIndex = _ref2.newIndex;

            _this.setState({
                items: (0, _reactSortableHoc.arrayMove)(_this.state.items, oldIndex, newIndex)
            });
        };

        _this.state = {
            items: Array.apply(null, { length: _this.props.columnCount }).map(Number.call, Number)
        };
        return _this;
    }

    _createClass(TweetsColumns, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(SortableList, _extends({ items: this.state.items,
                onSortEnd: this.onSortEnd,
                tweets: this.props.tweets,
                useDragHandle: true,
                axis: 'x' }, this.props));
        }
    }]);

    return TweetsColumns;
}(_react2.default.Component);

exports.default = (0, _reactJss2.default)(_styles2.default)(TweetsColumns);

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\components\\TweetsColumns\\index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\components\\TweetsColumns\\index.js"); } } })();

/***/ }),

/***/ 1227:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _Tweet = __webpack_require__(1228);

var _Tweet2 = _interopRequireDefault(_Tweet);

var _reactJss = __webpack_require__(105);

var _reactJss2 = _interopRequireDefault(_reactJss);

var _styles = __webpack_require__(1231);

var _styles2 = _interopRequireDefault(_styles);

var _Grid = __webpack_require__(285);

var _Grid2 = _interopRequireDefault(_Grid);

var _Paper = __webpack_require__(136);

var _Paper2 = _interopRequireDefault(_Paper);

var _Divider = __webpack_require__(475);

var _Divider2 = _interopRequireDefault(_Divider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Material


var TweetsColumn = function (_React$Component) {
    _inherits(TweetsColumn, _React$Component);

    function TweetsColumn() {
        _classCallCheck(this, TweetsColumn);

        return _possibleConstructorReturn(this, (TweetsColumn.__proto__ || Object.getPrototypeOf(TweetsColumn)).apply(this, arguments));
    }

    _createClass(TweetsColumn, [{
        key: 'render',
        value: function render() {
            var tweets = this.props.tweets || [];
            var DragHandle = this.props.handle;
            var classes = this.props.classes;
            var tweetsEls = [];
            for (var i = 0; i < tweets.length; i++) {
                tweetsEls.push(_react2.default.createElement(
                    'div',
                    { key: i },
                    _react2.default.createElement(_Tweet2.default, { id: tweets[i]['id_str'],
                        created: tweets[i]['created_at'],
                        content: tweets[i].text }),
                    _react2.default.createElement(_Divider2.default, null)
                ));
            }
            return _react2.default.createElement(
                _Grid2.default,
                { key: this.props.value, item: true },
                _react2.default.createElement(
                    _Paper2.default,
                    { className: classes.content },
                    _react2.default.createElement(DragHandle, null),
                    tweetsEls
                )
            );
        }
    }]);

    return TweetsColumn;
}(_react2.default.Component);

exports.default = (0, _reactJss2.default)(_styles2.default)(TweetsColumn);

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\components\\TweetsColumn\\index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\components\\TweetsColumn\\index.js"); } } })();

/***/ }),

/***/ 1228:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(1229);

var _styles2 = _interopRequireDefault(_styles);

var _reactJss = __webpack_require__(105);

var _reactJss2 = _interopRequireDefault(_reactJss);

var _dateformat = __webpack_require__(479);

var _dateformat2 = _interopRequireDefault(_dateformat);

var _Card = __webpack_require__(471);

var _Typography = __webpack_require__(95);

var _Typography2 = _interopRequireDefault(_Typography);

var _toMentionLink = __webpack_require__(381);

var _toMentionLink2 = _interopRequireDefault(_toMentionLink);

var _reactHtmlParser = __webpack_require__(383);

var _reactHtmlParser2 = _interopRequireDefault(_reactHtmlParser);

var _IconButton = __webpack_require__(134);

var _IconButton2 = _interopRequireDefault(_IconButton);

var _KeyboardArrowRight = __webpack_require__(477);

var _KeyboardArrowRight2 = _interopRequireDefault(_KeyboardArrowRight);

var _styles3 = __webpack_require__(287);

var _mention = __webpack_require__(1230);

var _mention2 = _interopRequireDefault(_mention);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tweet = function (_React$Component) {
    _inherits(Tweet, _React$Component);

    function Tweet() {
        _classCallCheck(this, Tweet);

        return _possibleConstructorReturn(this, (Tweet.__proto__ || Object.getPrototypeOf(Tweet)).apply(this, arguments));
    }

    _createClass(Tweet, [{
        key: 'render',
        value: function render() {
            var classes = this.props.classes;
            var created_at = (0, _dateformat2.default)(this.props.created, "h:MM TT - d mmm yyyy");
            var formattedTweets = (0, _toMentionLink2.default)(this.props.content, {
                renderer: (0, _mention2.default)(this.props.theme.palette.secondary["A100"]),
                url: 'https://twitter.com'
            });
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _Card.CardContent,
                    { className: classes.contentRoot },
                    _react2.default.createElement(
                        _Typography2.default,
                        { className: classes.body, type: 'headline' },
                        (0, _reactHtmlParser2.default)(formattedTweets)
                    )
                ),
                _react2.default.createElement(
                    _Card.CardActions,
                    { disableActionSpacing: true, className: classes.actionsRoot },
                    _react2.default.createElement(
                        _Typography2.default,
                        { className: classes.date, type: 'caption' },
                        created_at
                    ),
                    _react2.default.createElement(
                        'a',
                        { target: 'blank', className: classes.tweet,
                            href: "https://twitter.com/AppDirect/status/" + this.props.id },
                        _react2.default.createElement(
                            _IconButton2.default,
                            null,
                            _react2.default.createElement(_KeyboardArrowRight2.default, null)
                        )
                    )
                )
            );
        }
    }]);

    return Tweet;
}(_react2.default.Component);

exports.default = (0, _styles3.withTheme)((0, _reactJss2.default)(_styles2.default)(Tweet));

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\components\\Tweet\\index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\components\\Tweet\\index.js"); } } })();

/***/ }),

/***/ 1229:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    tweet: {
        display: 'block',
        textDecoration: 'none'

    },
    contentRoot: {
        paddingBottom: 0
    },
    actionsRoot: {
        alignItems: 'end'
    },
    body: {
        lineHeight: 1.1,
        fontFamily: "'Segoe UI',Arial,sans-serif",
        letterSpacing: '.01em',
        fontWeight: 'normal'
    },
    date: {
        fontSize: 12,
        marginTop: 10,
        fontFamily: "'Segoe UI',Arial,sans-serif",
        flex: 1,
        textIndent: 12
    }
};

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\components\\Tweet\\styles.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\components\\Tweet\\styles.js"); } } })();

/***/ }),

/***/ 1230:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (linkColor) {
    return function (mention, url, title) {
        return ["<a target='blank' style='color:", linkColor, "' href='", url, "'>", mention, "</a>"].join("");
    };
};

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\components\\Tweet\\mention.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\components\\Tweet\\mention.js"); } } })();

/***/ }),

/***/ 1231:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var styles = {
    root: {
        flexGrow: 1,
        flexDirection: 'column'
    },
    content: {}
};

exports.default = styles;

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\components\\TweetsColumn\\styles.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\components\\TweetsColumn\\styles.js"); } } })();

/***/ }),

/***/ 1232:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _IconButton = __webpack_require__(134);

var _IconButton2 = _interopRequireDefault(_IconButton);

var _styles = __webpack_require__(480);

var _styles2 = _interopRequireDefault(_styles);

var _reactJss = __webpack_require__(105);

var _reactJss2 = _interopRequireDefault(_reactJss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColumnHandle = function ColumnHandle(props) {
    return _react2.default.createElement(
        'div',
        { className: props.classes.handle },
        _react2.default.createElement(
            _IconButton2.default,
            { 'aria-label': 'Drag Column to reorder' },
            '\u2630'
        )
    );
};

exports.default = (0, _reactJss2.default)(_styles2.default)(ColumnHandle);

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\components\\TweetsColumns\\handle.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\components\\TweetsColumns\\handle.js"); } } })();

/***/ }),

/***/ 1233:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _AppBar = __webpack_require__(476);

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Toolbar = __webpack_require__(455);

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = __webpack_require__(95);

var _Typography2 = _interopRequireDefault(_Typography);

var _Switch = __webpack_require__(469);

var _Switch2 = _interopRequireDefault(_Switch);

var _styles = __webpack_require__(1234);

var _styles2 = _interopRequireDefault(_styles);

var _reactRedux = __webpack_require__(122);

var _reactJss = __webpack_require__(105);

var _reactJss2 = _interopRequireDefault(_reactJss);

var _IconButton = __webpack_require__(134);

var _IconButton2 = _interopRequireDefault(_IconButton);

var _MoreVert = __webpack_require__(478);

var _MoreVert2 = _interopRequireDefault(_MoreVert);

var _modal = __webpack_require__(1235);

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppControls = function (_React$Component) {
    _inherits(AppControls, _React$Component);

    function AppControls(props) {
        _classCallCheck(this, AppControls);

        var _this = _possibleConstructorReturn(this, (AppControls.__proto__ || Object.getPrototypeOf(AppControls)).call(this, props));

        _this.switchTheme = function (event, checked) {
            _this.props.dispatch({
                type: "SET_THEME",
                theme: checked ? "dark" : "light"
            });
            _this.setState({ theme: checked });
        };

        _this.handleRequestClose = function (value) {
            _this.setState({ open: false });
        };

        _this.switchTheme = _this.switchTheme.bind(_this);

        _this.state = {
            open: false,
            theme: _this.props.controls.theme === "dark"
        };
        return _this;
    }

    _createClass(AppControls, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var classes = this.props.classes;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _AppBar2.default,
                    { position: 'static', color: 'default' },
                    _react2.default.createElement(
                        _Toolbar2.default,
                        null,
                        _react2.default.createElement(
                            _Typography2.default,
                            { type: 'title', color: 'inherit', className: classes.flex },
                            this.props.controls.screenName,
                            ' Twitter timeline'
                        ),
                        _react2.default.createElement(_Switch2.default, {
                            onChange: this.switchTheme,
                            checked: this.state.theme
                        }),
                        _react2.default.createElement(
                            _IconButton2.default,
                            {
                                'aria-label': 'More',
                                'aria-haspopup': 'true',
                                onClick: function onClick() {
                                    return _this2.setState({ open: true });
                                }
                            },
                            _react2.default.createElement(_MoreVert2.default, null)
                        )
                    )
                ),
                _react2.default.createElement(_modal2.default, { open: this.state.open,
                    onChangeControls: this.props.dispatch,
                    onRequestClose: this.handleRequestClose,
                    controls: this.props.controls
                })
            );
        }
    }]);

    return AppControls;
}(_react2.default.Component);

function mapEditStateToProps(state) {
    return {
        controls: state.controls
    };
}

exports.default = (0, _reactRedux.connect)(mapEditStateToProps)((0, _reactJss2.default)(_styles2.default)(AppControls));

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\components\\controls\\index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\components\\controls\\index.js"); } } })();

/***/ }),

/***/ 1234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var styles = {
    flex: {
        flex: 1
    }
};
exports.default = styles;

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\components\\controls\\styles.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\components\\controls\\styles.js"); } } })();

/***/ }),

/***/ 1235:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _rcSlider = __webpack_require__(413);

var _rcSlider2 = _interopRequireDefault(_rcSlider);

var _Dialog = __webpack_require__(456);

var _Dialog2 = _interopRequireDefault(_Dialog);

var _TextField = __webpack_require__(465);

var _TextField2 = _interopRequireDefault(_TextField);

var _Typography = __webpack_require__(95);

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Slider


var today = new Date().toISOString().substr(0, 10);

var MoreControlsDialog = function (_React$Component) {
    _inherits(MoreControlsDialog, _React$Component);

    function MoreControlsDialog(props) {
        _classCallCheck(this, MoreControlsDialog);

        var _this = _possibleConstructorReturn(this, (MoreControlsDialog.__proto__ || Object.getPrototypeOf(MoreControlsDialog)).call(this, props));

        _this.handleRequestClose = function () {
            _this.props.onRequestClose(_this.props.selectedValue);
        };

        _this.setColumnAmount = function (value) {
            _this.props.onChangeControls({
                type: "SET_COLUMN_AMOUNT",
                amount: value
            });
            _this.props.onChangeControls({
                type: "REDRAW_TWEETS"
            });
        };

        _this.state = {
            columnAmount: _this.props.controls.amountTweetsPerColumn
        };

        _this.setColumnDisplay = _this.setColumnDisplay.bind(_this);
        _this.setTweetsStartDate = _this.setTweetsStartDate.bind(_this);
        return _this;
    }

    _createClass(MoreControlsDialog, [{
        key: 'setColumnDisplay',
        value: function setColumnDisplay(value) {
            this.setState({
                columnAmount: value
            });
        }
    }, {
        key: 'setTweetsStartDate',
        value: function setTweetsStartDate(field) {
            this.props.onChangeControls({
                type: "SET_TWEETS_START_DATE",
                date: field.target.value
            });
            this.props.onChangeControls({
                type: "REDRAW_TWEETS"
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var onRequestClose = this.props.onRequestClose;

            var wrapperStyle = { width: 300, margin: 50 };

            return _react2.default.createElement(
                _Dialog2.default,
                { onRequestClose: this.handleRequestClose, open: this.props.open },
                _react2.default.createElement(
                    'div',
                    { style: wrapperStyle },
                    _react2.default.createElement(
                        _Typography2.default,
                        { type: 'caption' },
                        'Tweets per column'
                    ),
                    _react2.default.createElement(
                        _Typography2.default,
                        { type: 'headline' },
                        this.state.columnAmount
                    ),
                    _react2.default.createElement(_rcSlider2.default, { onChange: this.setColumnDisplay,
                        onAfterChange: this.setColumnAmount,
                        min: 2,
                        max: 10,
                        step: 2,
                        defaultValue: this.props.controls.amountTweetsPerColumn
                    }),
                    _react2.default.createElement(_TextField2.default, {
                        id: 'date',
                        label: 'Tweets starting from date',
                        type: 'date',
                        defaultValue: this.props.controls.startDate,
                        max: today,
                        margin: 'normal',
                        fullWidth: true,
                        InputLabelProps: {
                            shrink: true
                        },
                        inputProps: {
                            max: today
                        },
                        onChange: this.setTweetsStartDate
                    })
                )
            );
        }
    }]);

    return MoreControlsDialog;
}(_react2.default.Component);

exports.default = MoreControlsDialog;

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\components\\controls\\modal.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\components\\controls\\modal.js"); } } })();

/***/ }),

/***/ 480:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var styles = {
    column: {
        flex: 1,
        verticalAlign: 'top'
    },
    handle: {
        cursor: 'move'
    },
    container: {
        margin: 0
    }
};

exports.default = styles;

 ;(function register() { /* react-hot-loader/webpack */ if (false) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\projects\\tweetViewer\\src\\components\\TweetsColumns\\styles.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\projects\\tweetViewer\\src\\components\\TweetsColumns\\styles.js"); } } })();

/***/ })

},[1218]);
//# sourceMappingURL=index.bundle.js.map