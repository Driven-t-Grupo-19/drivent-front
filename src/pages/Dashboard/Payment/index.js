import { useState } from 'react';
import { Card } from './Card';

export default function Payment() {
  const [creditCard, setCreditCard] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });
  return <>
    <Card
      number={''}
      name={''}
      expiry={''}
      cvc={''}
    />
  </>;
}

