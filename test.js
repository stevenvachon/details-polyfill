// The elements for each test
'use strict'
var content,details,summary,testArea

before( function() {
	testArea = document.createElement('div')
	document.body.appendChild(testArea)
})

beforeEach( function() {
	content = document.createElement('div')
	details = document.createElement('details')
	summary = document.createElement('summary')
	details.appendChild(summary)
	details.appendChild(content)
	testArea.appendChild(details)
})

afterEach( function() {
	content = details = summary = null
	testArea.innerHTML = ''
})

after( function() {
	document.body.removeChild(testArea)
	testArea = null
})

it('expands when collapsed', function(done) {
	expect(true).to.be.true
	done( /*new Error('asdf')*/ )
})
