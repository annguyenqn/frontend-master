import { useState, useEffect } from 'react';
import QARow from './components/QARow';
import Container from 'components/Layout/Container/Container';
import { questionData } from './components/QuestionData';
import Navbar from 'components/Layout/Navbar/Navbar';
import Footer from 'components/Layout/Footer/Footer';
import PageLoading from 'components/Layout/PageLoading/PageLoading';

export default function FAQ() {
  const [isLoading, setLoading] = useState(true);
  const [dataTemp, setDataTemp] = useState([]);
  const [input, setInput] = useState('');
  useEffect(() => {
    setDataTemp(questionData);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const inputToLoweCase = input.toLowerCase();
    const result = questionData.filter(
      (question) =>
        question.question?.toLowerCase().includes(inputToLoweCase) ||
        question.answer?.toLowerCase().includes(inputToLoweCase) ||
        question.answerDetail?.toLowerCase().includes(inputToLoweCase),
    );
    setDataTemp(result);
  };

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <Navbar />
      <Container className="pt-28 z-1 xl:pt-36">
        <div className="flex flex-col justify-between pb-8 lg:items-center lg:flex-row">
          <span className="mb-10 text-3xl font-medium text-primary lg:mb-0">CÂU HỎI THƯỜNG GẶP</span>

          <form className="flex flex-col items-center md:flex-row">
            <input
              type="text"
              className="w-full h-12 px-4 py-2 mb-5 text-white rounded md:mr-5 md:mb-0 lg:w-96 bg-black-3"
              placeholder="Nhập từ khóa để tìm theo cụm từ"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="w-full h-12 text-lg font-medium text-white rounded bg-primary md:w-32"
              onClick={(e) => handleSearch(e)}
            >
              Tìm kiếm
            </button>
          </form>
        </div>
        <div className="px-4 bg-black-3 sm:px-8 rounded-xl">
          {dataTemp.map((data, index) => {
            const isLast = index === dataTemp.length - 1;
            return (
              <QARow key={data.id} index={data.id} question={data.question} answer={data.answer} isLast={isLast} />
            );
          })}
        </div>
      </Container>

      <Footer />
    </>
  );
}
