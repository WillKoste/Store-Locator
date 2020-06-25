const storeForm = document.querySelector('#store-form');
const storeId = document.querySelector('#store-id');
const storeReason = document.querySelector('#store-reason');

const deleteStore = async (e) => {
  e.preventDefault();

  if(storeId.value === '' || storeReason.value === ''){
    alert('Please include a valid Store ID & Reason for removal');
  }

  const sendBody = {
    storeId: storeId.value
  }

  try {
    const res = await fetch(`/api/v1/stores/${storeId.value}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });

    if(res.status === 404 || res.status === 400){
      throw Error('Please include a valid Store ID');
    }

    confirm('Are you sure you want to delete this store?');
    window.location.href = 'index.html';
  } catch (err) {
    alert(err);
    return
  }
}

storeForm.addEventListener('submit', deleteStore);