import { all, takeLatest, put, call } from 'redux-saga/effects';
import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

import { toast } from 'react-toastify';

export function* updateProfile({ payload }) {
    const { name, email, avatar_id, ...rest } = payload.data;

    try {
        const profile = Object.assign(
            {
                name,
                email,
                avatar_id,
            },
            rest.oldPassword ? rest : {}
        );

        const response = yield call(api.put, '/users', profile);

        toast.success('Dados alterados com sucesso!');

        yield put(updateProfileSuccess(response.data));
    } catch (err) {
        toast.error('Error ao atualizar os perfil.');
        yield put(updateProfileFailure());
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
