'use client'

import { getProviders, signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Button from './Button';

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signInUrlParams?: Record<string, string> | null;
}

type Providers = Record<string, Provider>;

const AuthProviders = () => {

  const [providers, setProviders] = useState<Providers | null>(null);
  
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()

      // console.log(res);

      setProviders(res);
      
    };
  
    fetchProviders()

  }, []);
  

  return (
    <div>
      {
        providers && Object.values(providers).map((provider: Provider, i) => (
          <Button
            key={i}
            title='Sign In'
            handleClick={() => signIn(provider?.id)}
          />
        ))
      }
    </div>
  )
};

export default AuthProviders;