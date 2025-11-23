import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, city, hasCar, workType, message } = body;

    // Validate required fields
    if (!name || !phone || !email || !city || !hasCar || !workType) {
      return NextResponse.json(
        { error: 'Wszystkie wymagane pola muszą być wypełnione' },
        { status: 400 }
      );
    }

    // Format work type
    const workTypeText: { [key: string]: string } = {
      taxi: 'Taxi (przewóz osób)',
      delivery: 'Delivery (jedzenie/zakupy)',
      both: 'Oba',
    };

    // Format car status
    const carStatusText: { [key: string]: string } = {
      yes: 'Tak',
      no: 'Nie',
      soon: 'Planuję w najbliższym czasie',
    };

    // Create email content
    const emailSubject = `Nowa rejestracja kierowcy - ${name}`;
    
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background: linear-gradient(135deg, #0BA14C 0%, #0a8a3f 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
    .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0BA14C; }
    .info-row { margin: 10px 0; }
    .label { font-weight: bold; color: #0BA14C; }
    .divider { border-top: 2px solid #0BA14C; margin: 20px 0; }
    .footer { text-align: center; color: #666; margin-top: 30px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <h2 style="margin: 0;">🚗 Nowa rejestracja kierowcy</h2>
  </div>
  <div class="content">
    <p style="font-size: 18px; margin-bottom: 20px;">
      <strong>Szanowny Panie Filipie i Pawle, prezesowie moi kochani,</strong>
    </p>
    <p style="font-size: 16px; margin-bottom: 30px;">
      Jest nowy zainteresowany pracą! 🎉
    </p>
    
    <div class="info-box">
      <div class="info-row">
        <span class="label">Imię i nazwisko:</span> ${name}
      </div>
      <div class="info-row">
        <span class="label">Telefon:</span> ${phone}
      </div>
      <div class="info-row">
        <span class="label">Email:</span> ${email}
      </div>
      <div class="info-row">
        <span class="label">Miasto:</span> ${city}
      </div>
      <div class="info-row">
        <span class="label">Własny samochód:</span> ${carStatusText[hasCar] || hasCar}
      </div>
      <div class="info-row">
        <span class="label">Typ pracy:</span> ${workTypeText[workType] || workType}
      </div>
      ${message ? `
      <div class="divider"></div>
      <div class="info-row">
        <span class="label">Dodatkowe informacje:</span><br>
        ${message}
      </div>
      ` : ''}
    </div>
    
    <p style="margin-top: 30px; font-size: 16px;">
      Proszę o kontakt z kandydatem.
    </p>
    
    <div class="footer">
      <p>Pozdrawiam,<br>System rejestracji moviQ</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    const emailText = `
Szanowny Panie Filipie i Pawle, prezesowie moi kochani,

Jest nowy zainteresowany pracą! 🚗

Szczegóły zgłoszenia:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Imię i nazwisko: ${name}
Telefon: ${phone}
Email: ${email}
Miasto: ${city}
Własny samochód: ${carStatusText[hasCar] || hasCar}
Typ pracy: ${workTypeText[workType] || workType}
${message ? `Dodatkowe informacje: ${message}` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Proszę o kontakt z kandydatem.

Pozdrawiam,
System rejestracji moviQ
    `.trim();

    // Send email using Resend API directly via fetch (no library needed)
    const resendApiKey = process.env.RESEND_API_KEY;
    // Always use default Resend email (works without domain verification)
    const fromEmail = 'onboarding@resend.dev';

    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Konfiguracja email nie jest ukończona' },
        { status: 500 }
      );
    }

    // In test mode, Resend only allows sending to the account owner's email
    // Send to both recipients - if one fails, try the other
    const recipients = ['balcerzak@comoq.pl', 'szuda@comoq.pl'];
    
    let lastError: string | null = null;
    let successCount = 0;

    // Try to send to each recipient
    for (const to of recipients) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: fromEmail,
            to,
            subject: emailSubject,
            html: emailHtml,
            text: emailText,
          }),
        });

        if (response.ok) {
          successCount++;
          console.log(`Email sent successfully to ${to}`);
        } else {
          const errorData = await response.json();
          lastError = errorData.message || 'Unknown error';
          console.error(`Failed to send email to ${to}:`, errorData);
          // Continue to next recipient
        }
      } catch (error) {
        lastError = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Error sending email to ${to}:`, error);
        // Continue to next recipient
      }
    }

    // If at least one email was sent successfully, return success
    if (successCount > 0) {
      return NextResponse.json(
        { message: `Email został wysłany pomyślnie do ${successCount} odbiorc${successCount === 1 ? 'y' : 'ów'}` },
        { status: 200 }
      );
    }

    // If all failed, return error
    return NextResponse.json(
      { error: `Wystąpił błąd podczas wysyłania emaila: ${lastError || 'Nie udało się wysłać do żadnego odbiorcy'}` },
      { status: 500 }
    );

    return NextResponse.json(
      { message: 'Email został wysłany pomyślnie' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas wysyłania emaila' },
      { status: 500 }
    );
  }
}
