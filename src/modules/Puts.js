import '../App.css';
import React, { useState, useEffect } from 'react';

function Puts() {

  const [putStrike, updatePutStrike] = useState(0);
  const [putProfit, updatePutProfit] = useState(0);
  const [putIncrease, updatePutIncrease] = useState(0);
  const [putBagger, updatePutBagger] = useState(0);

  const [moneyIn, updateMoneyIn] = useState(0);
  const [contractsNo, updateContractsNo] = useState(0);
  const [buyAtPrice, updateBuyAtPrice] = useState(0);
  const [optionsPremium, updateOptionsPremium] = useState(0);

  const [MIFocus, updateMIFocus] = useState(false);
  const [CNFocus, updateCNFocus] = useState(false);

  const [hands, updateHands] = useState('📄');

  useEffect(() => {

    if (CNFocus) {
      let moneyInput = (optionsPremium * 100 * contractsNo).toFixed(2);
      updateMoneyIn(moneyInput !== 'NaN' ? moneyInput : 0);
    } else if (MIFocus) {
      let numContracts = (moneyIn / (optionsPremium * 100)).toFixed(2);
      updateContractsNo(numContracts !== 'NaN' ? numContracts : 0);
    } else {
      let moneyInput = (optionsPremium * 100 * contractsNo).toFixed(2);
      updateMoneyIn(moneyInput !== 'NaN' ? moneyInput : 0);
    }

  }, [contractsNo, moneyIn, CNFocus, MIFocus, optionsPremium])

  useEffect(() => {
    let totalPremium = 0;
    let totalSellOption = 0;
    let totalBuyCost = 0;

    let numContracts = contractsNo ? contractsNo : (moneyIn / (optionsPremium * 100));

    totalPremium = optionsPremium * 100 * numContracts;
    totalSellOption = putStrike * 100 * numContracts;
    totalBuyCost = buyAtPrice * 100 * numContracts;

    let profit = totalSellOption - totalBuyCost - totalPremium;
    let positionIncrease = (profit / totalPremium) * 100;
    let bagger = positionIncrease / 100;
    let bag = bagger ? bagger : 0;


    // this is just for fun lool
    if (bag < 2000) {
      if (bag < 1000) {
        if (bag < 500) {
          if (bag < 100) {
            if (bag < 0.5) {
              if (bag < 0) {
                // result of a gambling addiction
                updateHands('🧻'); 
              } else {
                // if didn't lose money (still an accomplishment- great job)
                updateHands('📄'); 
              }
            } else {
              // if bagging 100-0.5 (10,000~50% returns)
              updateHands('🔐');
            }
          } else {
            // if bagging 500-100 (50,000~10,000% returns)
            updateHands('🦾');
          }
        } else {
          // if bagging 1000-500 (100,000~50,000% returns)
          updateHands('💎');
        }
      } else {
        // if bagging 2000-1000 (200,000~100,000% returns)
        updateHands('u/DFV');
      }
    } else {
      updateHands('🌕');
    }

    updatePutProfit(profit ? profit : 0);
    updatePutIncrease(positionIncrease ? positionIncrease : 0);
    updatePutBagger(bagger ? bagger : 0);
  }, [putStrike, buyAtPrice, optionsPremium, contractsNo, moneyIn])

  return (
      <div className='module'>
        <div className='header'>
          <h2>🐻 Puts</h2>
        </div>
        <div className='inputs'>
          <div className='row'>
            <h3>Strike Sell Price</h3>
            <input type="text" placeholder='Strike Price of Share' value={putStrike} onChange={(e)=>{updatePutStrike(e.target.value)}} />
          </div>
          <div className='row'>
            <h3>Price @ Buy</h3>
            <input type="text" placeholder='Buy Price for Exercise' value={buyAtPrice} onChange={(e)=>{updateBuyAtPrice(e.target.value)}} />
          </div>
          <div className='row'>
            <h3>Options Premium</h3>
            <input type="text" placeholder='Options Premium (per Share)' value={optionsPremium} onChange={(e)=>{updateOptionsPremium(e.target.value)}} />
          </div>
          <div className='row-col'>
            <div className='col'>
              <h3>No. Contracts</h3>
              <input type="text" placeholder='No. of Contracts' value={contractsNo} onBlur={(e) => updateCNFocus(false)} onFocus={(e)=>{updateCNFocus(true)}} onChange={(e)=>{updateContractsNo(e.target.value)}} />
            </div>
            <div className='col'>
              <h3>Money In</h3>
              <input type="text" placeholder='Money In' value={moneyIn} onBlur={(e) => updateMIFocus(false)} onFocus={(e)=>{updateMIFocus(true)}} onChange={(e)=>{updateMoneyIn(e.target.value)}} />
            </div>
          </div>
        </div>
        <div className='result'>
          <h4>🖨️: ${putProfit.toLocaleString()} </h4>
          <h4>📈: {putIncrease.toFixed(2).toLocaleString()}% (~{putBagger.toFixed(0)} 💰)</h4>
          <h4>✋: {hands}</h4>
        </div>
      </div>
  );
}

export default Puts;
