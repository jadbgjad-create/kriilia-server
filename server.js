const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const PORT = 3000;

// Remplace 'TA_VRAIE_CLE_RESEND' par ta vraie clé API Resend en gardant bien les guillemets
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());
app.use(cors());

// Route pour la récupération de mot de passe
app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;
    
    // Générer un code aléatoire à 6 chiffres
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    console.log(`Code de réinitialisation pour ${email} : ${verificationCode}`);

    try {
        await resend.emails.send({
            from: 'Kriilia <onboarding@resend.dev>',
            to: email,
            subject: 'Votre code de réinitialisation Kriilia',
            html: `<p>Votre code de vérification est : <strong>${verificationCode}</strong></p>`
        });

        res.json({ success: true, message: "E-mail envoyé avec succès !" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Erreur lors de l'envoi de l'e-mail." });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur Kriilia démarré sur http://localhost:${PORT}`);
});