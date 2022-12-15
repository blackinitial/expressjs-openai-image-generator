function onSubmit(e) {
  e.preventDefault();

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    showLoader();

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        size
      })
    });

    if (!response.ok) {
      removeLoader();
      throw new Error('That image could not be generated');
    }

    const data = await response.json();
    console.log(data);
    removeLoader();
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
}

function showLoader() {
  document.querySelector('.loading-wrap').classList.add('show');
}

function removeLoader() {
  document.querySelector('.loading-wrap').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);