// Pinata service for decentralized storage of photos
// This service handles uploading photos to Pinata IPFS

import { Buffer } from 'buffer';

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;

if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
  console.warn('Pinata credentials not found. Using mock data instead.');
}

/**
 * Upload a file to Pinata IPFS
 * @param {File} file - The file to upload
 * @param {string} name - The name of the file
 * @param {Object} metadata - Additional metadata for the file
 * @returns {Promise<Object>} - The IPFS hash and URL
 */
export async function uploadFileToPinata(file, name, metadata = {}) {
  if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
    // Mock response for development
    console.log('Using mock Pinata response');
    return {
      IpfsHash: `mock-ipfs-hash-${Date.now()}`,
      PinSize: 1000,
      Timestamp: new Date().toISOString(),
      url: file.preview || 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=300&fit=crop'
    };
  }

  try {
    // Convert file to buffer
    const buffer = await fileToBuffer(file);

    // Create form data
    const formData = new FormData();
    formData.append('file', new Blob([buffer]), name);
    
    // Add metadata
    const pinataMetadata = {
      name,
      keyvalues: metadata
    };
    formData.append('pinataMetadata', JSON.stringify(pinataMetadata));

    // Set pinata options
    const pinataOptions = {
      cidVersion: 1
    };
    formData.append('pinataOptions', JSON.stringify(pinataOptions));

    // Upload to Pinata
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Pinata upload failed: ${error.error.details || error.error}`);
    }

    const result = await response.json();
    
    // Add the IPFS gateway URL
    result.url = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    
    return result;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw error;
  }
}

/**
 * Convert a file to buffer
 * @param {File} file - The file to convert
 * @returns {Promise<Buffer>} - The file as a buffer
 */
async function fileToBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const buffer = Buffer.from(arrayBuffer);
      resolve(buffer);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Get metadata for a file from Pinata
 * @param {string} ipfsHash - The IPFS hash of the file
 * @returns {Promise<Object>} - The metadata
 */
export async function getPinataMetadata(ipfsHash) {
  if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
    // Mock response for development
    return {
      name: 'Mock Photo',
      keyvalues: {
        title: 'Mock Photo',
        description: 'This is a mock photo for development',
        tags: ['mock', 'development']
      }
    };
  }

  try {
    const response = await fetch(`https://api.pinata.cloud/pinning/hashMetadata?ipfsPinHash=${ipfsHash}`, {
      method: 'GET',
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to get Pinata metadata: ${error.error.details || error.error}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting Pinata metadata:', error);
    throw error;
  }
}

/**
 * Update metadata for a file on Pinata
 * @param {string} ipfsHash - The IPFS hash of the file
 * @param {string} name - The name of the file
 * @param {Object} metadata - The metadata to update
 * @returns {Promise<Object>} - The updated metadata
 */
export async function updatePinataMetadata(ipfsHash, name, metadata = {}) {
  if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
    // Mock response for development
    return {
      success: true
    };
  }

  try {
    const response = await fetch('https://api.pinata.cloud/pinning/hashMetadata', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY
      },
      body: JSON.stringify({
        ipfsPinHash: ipfsHash,
        name,
        keyvalues: metadata
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to update Pinata metadata: ${error.error.details || error.error}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating Pinata metadata:', error);
    throw error;
  }
}

/**
 * Delete a file from Pinata
 * @param {string} ipfsHash - The IPFS hash of the file to delete
 * @returns {Promise<Object>} - The response
 */
export async function deletePinataFile(ipfsHash) {
  if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
    // Mock response for development
    return {
      success: true
    };
  }

  try {
    const response = await fetch(`https://api.pinata.cloud/pinning/unpin/${ipfsHash}`, {
      method: 'DELETE',
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to delete Pinata file: ${error.error.details || error.error}`);
    }

    return {
      success: true
    };
  } catch (error) {
    console.error('Error deleting Pinata file:', error);
    throw error;
  }
}

