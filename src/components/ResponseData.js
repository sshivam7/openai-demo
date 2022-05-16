import './ResponseData.css';
import React from 'react';
import PropTypes from 'prop-types';

function ResponseData(props) {
  return (
    <div className="response-data">
      <section>
        <h2>Prompt:</h2>
        <p>{props.prompt}</p>
      </section>

      <section>
        <h2>Response:</h2>
        <p>{props.response}</p>
      </section>
    </div>
  );
}

ResponseData.propTypes = {
  prompt: PropTypes.string.isRequired,
  response: PropTypes.string.isRequired,
};

export default ResponseData;
