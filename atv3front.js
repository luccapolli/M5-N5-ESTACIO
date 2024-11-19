function login() {
    let _data = {
      username: username,
      password: password
    };
  
    fetch('https://dominio.com/auth', {
      method: "POST",
      body: JSON.stringify(_data),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .then(json => {
      localStorage.setItem("token", json.jwt_token);
  
      const payload = JSON.parse(atob(json.jwt_token.split('.')[1]));
      localStorage.setItem("token_exp", payload.exp); 
    })
    .catch(err => console.log(err));
  }
  
  function doAction() {
    const token = localStorage.getItem("token");
    const tokenExp = localStorage.getItem("token_exp");
    const currentTime = Math.floor(Date.now() / 1000); 
  
    if (currentTime >= tokenExp) {
      console.log('Token expirado, redirecionando para login.');
      window.location.href = '/login';
      return;
    }
  
    fetch('https://dominio.com/do_SomeAction', {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`,
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log(`response: ${json}`);
    })
    .catch(err => console.log(err));
  }
  