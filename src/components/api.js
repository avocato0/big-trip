import { ModelEvent } from "./model-event";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const toJSON = (response) => {
  return response.json();
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status <= 300) {
    return response;
  } else {
    throw new Error(`${response.status}:${response.statusText}`);
  }
};

export class API {
  constructor({ endPoint, authorization }) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getEvents() {
    return this._load({
      url: `points`,
    })
      .then(toJSON)
      .then(ModelEvent.parseEvents);
  }

  createEvent({ event }) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(event),
      headers: new Headers({ "Content-type": "application/json" }),
    });
  }

  updateEvent({ id, event }) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(event),
      headers: new Headers({ "Content-type": "application/json" }),
    })
      .then(toJSON)
      .then(ModelEvent.parseEvent);
  }

  deleteEvent({ id }) {
    return this._load({
      url: `points/${id}`,
      method: Method.DELETE,
    });
  }

  _load({ url, method = Method.GET, body = null, headers = new Headers() }) {
    // TODO разобрать данную запись с Олегом
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, { method, body, headers })
      .then(checkStatus)
      .catch((err) => {
        console.error(`fetch error: ${err}`);
        throw err;
      });
  }
}
