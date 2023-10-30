import { useForm, Controller } from 'react-hook-form';
import { FiPlus, FiUser, FiX } from 'react-icons/fi';
import { BsBank } from 'react-icons/bs';
import { useState } from 'react';
import { handleToastError } from '../../../utils';
import ButtonRound from '../../../components/Button/ButtonRound';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { BANK_LIST } from '../../../constants/payment';
import { showToastSuccess } from '../../../components/CustomToast/CustomToast';
import bankAccountApi from '../../../api/bankApi';
import ModalRemoveBank from '../../../components/Modal/ModalRemoveBank';
import { useBanks } from '../../../store/banks/hooks';
import Loader from '../../../components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { fetchBanksDataAsync } from '../../../store/banks';
import Dropdown from '../../../components/Dropdown/Dropdown';

const options = BANK_LIST.map((bank) => ({
  ...bank,
  value: bank.bankCode,
  label: bank.name,
}));

const TYPE_BANK = {
  account: 'ACCOUNT',
  card: 'CARD',
};

const TYPE_BANK_TEXT = {
  [TYPE_BANK.account]: 'Số tài khoản',
  [TYPE_BANK.card]: 'Số thẻ',
};

const defaultValues = {
  cardIdNumber: '',
  cardUserName: '',
  bank: {},
  type: TYPE_BANK.account,
};

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'red' : 'black',
  }),
  input: (provided, state) => ({
    ...provided,
    background: 'transparent',
    color: 'white',
  }),
  control: (provided, state) => ({
    ...provided,
    border: 'none',
    color: 'white',
    background: 'transparent',
    minHeight: '3rem',
    boxShadow: 'none',
    paddingLeft: '2.5rem',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'white',
    marginLeft: 0,
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: '#a9a9a9',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    color: 'white',
    padding: 0,
    margin: 0,
  }),
};

const UpdateBank = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: defaultValues,
  });

  const watchType = watch('type', TYPE_BANK.account); // you can supply default value as second argument

  const { banks, isDataLoaded } = useBanks();

  const [showForm, setShowForm] = useState(false);
  const [modalRemove, setModalRemove] = useState({
    open: false,
    bankId: '',
  });

  const closeModalRemove = () =>
    setModalRemove({
      open: false,
      bankId: '',
    });

  const toggleShowForm = () => setShowForm(!showForm);

  const closeForm = () => {
    reset(defaultValues);
    setShowForm(false);
  };

  const onSubmit = async ({ cardUserName, cardIdNumber, bank, type }) => {
    try {
      const data = {
        cardIdNumber,
        cardUserName,
        type,
        bank: bank.bankCode,
      };

      await bankAccountApi.create(data);
      await dispatch(fetchBanksDataAsync());

      closeForm();
      showToastSuccess('Thêm tài khoản ngân hàng thành công!');
    } catch (e) {
      handleToastError(e);
    }
  };

  if (!isDataLoaded) {
    return (
      <div>
        <Loader className="mx-auto w-12 h-12 my-4" />
      </div>
    );
  }

  return (
    <div>
      <ModalRemoveBank isOpen={modalRemove.open} toggleModal={closeModalRemove} bankId={modalRemove.bankId} />
      {banks.map((bank) => {
        const bankInfo = BANK_LIST.find((item) => item.bankCode === bank.bank);
        const lastIdBank = bank.cardIdNumber.slice(-4);

        const idBank = new Array(bank.cardIdNumber.length - 4).fill('*');

        return (
          <div
            key={bank._id}
            className="flex justify-between px-3 py-2 border border-white rounded-lg items-center mb-3"
          >
            <div className="flex">
              <div className="mr-2 bg-white flex items-center justify-center rounded-md">
                <img src={bankInfo.image} className="w-28 h-12 object-contain" />
              </div>
              <div>
                <p className="font-bold">{bankInfo.name}</p>
                <p className="font-bold">
                  {idBank}
                  {lastIdBank}
                </p>
              </div>
            </div>
            <FiX
              onClick={() => {
                setModalRemove({
                  open: true,
                  bankId: bank._id,
                });
              }}
              className="text-4xl hover:text-red-500 cursor-pointer"
            />
          </div>
        );
      })}
      <div
        className="flex px-3 py-2 border border-white rounded-lg items-center cursor-pointer hover:text-primary"
        onClick={toggleShowForm}
      >
        <div className="mr-2 bg-white flex items-center justify-center border-2 border-dashed	border-black rounded-md">
          <FiPlus className="text-black w-28 h-12" />
        </div>
        <span className="font-bold">Thêm thẻ/tài khoản</span>
      </div>

      {showForm && (
        <div className="mt-4">
          <div className="mb-4">
            <div className="relative">
              <Controller
                defaultValue="Ngân hàng"
                control={control}
                name="bank"
                rules={{
                  required: 'Vui lòng chọn ngân hàng',
                }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <Select
                    isClearable={false}
                    styles={customStyles}
                    ref={ref}
                    options={options}
                    onChange={onChange}
                    type="text"
                    placeholder="Ngân hàng"
                    className="bg-transparent rounded-xl w-full border-gray-200 border focus:outline-none text-white"
                  />
                )}
              />
              <div className="absolute top-0 flex items-center justify-center left-4 h-full">
                <BsBank />
              </div>
            </div>
            <p className="text-red-500 text-sm mt-1">{errors?.bank?.message}</p>
          </div>
          <Dropdown
            classNameMenu="rounded-xl h-12 w-full p-2 px-4 border-gray-200 border mb-4"
            isArrow
            menu={<p>{TYPE_BANK_TEXT[watchType]}</p>}
            classNameMenuItem="bg-primary text-black whitespace-nowrap"
          >
            <div
              className="px-4 py-2 hover:bg-gray-200 block cursor-pointer "
              onClick={() => setValue('type', TYPE_BANK.account)}
            >
              <span className="w-full h-full ">{TYPE_BANK_TEXT[TYPE_BANK.account]}</span>
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-200 block cursor-pointer "
              onClick={() => setValue('type', TYPE_BANK.card)}
            >
              <span className="w-full h-full ">{TYPE_BANK_TEXT[TYPE_BANK.card]}</span>
            </div>
          </Dropdown>
          <div className="mb-4">
            <div className="relative">
              <Controller
                defaultValue=""
                control={control}
                name="cardIdNumber"
                rules={{
                  required: `Vui lòng nhập ${TYPE_BANK_TEXT[watchType]} ATM`,
                }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <input
                    ref={ref}
                    onChange={onChange}
                    value={value}
                    type="text"
                    placeholder={TYPE_BANK_TEXT[watchType]}
                    className="py-4 pl-10 bg-transparent rounded-xl h-12 w-full p-2 px-4 border-gray-200 border focus:outline-none"
                  />
                )}
              />
              <div className="absolute top-0 flex items-center justify-center left-4 h-full">
                <FiUser />
              </div>
            </div>
            <p className="text-red-500 text-sm mt-1">{errors?.cardIdNumber?.message}</p>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Controller
                defaultValue=""
                control={control}
                name="cardUserName"
                rules={{
                  required: `Quý khách chưa nhập Họ tên chủ ${watchType === TYPE_BANK.account ? 'tài khoản' : 'thẻ'}`,
                }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <input
                    ref={ref}
                    onChange={(e) => onChange(e.target.value.toUpperCase())}
                    onBlur={(e) => onBlur(e.target.value.toUpperCase())}
                    value={value}
                    type="text"
                    placeholder={`Tên chủ ${watchType === TYPE_BANK.account ? 'tài khoản' : 'thẻ'}`}
                    className="py-4 pl-10 bg-transparent rounded-xl  w-full p-2 px-4 border-gray-200 border focus:outline-none"
                  />
                )}
              />
              <div className="absolute top-0 flex items-center justify-center left-4 h-full">
                <FiUser />
              </div>
            </div>
            <p className="text-red-500 text-sm mt-1">{errors?.cardUserName?.message}</p>
          </div>

          <div className="flex space-x-2 mt-4">
            <ButtonRound
              disabled={isSubmitting}
              onClick={closeForm}
              className="w-full font-bold text-black border-0 bg-gray-1"
            >
              Đóng
            </ButtonRound>

            <ButtonRound
              disabled={isSubmitting}
              isLoading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className="w-full font-bold border-0 bg-primary text-black-2"
            >
              Lưu
            </ButtonRound>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateBank;
