/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import Person from './Person'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'


test('renders default content', () => {
  const newBlog = [{
    title:'askamaya',
    author:'abdullahi',
    url:'itisworking.com',
    likes:0,
    user:{
       id: '123456789'
    }
  }]
  const component = render(
      <Person allBlog={newBlog} user={{ id:'123456789' }} />
  )
  const div = component.container.querySelector('.div')
  expect(div).toHaveTextContent('askamaya')
  

})
test('event handler is called,when like  button is clicked', () => {
  const newBlog = [{
    title:'askamaya',
    author:'abdullahi',
    url:'itisworking.com',
    likes:0,
    user:{
       id: '123456789'
    }
  }]
  const mockHandler = jest.fn()
  const component = render(
    <Person allBlog={newBlog} user={{ id:'123456789' }} handlelike={mockHandler}/>
  )
  const button = component.getByText('likes')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
  
})