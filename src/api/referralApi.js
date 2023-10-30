import axiosClient from './axiosClient';

const referralApi = {
  getInvitee: () => {
    const url = `/users/invitee`;
    return axiosClient.get(url);
  },
  getInviter: () => {
    const url = `/users/inviter`;
    return axiosClient.get(url);
  },
};

export default referralApi;
