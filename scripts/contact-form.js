const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyU2CsUCyU_Bjw_BLW-pehKTu6UTUYGFaMyJMJVGwdkSYGO64ngPj_lBUPK9StewzbzQA/exec';

const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const messageDiv = document.getElementById('formStatus');
const isEnglish = document.documentElement.lang === 'en';
const messages = isEnglish ? {
  validation: 'Please enter at least 10 characters in your message.',
  sending: 'Sending...',
  success: 'Your message has been sent. Thank you for getting in touch!\nI usually reply within two business days.',
  failure: 'Unable to send your message: ',
  unknown: 'Unknown error',
  network: 'Unable to send your message. Please check your internet connection and try again later.',
  submit: 'Send message'
} : {
  validation: 'お問い合わせ内容は10文字以上入力してください。',
  sending: '送信中...',
  success: 'お問い合わせを送信しました。ご連絡ありがとうございます！\n通常2営業日以内にご返信いたします。',
  failure: '送信に失敗しました: ',
  unknown: '不明なエラー',
  network: '送信に失敗しました。インターネット接続を確認の上、しばらく経ってから再度お試しください。',
  submit: '送信する'
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  };

  if (data.message.length < 10) {
    showMessage(messages.validation, 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = messages.sending;
  messageDiv.className = 'message';
  messageDiv.style.display = 'none';

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();

    if (result.success) {
      showMessage(messages.success, 'success');
      form.reset();
    } else {
      showMessage(messages.failure + (result.error || messages.unknown), 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage(messages.network, 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = messages.submit;
  }
});

function showMessage(text, type) {
  messageDiv.innerHTML = text.replace(/\n/g, '<br>');
  messageDiv.className = `message ${type} show`;
  messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

document.getElementById('y').textContent = new Date().getFullYear();
