import { useEffect, useState } from 'react';
import Web3 from 'web3'; // Correct import statement
import axios from 'axios';
import SeedPhrase from '../models/SeedPhrase.js';
import { FaWallet } from "react-icons/fa";

const Home = () => {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [connectedAccount, setConnectedAccount] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSeedPhrase = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/generateSeedPhrase');
      setSeedPhrase(response.data.seedPhrase);

      if (window.ethereum && window.ethereum.isMetaMask) {
        const isConnected = window.ethereum.isConnected();
        if (isConnected) {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          setConnectedAccount(accounts[0]);
        } else {
          console.error('MetaMask is not connected to the current chain.');
        }
      } else {
        console.error('MetaMask not detected or not installed.');
      }
    } catch (error) {
      console.error('Error generating seed phrase:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveSeedPhrase = async () => {
    try {
      // Ensure SeedPhrase is the correct imported object
      await SeedPhrase.createSeedPhrase({ phrase: seedPhrase });
    } catch (error) {
      console.error('Error saving seed phrase:', error.message);
    }
  };

  useEffect(() => {
    generateSeedPhrase();
  }, []);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum && window.ethereum.isMetaMask) {
        try {
          const isConnected = window.ethereum.isConnected();
          if (!isConnected) {
            console.warn('MetaMask is not connected to the current chain. Please reload the page.');
          }
        } catch (error) {
          console.error('Error checking MetaMask connection:', error.message);
        }
      } else {
        console.error('MetaMask not detected or not installed.');
      }
    };

    initWeb3();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-800 to-indigo-900">
      <header className="text-3xl font-bold text-white mb-6">Seed Phrase Generator</header>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <p className="text-2xl font-bold text-gray-800 mb-4">Your Seed Phrase:</p>
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <p className="text-gray-700">{seedPhrase}</p>
        </div>
        <p className="text-2xl font-bold text-gray-800 mb-4">Connected Account:</p>
        <div className="bg-gray-100 p-4 rounded-md flex mb-6">
          <p className="text-gray-700">
          <span className="flex">
              <FaWallet className='my-auto' />
             <h1 className='text-xs ml-2'>
             {connectedAccount}
             </h1> 
              </span> 
            
          </p>
        </div>
        <button
          className={`${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          } bg-indigo-500 text-white px-4 py-2 rounded-full mr-2 hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300`}
          onClick={generateSeedPhrase}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate New Seed'}
        </button>
        <button
          className="bg-yellow-500 mt-2 text-white px-4 py-2 rounded-full hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300"
          onClick={saveSeedPhrase}
        >
          Save Seed Phrase
        </button>
      </div>
      <nav className="mt-6">
        <a className="text-white hover:text-gray-300 mr-4" href="#about">
          About
        </a>
        <a className="text-white hover:text-gray-300" href="#contact">
          Contact
        </a>
       
      </nav>
      <h1 className='font-serif text-red-200 mt-2'>A3M NextGen Pvt.Ltd - All Rights Reserved</h1>
    </div>
  );
};

export default Home;
