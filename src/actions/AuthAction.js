import FIREBASE from '../config/FIREBASE';
import {storeData} from '../utils';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const registerUser = (data, password) => {
  return dispatch => {
    // loading
    dispatch({
      type: REGISTER_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    FIREBASE.auth()
      .createUserWithEmailAndPassword(data.email, password)
      .then(success => {
        // ambil uid, buat dataBaru (data+uid)
        const dataBaru = {
          ...data,
          uid: success.user.uid,
        };

        // simpan ke riletime database firebase
        FIREBASE.database()
          .ref('users/' + success.user.uid)
          .set(dataBaru);

        // sukses
        dispatch({
          type: REGISTER_USER,
          payload: {
            loading: false,
            data: dataBaru,
            errorMessage: false,
          },
        });

        // local storage (Async Storage)
        storeData('user', dataBaru);
      })
      .catch(error => {
        // error
        dispatch({
          type: REGISTER_USER,
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

export const loginUser = (email, password) => {
  // console.log("Masuk Action");
  return dispatch => {
    // loading
    dispatch({
      type: LOGIN_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    FIREBASE.auth()
      .signInWithEmailAndPassword(email, password)
      .then((success) => {
        console.log("Sukses Login : ", success);
        // Signed in
        FIREBASE.database()
        .ref('/users/' + success.user.uid)
        .once('value')
        .then((resDB) => {

          // console.log("Sukses Cek Login : ", resDB);

          if(resDB.val()) {
               // sukses
              dispatch({
                type: LOGIN_USER,
                payload: {
                  loading: false,
                  data: resDB.val(),
                  errorMessage: false,
                },
              });

              // local storage (Async Storage)
              storeData('user', resDB.val());
          }else {
              // error
              dispatch({
                type: LOGIN_USER,
                payload: {
                  loading: false,
                  data: false,
                  errorMessage: "Data User Tidak Ada",
                },
              });

              alert("Data User Tidak Ada");
          }
        });
      })
      .catch((error) => {

        // console.log("Error : ", error);
        // error
        dispatch({
          type: LOGIN_USER,
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
