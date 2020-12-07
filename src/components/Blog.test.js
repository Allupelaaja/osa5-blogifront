/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

const dummy = () => {
  return null
}

const user = {
  username: "testuser"
}

const blog = {
  title: "title for testing blog",
  author: "testing author",
  url: "testurl",
  user: user,
  likes: 51
}

test('title is rendered', () => {

  const component = render(
    <Blog blog={blog} user={user} updateBlog={dummy} deleteBlog={dummy} />
  )

  expect(component.container).toHaveTextContent(
    'title for testing blog'
  )
})

test('author is rendered', () => {

  const component = render(
    <Blog blog={blog} user={user} updateBlog={dummy} deleteBlog={dummy} />
  )

  expect(component.container).toHaveTextContent(
    'testing author'
  )
})

test('url is not rendered', () => {

  const component = render(
    <Blog blog={blog} user={user} updateBlog={dummy} deleteBlog={dummy} />
  )

  expect(component.container).not.toHaveTextContent(
    'testurl'
  )
})

test('like amount is not rendered', () => {

  const component = render(
    <Blog blog={blog} user={user} updateBlog={dummy} deleteBlog={dummy} />
  )

  expect(component.container).not.toHaveTextContent(
    '51'
  )
})