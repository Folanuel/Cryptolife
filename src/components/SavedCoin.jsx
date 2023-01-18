import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext';

const SavedCoin = () => {
  const [coins, setCoins] = useState([]);  
  const { user } = UserAuth();  

  const fetchPost = async () => {   
        await getDocs(collection(db, "users"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setCoins(newData);                
                console.log(coins, newData);
            }).catch((e) => alert("error found"))       
    }

    useEffect(()=>{
        fetchPost();
    }, [user])
  
    const deleteCoin = async (id) => {
      await deleteDoc(doc(db, 'users', id ));
      window.location.reload();
    }
    

  return (
    <div>      
        <table className='w-full border-collapse text-center'>
          <thead>
            <tr className='border-b'>
              <th className='px-4'>Rank #</th>
              <th className='text-left'>Coin</th>
              <th className='text-left'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {coins?.map((coin) => (
              <tr key={coin.id} className='h-[60px] overflow-hidden'>
                <td>{coin.coinRank}</td>
                <td>
                  <Link to={`/coin/${coin.coinId}`}>
                    <div className='flex items-center'>
                      <img src={coin.coinImage} className='w-8 mr-4' alt='/' />
                      <div>
                        <p className='hidden sm:table-cell'>{coin.coinName}</p>
                        <p className='text-gray-500 text-left text-sm'>
                          {coin.coinSymbol.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className='pl-8'>                  
                    <AiOutlineClose                   
                    className='cursor-pointer'
                    onClick={() => deleteCoin(coin.id)}
                    />                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
    </div>
  );
};

export default SavedCoin;


