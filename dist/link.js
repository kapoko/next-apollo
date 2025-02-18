'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports['default'] = exports.prefetch = void 0

var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
)

var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass')
)

var _possibleConstructorReturn2 = _interopRequireDefault(
  require('@babel/runtime/helpers/possibleConstructorReturn')
)

var _getPrototypeOf2 = _interopRequireDefault(
  require('@babel/runtime/helpers/getPrototypeOf')
)

var _get2 = _interopRequireDefault(require('@babel/runtime/helpers/get'))

var _inherits2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inherits')
)

var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
)

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'))

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

var _react = _interopRequireDefault(require('react'))

var _propTypes = _interopRequireDefault(require('prop-types'))

var _link = _interopRequireDefault(require('next/link'))

var _router = _interopRequireDefault(require('next/router'))

var _reactApollo = require('react-apollo')

var _utils = require('next-server/dist/lib/utils')

var _propTypesExact = _interopRequireDefault(require('prop-types-exact'))

var _url = require('url')

var _prefetch =
  /*#__PURE__*/
  (function() {
    var _ref = (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/
      _regenerator['default'].mark(function _callee(href) {
        var url,
          pathname,
          parsedHref,
          _ref2,
          query,
          Component,
          ctx,
          composedInitialProps

        return _regenerator['default'].wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                if (process.browser) {
                  _context.next = 2
                  break
                }

                return _context.abrupt('return')

              case 2:
                url = typeof href !== 'string' ? (0, _url.format)(href) : href
                pathname = window.location.pathname
                parsedHref = (0, _url.resolve)(pathname, url)
                ;(_ref2 =
                  typeof href !== 'string' ? href : (0, _url.parse)(url, true)),
                  (query = _ref2.query)
                _context.next = 8
                return _router['default'].prefetch(parsedHref)

              case 8:
                Component = _context.sent

                if (!(Component && Component.getInitialProps)) {
                  _context.next = 16
                  break
                }

                ctx = {
                  pathname: href,
                  query: query,
                  isVirtualCall: true
                }
                _context.next = 13
                return Component.getInitialProps(ctx)

              case 13:
                composedInitialProps = _context.sent
                _context.next = 16
                return (0, _reactApollo.getDataFromTree)(
                  _react['default'].createElement(
                    Component,
                    (0, _extends2['default'])(
                      {
                        ctx: ctx
                      },
                      composedInitialProps
                    )
                  ),
                  {
                    router: {
                      asPath: ctx.asPath,
                      pathname: ctx.pathname,
                      query: ctx.query
                    }
                  }
                )

              case 16:
              case 'end':
                return _context.stop()
            }
          }
        }, _callee)
      })
    )

    return function prefetch(_x) {
      return _ref.apply(this, arguments)
    }
  })() // extend default next/link to customize the prefetch behaviour

exports.prefetch = _prefetch

var LinkWithData =
  /*#__PURE__*/
  (function(_Link) {
    ;(0, _inherits2['default'])(LinkWithData, _Link)

    function LinkWithData() {
      ;(0, _classCallCheck2['default'])(this, LinkWithData)
      return (0, _possibleConstructorReturn2['default'])(
        this,
        (0, _getPrototypeOf2['default'])(LinkWithData).apply(this, arguments)
      )
    }

    ;(0, _createClass2['default'])(LinkWithData, [
      {
        key: 'prefetch',
        // re defined Link propTypes to add `withData`
        // our custom prefetch method
        value: (function() {
          var _prefetch2 = (0, _asyncToGenerator2['default'])(
            /*#__PURE__*/
            _regenerator['default'].mark(function _callee2() {
              return _regenerator['default'].wrap(
                function _callee2$(_context2) {
                  while (1) {
                    switch ((_context2.prev = _context2.next)) {
                      case 0:
                        if (this.props.prefetch) {
                          _context2.next = 2
                          break
                        }

                        return _context2.abrupt('return')

                      case 2:
                        // if withData prop is defined
                        // prefetch with data
                        // otherwise just prefetch the page
                        if (this.props.withData) {
                          _prefetch(this.props.href)
                        } else {
                          ;(0, _get2['default'])(
                            (0, _getPrototypeOf2['default'])(
                              LinkWithData.prototype
                            ),
                            'prefetch',
                            this
                          ).call(this)
                        }

                      case 3:
                      case 'end':
                        return _context2.stop()
                    }
                  }
                },
                _callee2,
                this
              )
            })
          )

          function prefetch() {
            return _prefetch2.apply(this, arguments)
          }

          return prefetch
        })()
      }
    ])
    return LinkWithData
  })(_link['default'])

exports['default'] = LinkWithData
;(0, _defineProperty2['default'])(
  LinkWithData,
  'propTypes',
  (0, _propTypesExact['default'])({
    href: _propTypes['default'].oneOfType([
      _propTypes['default'].string,
      _propTypes['default'].object
    ]),
    as: _propTypes['default'].oneOfType([
      _propTypes['default'].string,
      _propTypes['default'].object
    ]),
    prefetch: _propTypes['default'].bool,
    replace: _propTypes['default'].bool,
    shallow: _propTypes['default'].bool,
    passHref: _propTypes['default'].bool,
    scroll: _propTypes['default'].bool,
    children: _propTypes['default'].oneOfType([
      _propTypes['default'].element,
      function(props, propName) {
        var value = props[propName]

        if (typeof value === 'string') {
          var warn = (0, _utils.execOnce)(console.error)
          warn(
            "Warning: You're using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>"
          )
        }

        return null
      }
    ]).isRequired,
    withData: _propTypes['default'].bool // our custom prop
  })
)
