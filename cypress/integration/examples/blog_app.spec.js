const { element } = require("prop-types")

/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Testi tyyppi',
      username: 'tester',
      password: 'salasana',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
  })

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('log in to application')
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('väärä')
      cy.get('#password').type('taasväärä')
      cy.contains('login').click()
      cy.contains('wrong username or password')
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('salasana')
      cy.contains('login').click()
      cy.contains('login successful')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('tester')
      cy.get('#password').type('salasana')
      cy.contains('login').click()
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create').click()
      cy.visit('http://localhost:3000')
      cy.contains('test title test author')
    })

    it('A blog can be liked', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create').click()
      cy.visit('http://localhost:3000')

      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be removed', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create').click()
      cy.visit('http://localhost:3000')

      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('blog test title deleted')
    })

    it.only('Blogs are sorted in order by amount of likes', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test title1')
      cy.get('#author').type('test author1')
      cy.get('#url').type('test url1')
      cy.get('#create').click()
      cy.visit('http://localhost:3000')

      cy.contains('new blog').click()
      cy.get('#title').type('test title2')
      cy.get('#author').type('test author2')
      cy.get('#url').type('test url2')
      cy.get('#create').click()
      cy.visit('http://localhost:3000')

      cy.contains('new blog').click()
      cy.get('#title').type('test title3')
      cy.get('#author').type('test author3')
      cy.get('#url').type('test url3')
      cy.get('#create').click()
      cy.visit('http://localhost:3000')

      cy.contains('test author1').contains('view').click()
      cy.contains('test author2').contains('view').click()
      cy.contains('test author3').contains('view').click()

      cy.contains('test url1').contains('likes 0').contains('like').click()

      cy.contains('test url2').contains('likes 0').contains('like').click()
      cy.contains('test url2').contains('likes 1').contains('like').click()

      cy.contains('test url3').contains('likes 0').contains('like').click()
      cy.contains('test url3').contains('likes 1').contains('like').click()
      cy.contains('test url3').contains('likes 2').contains('like').click()
      cy.visit('http://localhost:3000')

      cy.contains('test author1').contains('view').click()
      cy.contains('test author2').contains('view').click()
      cy.contains('test author3').contains('view').click()

      cy.get('div#blogInList').then( blogs => {
        cy.wrap(blogs[0]).contains('test author3')
      })
    })
  })
})

