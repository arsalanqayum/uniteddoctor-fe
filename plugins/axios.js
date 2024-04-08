
export default function ({ $axios, redirect,store }) {
    $axios.onError(error => {
        store.dispatch("loaderAction", false)
      if(error.response.status === 401) {
        redirect('/login')
      }
    });
    $axios.onRequest(config=>{
        store.dispatch("loaderAction", true)
        $axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.auth.token}`;
        config.headers.common['Accept'] = 'application/json'; // Replace with your getter name
    });
    $axios.onResponse(config=>{
        store.dispatch("loaderAction", false)
    })
    

  }