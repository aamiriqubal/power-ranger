import React, { useState, useRef } from 'react';

import '../assets/styles/main.scss';
import flash from '../assets/images/flash.png';
import { Notification } from './Notification';
import * as PrService from '../services';


const App = () => {
  const [notification, setNotification] = useState({ status: false, text: '', type: '' });
  const [result, setResult] = useState(<div>Output will be here...</div>);
  const textArea = useRef(null);

  async function showNotification(notifyWith) {
    // This is small hack done here to make the notification thing unmount and then mount.
    await setNotification({ status: false, text: '', type: '' });
    await setNotification({
      status: true,
      text: notifyWith ? notifyWith.text : '',
      type: notifyWith ? notifyWith.type : '',
    });
  }

  const validateInputAndReturnObject = (input) => {
    if (input.trim() === '') {
      showNotification({
        text: 'Input field cannot be empty.',
        type: 'info',
      });
      return;
    }
    try {
      const inputObj = PrService.getArrayFromString(input);
      return inputObj;
    } catch (error) {
      showNotification({
        text: `${error.message} Input:${input}`,
        type: 'error',
      })
    }
    return undefined;
  }

  const getOutputString = (input, output) => {
    if (output.maxPower === 0) {
      return `No link station within reach for point ${input.x}, ${input.y}`;
    }
    return `Best link station for point ${input.x}, ${input.y} is ${output.x}, ${output.y} with power ${output.maxPower}`;
  }

  const findRangeAndDisplay = (input) => {
    const result = [];
    input.forEach(obj => {
      const suitableLinkStationWithMaxPower = PrService.findAndGetLinkStationAndPower(obj);
      result.push(getOutputString({ ...obj }, suitableLinkStationWithMaxPower));
    });
    const outPut = result.map((rs, i) => <div className={`result--${i}`} key={i}>{`${rs}.`}</div>);
    setResult(outPut);
    showNotification({
      text: 'Power ranger did it!',
      type: 'success',
    });
  }

  return (
    <div className="power-solution">
      {notification.status && <Notification {...notification} />}
      <div className='main'>
        <div className='header'>
          <div className='image-container'>
            <img className='image-container--image-flash' src={flash} alt='Power Ranger' />
            <h1>Power Ranger</h1>
          </div>
        </div>
        <div className='data'>
          <div className='data__label data__label--input'>Input</div>
          <div className='data__label data__label--output'>Output</div>
          <textarea ref={textArea} className='input_field' name='input' />
          <div className='output_field'>{result}</div>
        </div>
        <button className='button-submit' onClick={() => {
          showNotification();
          if (textArea.current) {
            const inputObj = validateInputAndReturnObject(textArea.current.value);
            if (inputObj !== undefined) {
              findRangeAndDisplay(inputObj);
            }
          }
        }}>
          Evaluate
        </button>
      </div>
    </div>
  );
}

export default App;
