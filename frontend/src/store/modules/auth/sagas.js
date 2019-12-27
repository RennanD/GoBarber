import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { singInSuccess, singFailure } from './actions';

import api from '~/services/api';
import history from '~/services/history';

export function* singIn({ payload }) {
    const { email, password } = payload;
    try {
        const response = yield call(api.post, 'sessions', {
            email,
            password,
        });

        const { token, user } = response.data;

        if (!user.provider) {
            toast.error('Usuário não é prestador de serviços.');
            return;
        }

        yield put(singInSuccess(token, user));

        history.push('/dashboard');
    } catch (err) {
        toast.error('Verifique se os dados estão corretos.');
        yield put(singFailure());
        return;
    }
}

export default all([takeLatest('@auth/SING_IN_REQUEST', singIn)]);
