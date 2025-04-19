import { useState } from 'react'
import axios from 'axios'

function App() {
  const [formData, setFormData] = useState({
    amount: '',
    currencyCode: '',
    upiLink: false,
    returnUrl: '',
    email: ''
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Ensure amount is a valid positive whole number
    const amountInt = parseInt(formData.amount, 10)
    if (isNaN(amountInt) || amountInt <= 0) {
      alert('Amount must be a positive whole number (e.g., 2234 for ₹22.34)')
      return
    }

    const data = {
      ...formData,
      amount: amountInt // send as number
    }

    try {
      const res = await axios.post('http://localhost:4000/confirm', data)
      const paymentLink = res?.data?.message?.paymentLink
      if (paymentLink) {
        window.location.href = paymentLink
      } else {
        alert('Payment link not found in response')
      }
    } catch (err) {
      console.error('Error:', err)
      alert('Failed to generate payment link')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Amount (in paise):
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="1"
            step="1"
            required
          />
        </label>
        <br />
        <label>
          Currency Code:
          <input
            type="text"
            name="currencyCode"
            value={formData.currencyCode}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Return URL:
          <input
            type="text"
            name="returnUrl"
            value={formData.returnUrl}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          UPI Link:
          <input
            type="checkbox"
            name="upiLink"
            checked={formData.upiLink}
            onChange={handleChange}
          />
        </label>
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
