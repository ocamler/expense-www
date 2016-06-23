import {
  HUD_UPDATE,
  HUD_ERROR,
} from '../constants/ActionTypes';

const initialState = {
  isError: false,
  errorMessage: undefined,
  lat: undefined,
  lng: undefined,
  alt: undefined,
  acc: undefined,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case HUD_UPDATE:
            return action.hud;

        case HUD_ERROR:
            return {
                     isError: true,
                     errorMessage: action.errorMessage
                   };

        default:
            return state;
    }
}

