/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchInviteeDataAsync, fetchUserInviterDataAsync } from './index';

export const useUserInvitee = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInviteeDataAsync());
  }, []);

  const { data, isDataLoaded } = useSelector((state) => ({
    data: state.userReferral.invitees,
    isDataLoaded: state.userReferral.isInviteesDataLoaded,
  }));

  return { data, isDataLoaded };
};

export const useUserInviter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInviterDataAsync());
  }, []);

  const { data, isDataLoaded } = useSelector((state) => ({
    data: state.userReferral.inviter,
    isDataLoaded: state.userReferral.isInviterDataLoaded,
  }));

  return { data, isDataLoaded };
};
