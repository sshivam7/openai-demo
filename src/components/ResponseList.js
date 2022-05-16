import './ResponseList.css';
import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import ResponseData from './ResponseData';
import { db } from '../config/db';

function ResponseList() {
  const storedResponses = useLiveQuery(() => db.response_data.toArray());

  return (
    <ul>
      {storedResponses?.reverse().map((responseData) => (
        <li key={responseData.id}>
          <ResponseData
            prompt={responseData.request_prompt}
            response={responseData.response_data}
          />
        </li>
      ))}
    </ul>
  );
}

export default ResponseList;
