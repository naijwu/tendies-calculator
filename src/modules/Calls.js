import '../App.css';
import React, { useState, useEffect } from 'react';

function Calls() {

  const [callStrike, updateCallStrike] = useState(0);
  const [callProfit, updateCallProfit] = useState(0);
  const [callIncrease, updateCallIncrease] = useState(0);
  const [callBagger, updateCallBagger] = useState(0);

  const [moneyIn, updateMoneyIn] = useState(0);
  const [contractsNo, updateContractsNo] = useState(0);
  const [sellAtPrice, updateSellAtPrice] = useState(0);
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
    }

  }, [contractsNo, moneyIn, CNFocus, MIFocus])

  useEffect(() => {
    let totalPremium = 0;
    let totalStrikeCost = 0;
    let totalSharesToSell = 0;

    let numContracts = contractsNo ? contractsNo : (moneyIn / (optionsPremium * 100));

    totalPremium = optionsPremium * 100 * numContracts;
    totalStrikeCost = callStrike * 100 * numContracts;
    totalSharesToSell = sellAtPrice * 100 * numContracts;

    let profit = totalSharesToSell - totalStrikeCost - totalPremium;
    let positionIncrease = (profit / totalPremium) * 100;
    let bagger = positionIncrease / 100;


    // this is just for fun lool
    if (bagger < 2000) {
      if (bagger < 1000) {
        if (bagger < 500) {
          if (bagger <= 100) {
            if (bagger < 0.5) {
              if (bagger < 0) {
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
    } 

    updateCallProfit(profit ? profit : 0);
    updateCallIncrease(positionIncrease ? positionIncrease : 0);
    updateCallBagger(bagger ? bagger : 0);
  }, [callStrike, sellAtPrice, optionsPremium, contractsNo, moneyIn])

  return (
      <div className='module'>
        <div className='header'>
          <h2>🚀 Calls</h2>
        </div>
        <div className='inputs'>
          <div className='row'>
            <h3>Strike Price</h3>
            <input type="text" placeholder='Strike Price of Share' value={callStrike} onChange={(e)=>{updateCallStrike(e.target.value)}} />
          </div>
          <div className='row'>
            <h3>Sell Price</h3>
            <input type="text" placeholder='Price @ Exercise to Sell' value={sellAtPrice} onChange={(e)=>{updateSellAtPrice(e.target.value)}} />
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
          <h4>🖨️: ${callProfit.toLocaleString()} </h4>
          <h4>📈: {callIncrease.toFixed(2)}% (~{callBagger.toFixed(0)} 💰)</h4>
          <h4>✋: {hands}</h4>
        </div>
      </div>
  );
}

export default Calls;
