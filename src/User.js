import { useState, useEffect } from 'react';

export default function User(props){
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  let email = props.email;
  useEffect(async () => {
    let user = await getUserByEmail(email);
    if(user === null){
      window.location.reload();
    }
    setUser(user);
    let unsplashImage = await getAvatar();
    setLoading(false);
    console.log(unsplashImage);
    document.querySelector('img').src = unsplashImage.urls.thumb;
  }, [])

  if(loading){
    return <h1>Loading...</h1>
  }else{
    return(
      <div>
      <img src='' />
      <div id="userinfo">
        <p>Name: {user.first_name} {user.last_name}</p>
        <p>Email: { email }</p>
        <p>Gender: { user.gender }</p>
        <p>IP_Address: { user.ip_address }</p>
      </div>
      </div>
    )
  }

}

async function getUserByEmail(email){
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query: `
        query {
          getUserByEmail(email: "${email}"){
            first_name
            last_name
            gender
            ip_address
          }
        }
        `
      })
    })
    .then(res => res.json())
    .then(data => resolve(data.data.getUserByEmail))
  })
}

async function getAvatar(){
  let url = new URL('https://api.unsplash.com/photos/random');
  let params = { client_id: 'jo1GX5MN5frweMtqWHyhFQ99jwMiHzI5cGQx0xDACb8', orientation: 'portrait', content_filter: 'high'}
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return fetch(url).then(resp => resp.json())
}
