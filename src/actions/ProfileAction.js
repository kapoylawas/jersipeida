import FIREBASE from '../config/FIREBASE';
import { storeData } from '../utils';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const updateProfile = (data) => {
  return dispatch => {
    // loading
    dispatch({
      type: UPDATE_PROFILE,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    const dataBaru = {
      uid: data.uid,
      nama: data.nama,
      alamat: data.alamat,
      nohp: data.nohp,
      kota: data.kota,
      provinsi: data.provinsi,
      email: data.email,
      status: 'user',
      avatar: data.updateAvatar ? data.avatarForDB : data.avatarLama,
    };

    FIREBASE.database()
      .ref('users/' + dataBaru.uid)
      .update(dataBaru)
      .then((response) => {
        // sukses
        dispatch({
          type: UPDATE_PROFILE,
          payload: {
            loading: false,
            data: response ? response : [],
            errorMessage: false,
          },
        });

        // local storage (Async Storage)
        storeData('user', dataBaru);
      })
      .catch((error) => {
        // error
        dispatch({
            type: UPDATE_PROFILE,
            payload: {
              loading: false,
              data: false,
              errorMessage: error.message,
            },
          });
  
          alert(error.message);
      });
  };
};
