import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    // Obtener los datos del formulario
    const data = await request.json();
    const { tipoSolicitud, nombre, tipoDocumento, numeroDocumento, email, telefono, asunto, mensaje } = data;

    // Validar que todos los campos requeridos estén presentes
    if (!tipoSolicitud || !nombre || !tipoDocumento || !numeroDocumento || !email || !telefono || !asunto || !mensaje) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Todos los campos son obligatorios'
        }),
        { status: 400 }
      );
    }

    // Mapear el tipo de solicitud a texto legible
    const tiposSolicitud: Record<string, string> = {
      'peticion': 'Petición',
      'queja': 'Queja',
      'reclamo': 'Reclamo',
      'sugerencia': 'Sugerencia'
    };
    const tipoSolicitudTexto = tiposSolicitud[tipoSolicitud] || tipoSolicitud;

    // Mapear el tipo de documento a texto legible
    const tiposDocumento: Record<string, string> = {
      'cc': 'Cédula de Ciudadanía',
      'ce': 'Cédula de Extranjería',
      'ti': 'Tarjeta de Identidad',
      'pasaporte': 'Pasaporte'
    };
    const tipoDocumentoTexto = tiposDocumento[tipoDocumento] || tipoDocumento;

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
            .tipo-badge {
              display: inline-block;
              padding: 5px 10px;
              border-radius: 3px;
              font-weight: bold;
              text-transform: uppercase;
              font-size: 12px;
            }
            .tipo-peticion { background: #3498db; color: white; }
            .tipo-queja { background: #e74c3c; color: white; }
            .tipo-reclamo { background: #e67e22; color: white; }
            .tipo-sugerencia { background: #2ecc71; color: white; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">Nueva Solicitud PQRS - Vivir IPS</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="field-label">Tipo de Solicitud:</span>
                <span class="tipo-badge tipo-${tipoSolicitud}">${tipoSolicitudTexto}</span>
              </div>
              
              <div class="field">
                <span class="field-label">Asunto:</span>
                <span class="field-value">${asunto}</span>
              </div>
              
              <div class="field">
                <span class="field-label">Nombre Completo:</span>
                <span class="field-value">${nombre}</span>
              </div>
              
              <div class="field">
                <span class="field-label">Documento:</span>
                <span class="field-value">${tipoDocumentoTexto} - ${numeroDocumento}</span>
              </div>
              
              <div class="field">
                <span class="field-label">Email:</span>
                <span class="field-value">${email}</span>
              </div>
              
              <div class="field">
                <span class="field-label">Teléfono:</span>
                <span class="field-value">${telefono}</span>
              </div>
              
              <div class="field">
                <span class="field-label">Mensaje:</span>
                <div class="field-value" style="white-space: pre-wrap;">${mensaje}</div>
              </div>
              
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777;">
                <p>Este mensaje fue enviado desde el formulario PQRS de Vivir IPS</p>
                <p>Fecha: ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar el email usando Resend
    const { data: emailData, error } = await resend.emails.send({
      from: 'PQRS Vivir IPS <onboarding@resend.dev>',
      to: ['servicioalcliente@vivirips.com'],
      replyTo: email, // Para que puedan responder directamente al usuario
      subject: `[PQRS - ${tipoSolicitudTexto}] ${asunto}`,
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
        message: 'Su solicitud PQRS ha sido enviada exitosamente. Le contactaremos pronto.',
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
