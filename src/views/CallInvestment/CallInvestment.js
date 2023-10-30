import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Container from 'components/Layout/Container/Container';
import Representative from 'views/Land/Components/Representative';
import InvestStep from './Components/InvestStep';
import NavbarCallInvesment from './Components/NavbarCallInvesment';
import InfoStep from './Components/InfoStep';
import PaymentStep from './Components/PaymentStep/PaymentStep';
import PageLoading from 'components/Layout/PageLoading/PageLoading';
import { FormProvider, useForm } from 'react-hook-form';
import { ASSET_STATUS, PAYMENT_TYPES, PAYME_PAYMENT_METHOD } from 'constants/config';
import assetsApi from 'api/assetsApi';
import bankAccountApi from 'api/bankApi';
import { showToastError } from 'components/CustomToast/CustomToast';
import SuceedStep from './Components/SuceedStep';
import withAuthUser from 'hoc/withAuthUser';
import { replaceWith, searchRegExp } from 'utils';

const CallInvestment = () => {
  const history = useHistory();
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [step, setStep] = useState(id === 'payment-result' ? 4 : 1); // id = payment-result is show Result Payment of VNPAY or MOMO
  const [project, setProject] = useState({});

  const methods = useForm();
  const { handleSubmit } = methods;

  useEffect(() => {
    if (id !== 'payment-result') {
      (async () => {
        try {
          await setLoading(true);
          const res = await assetsApi.get({ id });
          await setProject(res);
          await setLoading(false);
        } catch (e) {
          console.error(e);
          await setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
    if (project?.whitelist?.enabled && !project?.isWhitelisted) {
      showToastError('', 'Bạn không thể đầu tư vì không đăng ký Whitelist');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoBack = () => {
    if (step === 1 || step === 4) {
      history.push(`/land/detail/${id}`);
    }
    if (step > 1 && step < 4) {
      setStep(step - 1);
    }
  };

  const handleNextStep = async () => {
    if (step >= 1 && step < 4) {
      setStep(step + 1);
    }
  };

  const onSubmit = async (data) => {
    const body = {
      asset: project?._id,
      amount: +data['invest']?.replace(searchRegExp, replaceWith),
      paymentType: data['paymentType'] || PAYMENT_TYPES.PAYME,
      payMethod: data['payMethod'] || PAYME_PAYMENT_METHOD.ATMCARD,
    };
    if (data['bankCode']) {
      body.bankCode = data['bankCode'];
    }
    try {
      const res = await bankAccountApi.payment(body);
      window.location.href = res.paymentUrl;
    } catch (e) {
      console.error(e);
      showToastError('', 'Yêu cầu thanh toán không thực hiện được. Vui lòng thử lại sau.');
    }
  };

  if (!!project?.status && project?.status !== ASSET_STATUS.OPENING && id !== 'payment-result') {
    history.push(`/land/detail/${id}`);
  }

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="animate-fade-in">
      <NavbarCallInvesment step={step} />
      <div className="min-h-screen pt-25 bg-black-2">
        <FormProvider {...methods}>
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Container>
              {step === 1 && <InvestStep onGoBack={handleGoBack} onNext={handleNextStep} project={project} />}
              {step === 2 && <InfoStep onGoBack={handleGoBack} onNext={handleNextStep} project={project} />}
              {step === 3 && <PaymentStep onGoBack={handleGoBack} />}
              {step === 4 && <SuceedStep />}
            </Container>
          </form>
        </FormProvider>
        {step === 1 && (
          <Container>
            <div>
              <Representative className="mb-10" thumbnailImage={project?.images?.[0]} project={project} disable />
            </div>
          </Container>
        )}
      </div>
    </div>
  );
};

export default withAuthUser(CallInvestment);
