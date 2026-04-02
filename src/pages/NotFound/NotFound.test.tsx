import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { NotFound } from './NotFound.tsx'

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: vi.fn() }
})

const renderNotFound = () =>
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  )

describe('NotFound', () => {
  it('Should render the 404 error code', () => {
    renderNotFound()

    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('Should render the error message', () => {
    renderNotFound()

    expect(screen.getByText("Cette page n'existe pas.")).toBeInTheDocument()
  })

  it('Should render the back to home button', () => {
    renderNotFound()

    expect(screen.getByRole('button', { name: "Retour à l'accueil" })).toBeInTheDocument()
  })

  it('Should navigate to home when clicking the button', async () => {
    const navigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(navigate)

    renderNotFound()

    await userEvent.click(screen.getByRole('button', { name: "Retour à l'accueil" }))

    expect(navigate).toHaveBeenCalledWith('/')
  })
})
