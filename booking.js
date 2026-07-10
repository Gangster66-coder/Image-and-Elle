// ===== BOOKING MODAL — Image & Elle =====

function openBookingModal(){
  const overlay = document.getElementById('booking-modal-overlay');
  if(!overlay) return;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal(){
  const overlay = document.getElementById('booking-modal-overlay');
  if(!overlay) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function(){
  const overlay = document.getElementById('booking-modal-overlay');
  const form = document.getElementById('booking-form');
  const statusEl = document.getElementById('booking-status');

  // close when clicking outside the modal box
  if(overlay){
    overlay.addEventListener('click', function(e){
      if(e.target === overlay) closeBookingModal();
    });
  }

  // close on Escape key
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeBookingModal();
  });

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const submitBtn = form.querySelector('.booking-submit');
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours...';
      statusEl.textContent = '';
      statusEl.className = 'booking-status';

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => {
        if(data.success){
          statusEl.textContent = 'Merci ! Votre demande a bien été envoyée, nous revenons vers vous rapidement.';
          statusEl.className = 'booking-status success';
          form.reset();
          setTimeout(closeBookingModal, 2500);
        } else {
          statusEl.textContent = "Une erreur est survenue. Merci de réessayer ou de nous écrire directement.";
          statusEl.className = 'booking-status error';
        }
      })
      .catch(() => {
        statusEl.textContent = "Une erreur est survenue. Merci de réessayer ou de nous écrire directement.";
        statusEl.className = 'booking-status error';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer →';
      });
    });
  }
});
