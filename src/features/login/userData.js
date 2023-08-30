import { createSlice } from '@reduxjs/toolkit';
const storedUserData = localStorage.getItem('userData');
const initialState = storedUserData ? { value: JSON.parse(storedUserData) } : { value: {} };

export const logout = () => (dispatch) => {
  console.log('entraaa')
  // Limpiar el estado del usuario en Redux
  dispatch(clearUserData());

  // Eliminar los datos del usuario del almacenamiento local
  localStorage.removeItem('userData');
};

export const userData = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      state.value = action.payload;
      localStorage.setItem('userData', JSON.stringify(action.payload)); // Guardar en el almacenamiento local
    },
    clearUserData: (state) => {
      state.value = {};
      localStorage.removeItem('userData');
    },
  },
});

export const { setUserData, clearUserData } = userData.actions;
export default userData.reducer;
