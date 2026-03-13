const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Root route for health check
app.get('/', (req, res) => {
    res.send('Terminal Portfolio Backend is running!');
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
    const { fullName, mobileNumber, workEmail, subject, message } = req.body;

    if (!fullName || !workEmail || !subject) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Create Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS // App Password should be used here
            }
        });

        const mailOptions = {
            from: workEmail,
            to: process.env.EMAIL_USER,
            subject: `New Message from Portfolio: ${subject}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">New Inquiry Received</h2>
                    
                    <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; margin-top: 20px;">
                        <p style="margin: 5px 0;"><strong>👤 Name:</strong> ${fullName}</p>
                        <p style="margin: 5px 0;"><strong>📞 Mobile:</strong> ${mobileNumber}</p>
                        <p style="margin: 5px 0;"><strong>📧 Email:</strong> ${workEmail}</p>
                    </div>

                    <div style="margin-top: 20px; padding: 15px; background-color: #ecf0f1; border-left: 5px solid #3498db; border-radius: 3px;">
                        <h4 style="margin-top: 0; color: #2980b9;">Message Content:</h4>
                        <p style="color: #34495e; line-height: 1.6; white-space: pre-wrap;">${message || 'No additional message body provided.'}</p>
                    </div>

                    <div style="margin-top: 30px; text-align: center;">
                        <a href="mailto:${workEmail}?subject=find your inquiry from portfolio" 
                           style="display: inline-block; padding: 12px 25px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                            Reply to ${fullName}
                        </a>
                    </div>

                    <p style="margin-top: 30px; font-size: 12px; color: #7f8c8d; text-align: center;">
                        This message was sent via your Terminal Portfolio Contact Form.
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Nodemailer Error:', error);
        res.status(500).json({ error: 'Failed to send email. Check backend logs.' });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
