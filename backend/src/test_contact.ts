async function testContact() {
  try {
    const res = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Test',
        lastName: 'User',
        company: 'Testing Corp',
        email: 'test@example.com',
        phone: '1234567890',
        subject: 'Test Automation',
        message: 'This is a test message to verify the email automation works with Ethereal.'
      })
    });
    const data = await res.json();
    console.log('Response:', data);
  } catch (err: any) {
    console.error('Error:', err.message);
  }
}

testContact();
