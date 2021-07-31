import { FC } from "react";

import CurrentPostsSection from "../../components/CurrentPostsSection";
import NewPostSection from "../../components/NewPostSection";
import OfficialStatementsSection from "../../components/OfficialStatementsSection";

const HomePage: FC = () => {
  return (
    <>
      <OfficialStatementsSection />
      <NewPostSection />
      <CurrentPostsSection />
    </>
  );
};

export default HomePage;
