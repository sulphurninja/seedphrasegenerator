// pages/api/generateSeedPhrase.js
import { bip39 } from '../../serverUtils';

export default (req, res) => {
  try {
    const mnemonic = bip39.generateMnemonic();
    res.status(200).json({ seedPhrase: mnemonic });
  } catch (error) {
    console.error('Error generating seed phrase:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
