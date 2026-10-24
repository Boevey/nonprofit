import { useEffect, useState } from 'react'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined
const stripePromise = publishableKey ? loadStripe(publishableKey) : null
const presetAmounts = [10, 25, 50, 100]

type DonationModalProps = {
  onClose: () => void
}

type CheckoutFormProps = {
  amount: number
  onSuccess: () => void
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

function CheckoutForm({ amount, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setMessage('')

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: 'if_required',
    })

    if (error) {
      setMessage(error.message ?? 'Something went wrong. Please try again.')
      setIsProcessing(false)
      return
    }

    if (paymentIntent?.status === 'succeeded') {
      onSuccess()
    } else {
      setMessage('Your payment could not be completed. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <PaymentElement />

      {message && (
        <p className="form-message" role="alert">
          {message}
        </p>
      )}

      <button type="submit" className="btn btn-primary payment-submit" disabled={!stripe || isProcessing}>
        {isProcessing ? 'Processing...' : `Donate ${formatCurrency(amount)}`}
      </button>

      <p className="payment-note">Payments are secure and encrypted by Stripe.</p>
    </form>
  )
}

export default function DonationModal({ onClose }: DonationModalProps) {
  const [amount, setAmount] = useState(25)
  const [customAmount, setCustomAmount] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [isStarting, setIsStarting] = useState(false)
  const [error, setError] = useState('')
  const [donated, setDonated] = useState(false)

  const selectedAmount = customAmount ? Number(customAmount) : amount
  const isValidAmount = Number.isFinite(selectedAmount) && selectedAmount >= 1 && selectedAmount <= 10000

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  function choosePreset(value: number) {
    setAmount(value)
    setCustomAmount('')
    setClientSecret('')
    setError('')
  }

  function handleCustomAmount(event: React.ChangeEvent<HTMLInputElement>) {
    setCustomAmount(event.target.value)
    setClientSecret('')
    setError('')
  }

  async function startPayment() {
    if (!isValidAmount) {
      setError('Enter an amount between $1 and $10,000.')
      return
    }

    setIsStarting(true)
    setError('')

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: selectedAmount }),
      })

      const data = await response.json()

      if (!response.ok || !data.clientSecret) {
        throw new Error(data.error ?? 'Unable to start the payment.')
      }

      setClientSecret(data.clientSecret)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to start the payment.')
    } finally {
      setIsStarting(false)
    }
  }

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="donation-modal" role="dialog" aria-modal="true" aria-labelledby="donation-title">
        <button type="button" className="modal-close" aria-label="Close donation form" onClick={onClose}>
          ×
        </button>

        {donated ? (
          <div className="donation-success">
            <span className="success-icon" aria-hidden="true">
              💛
            </span>
            <h2 id="donation-title">Thank you for your donation!</h2>
            <p>
              Your {formatCurrency(selectedAmount)} gift helps us rescue, restore, and rehome dogs in need.
            </p>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Support the mission</p>
            <h2 id="donation-title">Make a donation</h2>
            <p className="modal-intro">
              Every gift provides medical care, shelter, and a second chance for a rescued dog.
            </p>

            {!publishableKey ? (
              <div className="modal-error" role="alert">
                Missing Stripe publishable key. Add <code>VITE_STRIPE_PUBLISHABLE_KEY</code> to your{' '}
                <code>.env</code> file and restart the dev server.
              </div>
            ) : !clientSecret ? (
              <div className="donation-step">
                <div className="amount-grid">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      className={`amount-option ${!customAmount && amount === preset ? 'is-selected' : ''}`}
                      onClick={() => choosePreset(preset)}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>

                <label className="custom-amount">
                  <span>Or enter a custom amount</span>
                  <div className="custom-amount-input">
                    <span aria-hidden="true">$</span>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      step="1"
                      inputMode="decimal"
                      placeholder="Amount"
                      value={customAmount}
                      onChange={handleCustomAmount}
                    />
                  </div>
                </label>

                {error && (
                  <p className="form-message" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  className="btn btn-primary payment-submit"
                  onClick={startPayment}
                  disabled={isStarting}
                >
                  {isStarting ? 'Preparing...' : `Continue with ${formatCurrency(selectedAmount || 0)}`}
                </button>

                <p className="payment-note">Test mode: use card 4242 4242 4242 4242 with any future expiry.</p>
              </div>
            ) : (
              <div className="donation-step">
                <div className="payment-summary">
                  <span>Donation amount</span>
                  <strong>{formatCurrency(selectedAmount)}</strong>
                </div>

                <button
                  type="button"
                  className="link-button"
                  onClick={() => {
                    setClientSecret('')
                    setError('')
                  }}
                >
                  Change amount
                </button>

                {stripePromise ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: 'stripe',
                        variables: {
                          colorPrimary: '#111827',
                          borderRadius: '12px',
                        },
                      },
                    }}
                  >
                    <CheckoutForm amount={selectedAmount} onSuccess={() => setDonated(true)} />
                  </Elements>
                ) : (
                  <p className="form-message" role="alert">
                    Stripe failed to load. Please refresh the page and try again.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
