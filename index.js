void (function (root, factory) {
  if (typeof define === 'function' && define.amd) define(factory)
  else if (typeof exports === 'object') module.exports = factory()
  else factory()
}(this, function () {
  function init() {
    var DETAILS = 'details'
    var SUMMARY = 'summary'

    var supported = checkSupport()
    if (supported) return

    // Add a classname
    document.documentElement.className += ' no-details'

    window.addEventListener('click', clickHandler)

    injectStyle('details-polyfill-style',
      'html.no-details ' + DETAILS + ':not([open]) > :not(' + SUMMARY + ') { display: none; }\n' +
      'html.no-details ' + DETAILS + ' > ' + SUMMARY + ':before { content: "▶"; display: inline-block; font-size: .8em; width: 1.5em; }\n' +
      'html.no-details ' + DETAILS + '[open] > ' + SUMMARY + ':before { content: "▼"; }')

    /*
     * Click handler for `<summary>` tags
     */

    function clickHandler (e) {
      if (e.target.nodeName.toLowerCase() === 'summary') {
        var details = e.target.parentNode
        if (!details) return

        var cancelled = !dispatchToggleEvent(details)
        if (cancelled) return

        if (details.getAttribute('open')) {
          details.open = false
          details.removeAttribute('open')
        } else {
          details.open = true
          details.setAttribute('open', 'open')
        }
      }
    }

    /*
     * Checks for support for `<details>`
     */

    function checkSupport () {
      var el = document.createElement(DETAILS)
      if (!('open' in el)) return false

      el.innerHTML = '<' + SUMMARY + '>a</' + SUMMARY + '>b'

      document.body.appendChild(el)

      var diff = el.offsetHeight
      el.open = true
      var result = (diff != el.offsetHeight)

      document.body.removeChild(el)
      return result
    }

    /*
     * Dispatch 'toggle' event
     */

    function dispatchToggleEvent (details) {
      var toggleEvent
      try {
        toggleEvent = new CustomEvent('toggle', { bubbles: true, canceable: true })
      } catch(e) {
        toggleEvent = document.createEvent('CustomEvent')
        toggleEvent.initCustomEvent('toggle', true, true, null)
      }
      return details.dispatchEvent(toggleEvent)
    }

    /*
     * Injects styles (idempotent)
     */

    function injectStyle (id, style) {
      if (document.getElementById(id)) return

      var el = document.createElement('style')
      el.id = id
      el.innerHTML = style

      document.getElementsByTagName('head')[0].appendChild(el)
    }
  }

  // Ensure that `document.body` is available
  if (document.readyState !== 'loading') {
    init()
  } else {
    document.addEventListener('DOMContentLoaded', init)
  }
})); // eslint-disable-line semi
