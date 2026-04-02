import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfirmDialog } from './ConfirmDialog'

const defaultProps = {
  open: true,
  title: 'Se désinscrire',
  description: 'Voulez-vous vous désinscrire ?',
  onConfirm: vi.fn(),
  onCancel: vi.fn(),
}

describe('ConfirmDialog', () => {
  it('Should render title and description when open', () => {
    render(<ConfirmDialog {...defaultProps} />)

    expect(screen.getByText('Se désinscrire')).toBeInTheDocument()
    expect(screen.getByText('Voulez-vous vous désinscrire ?')).toBeInTheDocument()
  })

  it('Should not be visible when closed', () => {
    render(<ConfirmDialog {...defaultProps} open={false} />)

    expect(screen.queryByText('Se désinscrire')).not.toBeInTheDocument()
  })

  it('Should display default labels when confirmLabel and cancelLabel are not provided', () => {
    render(<ConfirmDialog {...defaultProps} />)

    expect(screen.getByText('Confirmer')).toBeInTheDocument()
    expect(screen.getByText('Annuler')).toBeInTheDocument()
  })

  it('Should display custom labels when provided', () => {
    render(<ConfirmDialog {...defaultProps} confirmLabel="Supprimer" cancelLabel="Retour" />)

    expect(screen.getByText('Supprimer')).toBeInTheDocument()
    expect(screen.getByText('Retour')).toBeInTheDocument()
  })

  it('Should call onConfirm when confirm button is clicked', async () => {
    const onConfirm = vi.fn()
    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />)

    await userEvent.click(screen.getByText('Confirmer'))

    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('Should call onCancel when cancel button is clicked', async () => {
    const onCancel = vi.fn()
    render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />)

    await userEvent.click(screen.getByText('Annuler'))

    expect(onCancel).toHaveBeenCalledTimes(1)
  })
})
