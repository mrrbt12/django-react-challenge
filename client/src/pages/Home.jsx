import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser';
const { ethers, InfuraProvider } = require('ethers');

//const ethers = require("ethers")

export default function Home() {
    const { user } = useAuth();
    const getUser = useUser()
    const [ balance, setBalance ] = useState()
    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        const INFURA_PROJECT_ID = '9b43dddd6ec64eaf8b4b3f5ef9da4203';
        const provider = new InfuraProvider('mainnet', INFURA_PROJECT_ID);

        // Fetch the balance of the given address
        provider.getBalance(user.ethereum_wallet_address).then(res => {
            setBalance(ethers.formatEther(res))
        }).catch(err => {
            console.log("Unable to get balance.")
        });
    }, [user]); 

    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                        {user?.email !== undefined ? 'List user Ethereum balance' : 'Please login first'}
                        <h3>ETH Balance</h3>
                        <span>{ balance }</span> <strong>ETH</strong>
                    </div>
                </div>
            </h2>
        </div>
    )
}
