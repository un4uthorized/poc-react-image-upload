//@ts-nocheck

import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import Home from '@/app/page'


describe('page.tsx', () => {
    const server = setupServer(
        rest.post('/api/register', async (req, res, ctx) => {
            return res(
                ctx.json([{ message: 'Thank you for registering!' }]),
            )
        })
    )

    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());

    it('should render the page', async () => {
        const { getByText } = render(<Home />)

        expect(getByText('Create an account')).toBeInTheDocument()
    })

    it('should register new user', async () => {
        const { getByTestId, getByText } = render(<Home />)

        const username = getByTestId('username')
        const file = getByTestId('file')
        const submit = getByTestId('submit')

        const image = new File(['any!'], 'any.png', {
            type: 'image/png',
        });

        fireEvent.change(file, { target: { files: [image] } })
        fireEvent.change(username, { target: { value: 'test' } })

        fireEvent.click(submit)

        await waitFor(() => {
            expect(getByText('Thank you for registering!')).toBeInTheDocument()
        })
    })


})