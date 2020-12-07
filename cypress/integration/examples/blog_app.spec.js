/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')

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
})

describe('Login',function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.get('#username').clear()
    cy.get('#password').clear()
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