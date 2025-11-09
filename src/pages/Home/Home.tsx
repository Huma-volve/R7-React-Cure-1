import HowItWorkSec from '../../components/common/HowItWorkSec/HowItWorkSec';
import FindNearSec from '../../components/common/FindNearSec/FindNearSec';
import TopRatedSec from '../../components/common/TopRatedSec/TopRatedSec';
import ReviewsSec from '../../components/common/ReviewsSec/ReviewsSec';
import QuestionAnswersSec from '../../components/common/QuestionAnswersSec/QuestionAnswersSec';
import HeaderSec from '../../components/common/HeaderSec/HeaderSec';
import {Helmet} from "react-helmet";
const Home = () => {

  return (
    <>
    <Helmet>
        <title>Home</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      <HeaderSec />
      <HowItWorkSec />
      <FindNearSec />
      <TopRatedSec />
      <ReviewsSec />
      <QuestionAnswersSec />
    </>
  );
}

export default Home;