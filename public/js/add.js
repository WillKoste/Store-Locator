const storeForm = document.querySelector('#store-form');
const storeId = document.querySelector('#store-id');
const storeAddress = document.querySelector('#store-address');

const addStore = async (e) => {
  e.preventDefault();

  if(storeId.value === '' || storeAddress.value === ''){
    alert('Please include a Store ID & Address');
  }

  const sendBody = {
    storeId: storeId.value,
    address: storeAddress.value
  }

  try {
    const res = await fetch('/api/v1/stores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });

    if(res.status === 400){
      throw Error('Store ID is already in use, please use another')
    }

    alert('Store created successfully');
    window.location.href = 'index.html';
  } catch (err) {
    alert(err);
    return;
  }
}

storeForm.addEventListener('submit', addStore);