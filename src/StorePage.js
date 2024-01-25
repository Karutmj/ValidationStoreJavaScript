import React, { useState } from 'react';
import logo from './online-store.png';



const Checkout = () => {
  const [address, setAddress] = useState({ firstname: '', street: '', city: '', state: '' });
  const [payment, setPayment] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [step, setStep] = useState(1);
  
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handlePaymentChange = (e) => 
  {
    const { name, value } = e.target;
    setPayment((prevPayment) => ({ ...prevPayment, [name]: value }));
  };

  const handleNextStep = () => {
    if (step === 1 && !validateAddress()) {
      alert('Proszę uzupełnić wszystkie pola adresowe.');
      return;
    }
    if (step === 2 && !validatePayment()) {
      alert('Proszę uzupełnić wszystkie pola płatności.');
      return;
    }
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  //walidacja, sprawdzanie czy komponent  przechowuje puste informacje w adresie dostawy (address)
  const validateAddress = () => {
    return Object.values(address).every((val) => val.trim() !== '');
  };

  const validatePayment = () => {
    return Object.values(payment).every((val) => val.trim() !== '');
  };

  return (
     
    <div className="checkout-wrapper">
    <div className="title">
    <h1>Purchase summary</h1>
    </div>
    <img src={logo} className="App-logo" alt="logo" width={80} />
 
      <div className="checkout-section">
        {step === 1 && (
          <div>
            <h2>Adres dostawy</h2>
            <label htmlFor="name" className="labels">Imię i nazwisko:</label>
            <input type="text"  className="inputField" name="firstname" value={address.firstname} onChange={handleAddressChange} />
            <label htmlFor="name" className="labels">Adres linia 1*:  </label>
            <input type="text" name="street" className="inputField"  value={address.street} onChange={handleAddressChange} /><br></br>
              
            <label htmlFor="name" className="labels">Miasto:  </label>
            <input type="text" name="city" className="inputField"  value={address.city} onChange={handleAddressChange} />  
            <label htmlFor="name" className="labels">Wojewódzstwo:  </label>
            <input type="text" name="state" className="inputField"  value={address.state} onChange={handleAddressChange} />  
          </div>
        )}
        {step === 2 && (
          <div>
            <h2>Opcje płatności</h2>
            
            <label className="labels">Numer karty:</label>

            <input type="text" name="cardNumber" className="inputField" value={payment.cardNumber} onChange={handlePaymentChange} />
            
            <label className="labels">Data ważności:</label>
              
            <input type="text" name="expiryDate" className="inputField" value={payment.expiryDate} onChange={handlePaymentChange} />
           
            <label className="labels">CVV:</label>
              
            <input type="text" name="cvv" className="inputField" value={payment.cvv} onChange={handlePaymentChange} />
            
          </div>
        )}
        {step === 3 && (
          <div className='AllInformation'>
            <h2>Podsumowanie zamówienia</h2>
            <p>Kupujący:<br></br> ({address.firstname})</p>
            <p>Adres dostawy:<br></br> Miasto: ({address.city},ul.{address.street},{address.state})</p>
            <p>Numer karty:<br></br> **** **** **** {payment.cardNumber.slice(-4)}, Data ważności ({payment.expiryDate})</p>
            {/* Dodaj więcej informacji o zamówieniu */}
          </div>
        )}
      </div>

      <div className="checkout-navigation">
        {step < 3 && <button onClick={handleNextStep}>Dalej</button>}
        {step > 1 && <button onClick={handlePrevStep}>Wstecz</button>}
      </div>
    </div>
  );
};
export default Checkout;