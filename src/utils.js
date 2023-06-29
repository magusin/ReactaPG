import { useEffect, useState } from 'react';

export const UserLogin = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(parsedUser);
  }, []);

  return user;
};
    

