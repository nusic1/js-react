import { get } from './api';

export function loadFlights(appState) {
  return get('flights', appState)
    .then((res) => res.json()
      .then((res) => {
        appState.flights = res.flights;
        appState.isLoaded = true;
      })
    );
}

export function loadFlight(appState, id) {
  return get(`flights/${id}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(id);
      console.log(res);
      appState.flight = res.flight;
    });
}

// export function createUser() {
//   return post('users')
//     .then((response) => console.log(response));
// }

// export function createSession(appState) {
//   return post('session')
//     .then((response) => console.log(response));
// }