import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSucces }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {

    try {
      setErrors(null);
      const response = await axios[method](url,
        { ...body, ...props }
      );
      if (onSucces) {
        onSucces(response.data);
      }
      return response.data;
    } catch(err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            {err.response.data.errors.map(err => (<li key={err.message}>{err.message}</li>))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
