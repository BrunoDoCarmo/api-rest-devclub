import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export class EsqueceuSenhaEnvioService {
    async execute(email: string) {
        const token = jwt.sign(
            { email }, 
            process.env.JWT_ACCESS_SECRET || 'secret_fallback', 
            { expiresIn: '1h' }
        );
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
        const resetLink = `${process.env.APP_URL}/esqueceu-senha?token=${token}`;
        await transporter.sendMail({
            from: `"Equipe do Sistema" <${process.env.MAIL_FROM}>`,
            to: email,
            subject: "Recuperação de Senha",
            html: `
                <div style="background-color: #09090b; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    <div style="max-width: 500px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);">
                        <div style="padding: 30px 40px; text-align: center; border-bottom: 1px solid #27272a;">
                            <h1 style="color: #00a63e; margin: 0; font-size: 24px; letter-spacing: -1px;">InovaSoft</h1>
                        </div>
                        <div style="padding: 40px;">
                            <h2 style="color: #ffffff; font-size: 20px; margin-top: 0;">Recuperação de Senha</h2>
                            <p style="color: #a1a1aa; line-height: 1.6; font-size: 15px;">
                                Recebemos uma solicitação para redefinir a senha da sua conta. Se você não fez essa solicitação, pode ignorar este e-mail com segurança.
                            </p>
                            <div style="padding: 20px 0; text-align: center;">
                                <a href="${resetLink}"
                                    style="
                                        background-color:#4f46e5;
                                        color:#ffffff;
                                        text-decoration:none;
                                        padding:14px 28px;
                                        border-radius:6px;
                                        font-weight:bold;
                                        font-family:Arial,Helvetica,sans-serif;
                                        display:inline-block;
                                    "
                                >
                                    Redefinir Senha
                                </a>
                            </div>
                            <p style="color: #71717a; font-size: 13px; line-height: 1.5; margin-top: 30px; border-top: 1px solid #27272a; padding-top: 20px;">
                                Este link expira em 1 hora por motivos de segurança. <br>
                                Se o botão não funcionar, copie e cole o link abaixo no seu navegador:
                                <br>
                                <span style="color: #3b82f6; word-break: break-all;">${resetLink}</span>
                            </p>
                        </div>
                        <div style="background-color: #111113; padding: 20px 40px; text-align: center;">
                            <p style="color: #52525b; font-size: 12px; margin: 0;">
                                © 2024 Finance AI. Todos os direitos reservados.
                            </p>
                        </div>
                    </div>
                </div>
            `
        });
    }
}