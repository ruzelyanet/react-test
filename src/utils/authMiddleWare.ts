const authMiddleware:Function = ():boolean => { 
  const login = localStorage.getItem('login')

  return !!login  
}

export default authMiddleware