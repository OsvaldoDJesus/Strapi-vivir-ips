import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    // Obtener los datos del formulario
    const data = await request.json();
    const { nombre, email, telefono, asunto, mensaje } = data;

    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !email || !asunto || !mensaje) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Los campos nombre, email, asunto y mensaje son obligatorios'
        }),
        { status: 400 }
      );
    }

    // Crear el contenido del email en HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #3498db, #1a5276);
              color: white;
              padding: 20px;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 0 0 5px 5px;
            }
            .field {
              margin-bottom: 15px;
              padding: 10px;
              background: white;
              border-radius: 3px;
            }
            .field-label {
              font-weight: bold;
              color: #3498db;
              display: block;
              margin-bottom: 5px;
            }
            .field-value {
              color: #333;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">Nuevo Mensaje de Contacto - Vivir IPS</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="field-label">Asunto:</span>
                <span class="field-value">${asunto}</span>
              </div>
              
              <div class="field">
                <span class="field-label">Nombre:</span>
                <span class="field-value">${nombre}</span>
              </div>
              
              <div class="field">
                <span class="field-label">Email:</span>
                <span class="field-value">${email}</span>
              </div>
              
              ${telefono ? `
              <div class="field">
                <span class="field-label">Teléfono:</span>
                <span class="field-value">${telefono}</span>
              </div>
              ` : ''}
              
              <div class="field">
                <span class="field-label">Mensaje:</span>
                <div class="field-value" style="white-space: pre-wrap;">${mensaje}</div>
              </div>
              
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777;">
                <p>Este mensaje fue enviado desde el formulario de contacto de Vivir IPS</p>
                <p>Fecha: ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar el email usando Resend
    const { data: emailData, error } = await resend.emails.send({
      from: 'Contacto Vivir IPS <onboarding@resend.dev>',
      to: ['servicioalcliente@vivirips.com'],
      replyTo: email, // Para que puedan responder directamente al usuario
      subject: `[Contacto Web] ${asunto}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Error al enviar email:', error);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Error al enviar el mensaje. Por favor, intente nuevamente.'
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Su mensaje ha sido enviado exitosamente. Le contactaremos pronto.',
        emailId: emailData?.id
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en el endpoint:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error al procesar la solicitud. Por favor, intente nuevamente.'
      }),
      { status: 500 }
    );
  }
};
