export interface ContactEmailData {
  nombre: string;
  email: string;
  telefono?: string;
  organizacion?: string;
  sitioWeb?: string;
  servicios?: string;
  mensaje?: string;
}

const serviceLabels: Record<string, string> = {
  branding: 'Branding',
  web: 'Sitios Web',
  redes: 'Redes Sociales',
  animaciones: 'Animaciones',
};

function buildEmailHtml(data: ContactEmailData): string {
  const serviciosFormatted = data.servicios
    ? data.servicios
        .split(',')
        .map((s) => serviceLabels[s.trim()] || s.trim())
        .join(', ')
    : 'No especificado';

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nueva consulta — HighDesign</title>
</head>
<body style="margin:0;padding:0;background:#0d0618;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0618;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7741EA,#35F099);border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
              <h1 style="margin:0;color:#fff;font-size:28px;font-weight:800;letter-spacing:-0.5px;">
                HighDesign
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">
                Nueva consulta entrante
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#1a1028;padding:40px;border-radius:0 0 16px 16px;">

              <p style="margin:0 0 28px;color:#a78bfa;font-size:13px;text-transform:uppercase;letter-spacing:0.15em;font-weight:600;">
                Datos del contacto
              </p>

              <!-- Info grid -->
              <table width="100%" cellpadding="0" cellspacing="0">
                ${row('Nombre', data.nombre)}
                ${row('Email', `<a href="mailto:${data.email}" style="color:#35F099;text-decoration:none;">${data.email}</a>`)}
                ${data.telefono ? row('Teléfono', data.telefono) : ''}
                ${data.organizacion ? row('Organización', data.organizacion) : ''}
                ${data.sitioWeb ? row('Sitio Web', `<a href="${data.sitioWeb}" style="color:#35F099;text-decoration:none;">${data.sitioWeb}</a>`) : ''}
              </table>

              <!-- Services badge -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td style="background:rgba(119,65,234,0.15);border:1px solid rgba(119,65,234,0.4);border-radius:12px;padding:20px 24px;">
                    <p style="margin:0 0 6px;color:#a78bfa;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">
                      Servicio(s) de interés
                    </p>
                    <p style="margin:0;color:#fff;font-size:18px;font-weight:700;">
                      ${serviciosFormatted}
                    </p>
                  </td>
                </tr>
              </table>

              ${data.mensaje ? `
              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                <tr>
                  <td style="background:rgba(255,255,255,0.05);border-radius:12px;padding:20px 24px;">
                    <p style="margin:0 0 8px;color:#a78bfa;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">
                      Mensaje
                    </p>
                    <p style="margin:0;color:#d1d5db;font-size:15px;line-height:1.7;">
                      ${data.mensaje.replace(/\n/g, '<br>')}
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Footer note -->
              <p style="margin:36px 0 0;color:#6b7280;font-size:13px;text-align:center;line-height:1.6;">
                Este email fue generado automáticamente desde el formulario de contacto de HighDesign.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

function row(label: string, value: string): string {
  return `
  <tr>
    <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
      <span style="color:#9ca3af;font-size:13px;font-weight:500;">${label}</span>
    </td>
    <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;">
      <span style="color:#f9fafb;font-size:14px;">${value}</span>
    </td>
  </tr>`;
}

export async function sendContactEmail(
  data: ContactEmailData
): Promise<{ success: boolean; error?: string }> {
  const apiKey = import.meta.env.VITE_RESEND_API_KEY;

  if (!apiKey) {
    console.warn('VITE_RESEND_API_KEY not set — skipping email send');
    return { success: false, error: 'API key not configured' };
  }

  const serviciosFormatted = data.servicios
    ? data.servicios
        .split(',')
        .map((s) => serviceLabels[s.trim()] || s.trim())
        .join(', ')
    : '';

  const subject = serviciosFormatted
    ? `Nueva consulta de ${data.nombre} — ${serviciosFormatted}`
    : `Nueva consulta de ${data.nombre}`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'HighDesign <hola@highdesign.agency>',
        to: ['natanaof@gmail.com'],
        subject,
        html: buildEmailHtml(data),
      }),
    });

    if (response.ok) {
      return { success: true };
    }

    const err = await response.json().catch(() => ({}));
    console.error('Resend API error:', err);
    return { success: false, error: (err as { message?: string }).message };
  } catch (e) {
    console.error('sendContactEmail failed:', e);
    return { success: false, error: 'Network error' };
  }
}
