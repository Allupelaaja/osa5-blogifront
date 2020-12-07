/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('testing blog component:', () => {

  let user, blog, component

  const dummy = () => {
    return null
  }

  const mockHandler  = jest.fn()

  beforeEach(() => {
    user = {
      username: "testuser"
    }

    blog = {
      title: "title for testing blog",
      author: "testing author",
      url: "testurl",
      user: user,
      likes: 51
    }

    component = render(
      <Blog blog={blog} user={user} updateBlog={mockHandler} deleteBlog={dummy} />
    )
  })

  test('title is rendered', () => {

    expect(component.container).toHaveTextContent(
      'title for testing blog'
    )
  })

  test('author is rendered', () => {

    expect(component.container).toHaveTextContent(
      'testing author'
    )
  })

  test('url is not rendered', () => {

    expect(component.container).not.toHaveTextContent(
      'testurl'
    )
  })

  test('like amount is not rendered', () => {

    expect(component.container).not.toHaveTextContent(
      '51'
    )
  })

  test('url and likes are rendered after "view" button is pressed', () => {

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'testurl'
    )

    expect(component.container).toHaveTextContent(
      '51'
    )
  })

  test('when like is clicked twice, mockHandler is called twice', () => {

    const buttonView = component.getByText('view')

    fireEvent.click(buttonView)

    const buttonLike = component.getByText('like')

    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})