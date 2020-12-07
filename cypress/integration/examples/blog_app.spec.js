/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Testi tyyppi',
      username: 'tester',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('log in to application')
  })

  describe('Login',function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('väärä')
      cy.get('#password').type('taasväärä')
      cy.contains('login').click()
      cy.contains('wrong username or password')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('salasana')
      cy.contains('login').click()
      cy.contains('login successful')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('tester')
      cy.get('#password').type('salasana')
      cy.contains('login').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create').click()
      cy.contains('test title test author')
    })
  })
})

