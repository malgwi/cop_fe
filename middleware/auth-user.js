export default function ({ $auth, store, redirect, route }) {
  if(!$auth.loggedIn){
    return redirect('/auth/login')    
  }
}