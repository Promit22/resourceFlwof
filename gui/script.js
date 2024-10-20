// Handle field visibility based on selected method
document.addEventListener('DOMContentLoaded', function() {
  const methodSelect = document.getElementById('method');
  const defaultMethod = 'GET'; // Choose your default method
  methodSelect.value = defaultMethod;

  // Call toggleFields() to adjust the visible fields based on the selected method
  toggleFields();
});
function toggleFields() {
  const method = document.getElementById('method').value;
  console.log(method);
  const idField = document.getElementById('id-field');
  const typeField = document.getElementById('type-field');
  const descriptionField = document.getElementById('description-field');
  const linkField = document.getElementById('link-field');
  const key = document.getElementById('key-field');
  const sharedBy = document.getElementById('sharedBy-field');

  // Show/Hide based on method selection
  if (method === 'GET') {
    idField.style.display = 'block'; // Optional for GET if querying by ID
    typeField.style.display = 'none';
    descriptionField.style.display = 'none';
    sharedBy.style.display = 'none';
    linkField.style.display = 'none';
    key.style.display = 'none';
  } else if (method === 'POST') {
    key.style.display = 'block';
    idField.style.display = 'none';
    typeField.style.display = 'block';
    descriptionField.style.display = 'block';
    linkField.style.display = 'block';
    sharedBy.style.display = 'block';
    //typeField.setAttribute('required', true);
  } else if (method === 'PUT') {
    key.style.display = 'block';
    idField.style.display = 'block'; // Required for PUT
    typeField.style.display = 'block';
    typeField.required = false;
    descriptionField.style.display = 'block';
    linkField.style.display = 'block';
    sharedBy.style.display = 'block';
  }
}

// Handle form submission
document.getElementById('api-form').addEventListener('submit', function(event) {
  console.log('sucks');
  event.preventDefault(); // Prevent the form from refreshing the page
  const method = document.getElementById('method').value;
  const apiKey = document.getElementById('api-key').value;
  const id = document.getElementById('id').value;
  const link = document.getElementById('link').value;
  const type = document.getElementById('type').value;
  const name = document.getElementById('sharedBy').value;
  const keywar = document.getElementById('keywar');
  const idwar = document.getElementById('idwar');
  const typewar = document.getElementById('typewar');
  const linkwar = document.getElementById('linkwar');
  const description = document.getElementById('description').value;
  keywar.innerText = '';
  idwar.innerText = '';
  typewar.innerText = '';
  linkwar.innerText = '';

  if (method === "POST" || method === "PUT") {
    if (method === "PUT") {
      if (!id) {
        //alert("");
        idwar.innerText = "Id can't be empty in put request";
        return '';
      } else if (!apiKey) {
        //alert(');
        keywar.innerText = "Api Key cannot be empty";
        return '';
      }
    } else if (method === "POST") {
      if (!apiKey) {
        //alert();
        keywar.innerText = 'Api Key cannot be empty';
        return '';
      } else if (!type) {
        //alert();
        typewar.innerText = 'Type cannot be empty';
        return '';
      } else if (!link) {
        //alert();
        linkwar.innerText = 'Link cannot be empty';
        return '';
      }
    }
  }
  document.getElementById('output').innerText = 'Please wait...';
  // Form the request based on method
  let url = 'https://resourceflwo.onrender.com/links';
  let options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    }
  };

  if (method === 'GET') {
    if (id) url += `/${id}`;
  } else if (method === 'POST' || method === 'PUT') {
    if (method === 'PUT' && id) url += `/${id}`;
    options.body = JSON.stringify({
      sharedBy: name,
      type: type,
      description: description,
      link: link
    });
  }
  // Fetch request
  fetch(url, options)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const output = document.getElementById('output');
    const length = data.length;
    for (let i = 0; i < data.length; i++) {
      const div = document.createElement('div');
      div.classList.add('res');
      const hfive = document.createElement('h5');
      hfive.textContent = 'Id: ' + data[i]['id'];
      div.appendChild(hfive);
      const h5 = document.createElement('h3');
      h5.textContent = 'Shared By: ' + data[i]['sharedBy'];
      div.appendChild(h5);
      const h52 = document.createElement('h4');
      h52.textContent = 'Type: ' + data[i]['type'];
      div.appendChild(h52);
      const a = document.createElement('a');
      a.href = data[i]['link'];
      a.textContent = 'Visit';
      div.appendChild(a);
      const p = document.createElement('p');
      p.textContent = 'Description: ' + data[i]['description'];
      div.appendChild(p);
      output.appendChild(div);
    }
  })
  .catch(error => {
    document.getElementById('output').innerText = `Error: ${error.message}`;
  });
});