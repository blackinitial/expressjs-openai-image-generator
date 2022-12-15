function onSubmit(e) {
  e.preventDefault();

  document.querySelector('.msg').textContent = '';
  document.querySelector('#image').src = '';

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
    // console.log(data);

    const imageUrl = data.data

    document.querySelector('#image').src = imageUrl;

    removeLoader();
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
}

function showLoader() {
  document.querySelector('.loading-wrap').classList.add('show');
  document.querySelector('.btn').ariaBusy = true;
}

function removeLoader() {
  document.querySelector('.loading-wrap').classList.remove('show');
  document.querySelector('.btn').ariaBusy = false;
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);