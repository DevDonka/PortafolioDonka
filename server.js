const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // Cambia esto si tu cliente está en otro dominio
    methods: ['POST']
}));

app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dubanp1211@gmail.com',
            pass: 'Duban_1112YP' // Contraseña de aplicación
        }
    });

    const mailOptions = {
        from: email,
        to: 'dubanp1211@gmail.com',
        subject: `Nuevo mensaje de ${name}`,
        text: message
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: ', info.response); // Verifica en la consola
        res.status(200).send('Correo enviado exitosamente');
    } catch (error) {
        console.error('Error al enviar el correo: ', error); // Muestra el error en la consola
        res.status(500).send('Error al enviar el correo');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});