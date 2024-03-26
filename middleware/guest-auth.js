export default function ({$auth, redirect}){
  if(!$auth.$state.user){
    return
  }
  if($auth.loggedIn){
    redirect('/community')
  }
}