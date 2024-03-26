export default function ({ $auth, redirect }) {
  // console.log($auth.loggedIn, $auth.user.account_type)
  const isLoggedIn = $auth.loggedIn
  const user = $auth.user
  if(!isLoggedIn) {
    return redirect('/auth/login')
  }
  
  if(user && user.account_type !== 'admin'){
    return redirect('/community')    
  }
}