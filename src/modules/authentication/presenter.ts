import store from '@core/store/redux';
import UserEntity from '@modules/user/entity';
import profileStore, { setToken } from './profileStore';
import authenticationRepository, { ILoginDTO } from './repository';

const authenticationPresenter = { ...authenticationRepository };

authenticationPresenter.login = async (payload: ILoginDTO, remember = false) => {
  const token = await authenticationRepository.login(payload);
  store.dispatch(setToken({ token, remember }));
  return token;
};

authenticationPresenter.getProfile = () => {
  return authenticationRepository.getProfile().then((user: UserEntity) => {
    store.dispatch(profileStore.actions.fetchProfile({ user }));
    return Promise.resolve(user);
  });
};

export default authenticationPresenter;
