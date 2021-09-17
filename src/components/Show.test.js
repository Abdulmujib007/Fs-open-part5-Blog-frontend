/* eslint-disable no-trailing-spaces */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import { describe } from 'yargs'
import Show from './Show'



test('shows url and likes when clicked', () => {
    const component = render(
        <Show>
            <div>
                url,likes
            </div>
        </Show>
    )
    const button =component.getByText('show')
    fireEvent.click(button)
    const div =component.container.querySelector('.show')
    expect(div).not.toHaveStyle('display:none')
    expect(div).toHaveTextContent('url,likes')
})
