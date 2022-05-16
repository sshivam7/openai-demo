import './InputForm.css';
import React, { useEffect, useState } from 'react';

import { db } from '../config/db';
import useFetch from '../hooks/useFetch';
import ResultStatus from '../constants/RequestStatus';
import { getCompletionRequestData } from '../services/OpenAIService';

function InputForm() {
  const AI_ENGINES = ['text-curie-001', 'text-davinci-002', 'text-babbage-001', 'text-ada-001'];

  const [requestData, setRequestData] = useState({});
  const [prompt, setPrompt] = useState('');
  const [aiEngine, setAiEngine] = useState(AI_ENGINES[0]);
  const [dpUpdate, setDbUpdate] = useState(false);
  const { state, fetchData } = useFetch(requestData);

  // Handlers to deal with user input
  const handleSubmit = () => {
    setRequestData(getCompletionRequestData(prompt, aiEngine));
  };

  useEffect(() => {
    if (prompt && aiEngine) {
      fetchData();
      setDbUpdate(true);
    }
  }, [requestData]);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const updateAiEngine = (e) => {
    setAiEngine(e.target.value);
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  // IndexedDB database logic
  const addResultData = async (data) => {
    try {
      const id = await db.response_data.add(data);
      console.log(`Successfully added to DB with id: ${id}`);
    } catch (error) {
      console.log('Error adding to DB');
    }
  };

  if (state.status === ResultStatus.SUCCESS && dpUpdate === true) {
    console.log(state.data.choices);
    addResultData({
      request_prompt: requestData.body.prompt,
      response_data: state.data.choices[0].text,
    });

    setDbUpdate(false);
  }

  return (
    <>
      <form className="input-form">
        <label htmlFor="text-prompt-input">Enter Text Prompt:</label>
        <textarea
          name="text-prompt"
          onChange={handlePromptChange}
          id="text-prompt-input"
          required
        />

        <div className="engine-select">
          <label htmlFor="ai-engines-select">Select AI Engine:</label>
          <select name="ai-engines" id="ai-engines-select" onChange={updateAiEngine}>
            {AI_ENGINES.map((engine) => (
              <option key={engine} value={engine}>
                {engine}
              </option>
            ))}
          </select>
        </div>

        <input type="button" value="Submit" onClick={handleSubmit} onKeyDown={handleKeypress} />
        {state.status === ResultStatus.ERROR && (
          <div className="error">ERROR OCCURRED - Could not fetch data from OpenAI API</div>
        )}
        {state.status === ResultStatus.LOADING && <div className="loader"></div>}
      </form>
    </>
  );
}

export default InputForm;
