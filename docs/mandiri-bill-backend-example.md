# Mandiri Bill Payment Implementation Guide

## Backend Implementation for Mandiri Bill

Based on the Midtrans Core API documentation, here's how to implement Mandiri Bill payment on your backend:

### 1. Create Payment Request (Backend)

```javascript
// Example using Node.js/Express
const midtransClient = require('midtrans-client');

// Initialize Core API client
const core = new midtransClient.CoreApi({
    isProduction: false, // Set to true for production
    serverKey: 'YOUR_SERVER_KEY',
    clientKey: 'YOUR_CLIENT_KEY'
});

// Create Mandiri Bill payment
app.post('/payments/:bookingId', async (req, res) => {
    try {
        const { payment_method } = req.body;
        const { bookingId } = req.params;
        
        // Get booking details from your database
        const booking = await getBookingById(bookingId);
        
        if (payment_method === 'mandiri_bill') {
            const parameter = {
                "payment_type": "echannel",
                "transaction_details": {
                    "order_id": `LEVI-${bookingId}-${Date.now()}`,
                    "gross_amount": booking.total_amount
                },
                "echannel": {
                    "bill_info1": "Payment for:",
                    "bill_info2": `Tent Reservation - ${booking.id}`
                },
                "customer_details": {
                    "first_name": booking.guest_name,
                    "email": booking.guest_email,
                    "phone": booking.guest_phone
                }
            };

            const chargeResponse = await core.charge(parameter);
            
            // Save payment details to your database
            const payment = await createPayment({
                booking_id: bookingId,
                transaction_id: chargeResponse.transaction_id,
                payment_method: 'mandiri_bill',
                total_amount: booking.total_amount,
                transaction_status: chargeResponse.transaction_status,
                expired_at: chargeResponse.expiry_time
            });

            // Return response to frontend
            res.json({
                status: 200,
                message: 'Payment created successfully',
                data: {
                    order_id: chargeResponse.order_id,
                    payment: payment,
                    payment_detail: [{
                        type: 'mandiri_bill',
                        company_code: chargeResponse.biller_code,
                        bill_key: chargeResponse.bill_key,
                        biller_code: chargeResponse.biller_code
                    }],
                    expired_at: chargeResponse.expiry_time
                }
            });
        }
    } catch (error) {
        console.error('Payment creation error:', error);
        res.status(500).json({
            status: 500,
            message: 'Failed to create payment',
            error: error.message
        });
    }
});
```

### 2. Handle Payment Notification (Webhook)

```javascript
// Webhook endpoint to handle payment notifications from Midtrans
app.post('/payments/notification', async (req, res) => {
    try {
        const notification = req.body;
        
        // Verify notification authenticity
        const statusResponse = await core.transaction.notification(notification);
        
        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;
        const fraudStatus = statusResponse.fraud_status;

        // Update payment status in your database
        if (transactionStatus === 'settlement') {
            // Payment successful
            await updatePaymentStatus(orderId, 'success');
            await updateBookingStatus(orderId, 'confirmed');
            
            // Send confirmation email to customer
            await sendConfirmationEmail(orderId);
            
        } else if (transactionStatus === 'pending') {
            // Payment pending
            await updatePaymentStatus(orderId, 'pending');
            
        } else if (transactionStatus === 'deny' || transactionStatus === 'cancel' || transactionStatus === 'expire') {
            // Payment failed/cancelled/expired
            await updatePaymentStatus(orderId, 'failed');
            await updateBookingStatus(orderId, 'cancelled');
        }

        res.status(200).json({ status: 'OK' });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: error.message });
    }
});
```

### 3. Check Payment Status

```javascript
// Check payment status endpoint
app.get('/payments/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;
        
        // Get payment from your database
        const payment = await getPaymentByBookingId(bookingId);
        
        if (!payment) {
            return res.status(404).json({
                status: 404,
                message: 'Payment not found'
            });
        }

        // Check status from Midtrans
        const statusResponse = await core.transaction.status(payment.transaction_id);
        
        // Update local database if status changed
        if (statusResponse.transaction_status !== payment.transaction_status) {
            await updatePaymentStatus(payment.transaction_id, statusResponse.transaction_status);
        }

        res.json({
            status: 200,
            message: 'Payment status retrieved',
            data: {
                ...payment,
                transaction_status: statusResponse.transaction_status
            }
        });
    } catch (error) {
        console.error('Status check error:', error);
        res.status(500).json({
            status: 500,
            message: 'Failed to check payment status',
            error: error.message
        });
    }
});
```

### 4. Key Differences from Virtual Account

1. **Payment Type**: Use `"echannel"` instead of `"bank_transfer"`
2. **Response Fields**: 
   - `biller_code`: Company code for Mandiri Bill
   - `bill_key`: Payment code for customer
3. **Payment Flow**: Customer uses company code + bill key instead of VA number

### 5. Frontend Integration

The frontend implementation you've created will work with this backend. Make sure your backend returns the correct response format:

```json
{
    "status": 200,
    "message": "Payment created successfully",
    "data": {
        "order_id": "LEVI-123-1234567890",
        "payment": {
            "id": "payment_id",
            "booking_id": "booking_id",
            "transaction_id": "transaction_id",
            "transaction_status": "pending",
            "payment_method": "mandiri_bill",
            "total_amount": 500000,
            "expired_at": "2024-01-01T23:59:59Z",
            "created_at": "2024-01-01T10:00:00Z",
            "updated_at": "2024-01-01T10:00:00Z"
        },
        "payment_detail": [{
            "type": "mandiri_bill",
            "company_code": "12345",
            "bill_key": "1234567890123456",
            "biller_code": "12345"
        }],
        "expired_at": "2024-01-01T23:59:59Z"
    }
}
```

### 6. Testing

1. Use Midtrans Sandbox environment for testing
2. Test with sandbox credentials
3. Use test bill codes provided by Midtrans documentation

### 7. Production Checklist

- [ ] Switch to production server key
- [ ] Set `isProduction: true` in Midtrans client
- [ ] Configure proper webhook URL
- [ ] Test with real Mandiri Bill payment
- [ ] Implement proper error handling and logging
- [ ] Set up monitoring for payment failures 